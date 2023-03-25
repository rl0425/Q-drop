import {v4 as uuidv4} from "uuid";
import classes from "./BodyContents.module.css"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, {useState, useEffect, useRef} from "react";
import useHttp from "../../../../hooks/use-http";
import {useDispatch, useSelector} from "react-redux";
import {mainDataActions} from "../../../../store/mianData-slice";
import ContentList from "./ContentList";

import { useInView } from "react-intersection-observer"
import InfiniteScroll from "react-infinite-scroll-component";

const BodyContents = React.memo((props) => {
    const [category, setCategory] = useState([])
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    // 정렬 이벤트
    const [sortType, setSortType] = useState("")

    // 스크롤 이벤트 ref
    const [pageNum, setPageNum] = useState(0)
    const [pageEnd, setPageEnd] = useState([])

    const lastItemRef = useRef(null);
    const { ref, inView } = useInView({
        threshold: 0,
    });

    // 슬라이더 ref
    const sliderRef = useRef(null);

    // 슬라이더
    const index = useSelector((state) => state.main.index)
    const entry = useSelector((state) => state.main.entry)

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);
    const categoryRef = useRef(category);

    const dispatch = useDispatch()

    // reducer data
    const mainData = useSelector((state) => state.main.contentList)

    const getData = () => {
        const subCategoryPromise = new Promise(async (resolve, reject) => {
            try {
                const promises = props.categoryData.map(async (ele) => {
                    return Promise.all(
                        ele.bookmark_sub_categories.map(async (data) => {
                            if (data.selected) {
                                return data.sub_category_id;
                            }
                        })
                    ).then((trueList) => {
                        const values = trueList.length === 0 || !trueList[0] ? [1000000000] : [...trueList];
                        return new Promise((resolve, reject) => {
                            fetchTasks(
                                {
                                    url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?sub_id=${values.join(",")}&search=&paging_num=${0}&paging_count=5`,
                                },
                                (taskObj) => {
                                    resolve(taskObj);
                                }
                            );
                        });
                    })
                })

                const result = await Promise.all(promises)
                setCategory(result)
                resolve(result.flat());

            } catch (error) {
                console.error(error);
            }
        })

        subCategoryPromise.then((categoryList) => {
            const groupedData = categoryList.reduce((accumulator, currentValue) => {
                const existingItem = accumulator.find(
                    (item) => item.id === currentValue.mainCategory.main_category_id
                );
                if (existingItem) {
                    existingItem.values.push(currentValue);
                } else {
                    accumulator.push({
                        id: currentValue.mainCategory.main_category_id,
                        values: [currentValue],
                    });
                }
                return accumulator;
            }, []);

            props.categoryData.map((ele) => {
                if(ele.bookmark_sub_categories.length > 0){
                    const hasId = groupedData.find(u => u.id === ele.main_category_id)
                    if(!hasId){
                        groupedData.push({
                            id:  ele.main_category_id,
                            values: []
                        })
                    }
                }
            })

            setCategory(groupedData)
            const temp = [...groupedData]
            dispatch(mainDataActions.changeContent({contentList: temp}))
            setSortType("new")

            groupedData.map((data) => {
                setPageEnd(prev => [...prev, {id:data.id, end:false}])
            })

        })

        return subCategoryPromise;

    }

    const setDataOrder = () =>{
        const temp = mainData.map((ele) => {
            const sortdData = sortType === "new"
                ? [...ele.values].sort((a, b) => a.title - b.title)
                // ? [...ele.values].sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
                : [...ele.values].sort((a, b) => b.board_like.total_like_count - a.board_like.total_like_count);

            return {
                ...ele,
                values: sortdData,
            };
        });

        temp.sort((a, b) => {
            return a.id - b.id;
        });

        setCategory(temp);
    }

    const getMoreDatas = (props) =>{
        fetchTasks({
                url: `http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=selected`,
            },
            (object) => {
                const filterArr = object.filter(ele => ele.main_category_id === props.id)
                // console.log("object = ", object)
                // console.log("filterArr = ", filterArr)

                const subCategoryIds = filterArr[0].bookmark_sub_categories.map((category) => {
                    return category.sub_category_id;
                });

                console.log("subCategoryIds = ", subCategoryIds)
                console.log("pageNum = ", pageNum)

                fetchTasks(
                    {
                        url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?sub_id=${subCategoryIds.join(",")}&search=&paging_num=${pageNum+1}&paging_count=5`,
                    },
                    (taskObj) => {
                        if(taskObj.length > 0) {
                            const temp = category.map((ele) => {
                                console.log("taskObj= ", taskObj)

                                if (ele.id === props.id) {
                                    const originalValues = Array.from(ele.values);
                                    taskObj.map((data) => {
                                        originalValues.push(data)
                                    })

                                    return {
                                        ...ele,
                                        values: originalValues,
                                    };
                                }

                                return ele;
                            });

                            dispatch(mainDataActions.changeContent({contentList: temp}))
                        }
                        else{
                            console.log("pageEnd =", pageEnd)
                        }
                    }
                );
            }
        )

        setPageNum(prev => prev +1)
    }

    const handleReload = () => {
        setCategory(mainData)
    }

    // 메인 카테고리 선택 이벤트
    const handleIndexChange = () => {
        if(!entry && sliderRef.current) {
            sliderRef.current.slickGoTo(index, true);
        }
    };

    // 메인에서 슬라이드 이벤트
    const handleSlideChange = (index) => {
        dispatch(mainDataActions.changeIndex({index:index, entry:false}))
    };

    const handleSortChange = () => {
        if(sortType === "new") setSortType("like")
        else setSortType("new")
    }

    const handleCategoryUpdate = (e, data) => {
        e.preventDefault()
        e.stopPropagation()

        const temp = category.map((ele) => {

            if (ele.id === data.data.mainCategory.main_category_id) {
                const originalValues = ele.values.findIndex(item => item.id === data.data.id)
                const updatedValues = ele.values.filter(item => item.id !== data.data.id);
                updatedValues.splice(originalValues,0,data.data);

                return {
                    ...ele,
                    values: updatedValues,
                };
            }

            return ele;
        });

        // setDataLoaded(false)
        dispatch(mainDataActions.changeContent({ contentList: temp }));
    }

    const getMoreData = (props) => {
        getMoreDatas(props)
    }

    useEffect(() => {
        getData();
    }, [props.data]);

    useEffect(() => {
        // // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !isLoading) {
            console.log("Asdasdasda")
            //     setPageNum(prevState => prevState + 1)
        }
    }, [inView])


    useEffect(() =>{
        if (category.length > 0) {
            handleReload()
        }
    }, [mainData])

    useEffect(() => {
        if (category.length > 0) {
            setDataOrder();
            setDataLoaded(true)
        }
    }, [sortType]);

    useEffect(() => {
        handleIndexChange()
    }, [index, sortType]);


    const settings = {
        dots: false,
        infinite: false,
        speed:200,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide:0,
        afterChange:  handleSlideChange
    };


    if(isLoading || !dataLoaded){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        console.log("category =" , category)
        return (
            <div className={classes.box}>
                <div onClick={handleSortChange} className={classes.sortBox}>
                    <span>{sortType === "new" ? "최신순" : "좋아요 순"}</span>
                    <img src={"/images/icons/arrowBox.png"}/>
                </div>

                    <Slider {...settings} ref={sliderRef}>
                            {(!category || category.length === 0) ? <div></div>:
                                category.map((ele, index) => {
                                    return (
                                        <div className={classes.sibal}>
                                            <InfiniteScroll
                                                dataLength={ele.values.length}
                                                next={() => getMoreData(ele)}
                                                hasMore={true}
                                                style={{ overflow: "scroll", height: "100%" }}
                                                loader={<h4>Loading...</h4>}
                                                height={"00%"}
                                            >
                                                {/*<div key={uuidv4()} className={classes.silderBox}>*/}

                                                {ele.values.length === 0 ? <div className={classes.emptyItemBox}>empty</div> : ele.values.map((data, index) => (
                                                    <ContentList key={uuidv4()} data={data} onUpdateCategory={handleCategoryUpdate}/>
                                                ))}

                                                {/*{ele.values.length === 0 ? <div className={classes.emptyItemBox}>empty</div> : ele.values.map((data, index) => (*/}
                                                {/*    <ContentList key={uuidv4()} data={data} onUpdateCategory={handleCategoryUpdate}/>*/}
                                                {/*))}*/}
                                                {/*</div>*/}
                                            </InfiniteScroll>
                                        </div>

                                    )
                                })
                            }
                    </Slider>
            </div>
        )
    }
})

export default BodyContents
