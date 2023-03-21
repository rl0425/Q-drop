import {v4 as uuidv4} from "uuid";
import classes from "./BodyContents.module.css"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, {useState, useEffect, useRef, useCallback, useMemo} from "react";
import useHttp from "../../../../hooks/use-http";
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch, useSelector} from "react-redux";
import {mainDataActions} from "../../../../store/mianData-slice";
import MemoizedContent from "./ContentList";
import ContentList from "./ContentList";
import contentList from "./ContentList";

const BodyContents = React.memo((props) => {
    const [category, setCategory] = useState([])
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    // 정렬 이벤트
    const [sortType, setSortType] = useState("")

    // 스크롤 이벤트 ref
    const bottomBoundaryRef = useRef(null);
    const noRef = useRef(null);

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
        const subCategoryPromise = new Promise((resolve, reject) => {
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?sub_id=&search=`}, (taskObj) => {

                if (taskObj.length > 0) {
                    const trueList = []
                    const categoryList = []

                    props.categoryData.map((ele) => {
                        ele.bookmark_sub_categories.map((data) => {
                            if (data.selected) {
                                trueList.push(data.sub_category_id)
                            }
                        })
                    })

                    taskObj.map((ele) => {
                        const data = trueList.find(u => u === ele.id)
                        if (data) {
                            categoryList.push(ele)
                        }
                    })

                    setCategory(categoryList)
                    resolve(categoryList);
                } else {
                    reject(new Error('No data returned from fetchTasks')); // reject the promise with an error
                }
            })
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
        })

        return subCategoryPromise;

    }

    const setDataOrder = () =>{
        const temp = mainData.map((ele) => {
            const sortdData = sortType === "new"
                ? [...ele.values].sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
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

    const handleReload = () => {
        setCategory(mainData)
    }

    // 메인 카테고리 선택 이벤트
    const handleIndexChange = () => {
        if(!entry) {
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

    useEffect(() => {
        getData();
    }, [props.data]);

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
        dots: true,
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
                                    <div key={uuidv4()} className={classes.silderBox}>
                                        {ele.values.length === 0 ? <div className={classes.emptyItemBox}>empty</div> : ele.values.map((data) => {
                                            return <ContentList key={uuidv4()} data={data} onUpdateCategory={handleCategoryUpdate}/>
                                        })}
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
