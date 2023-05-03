import {v4 as uuidv4} from "uuid";
import classes from "./BodyContents.module.css"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, {useState, useEffect, useRef} from "react";
import useHttp from "../../../../hooks/use-http";
import {useDispatch, useSelector} from "react-redux";
import {mainDataActions} from "../../../../store/mianData-slice";
import ContentList from "./ContentList";

import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from 'lottie-react-web';

import animationData from '../../../../jsons/spinner.json';
import {writeActions} from "../../../../store/write-slice";

const BodyContents = React.memo((props) => {
    const [category, setCategory] = useState([])
    const {isLoading, error, sendRequest: fetchTasks} = useHttp();

    // 정렬 이벤트
    const [sortType, setSortType] = useState("first")

    // 스크롤 이벤트 ref
    const [pageNum, setPageNum] = useState(0)
    const [pageEnd, setPageEnd] = useState([])

    // 슬라이더 ref
    const sliderRef = useRef(null);
    const infRef = useRef(null);

    // 슬라이드 여부
    const [isSlide, setIsSlide] = useState(false)

    // 슬라이더
    const index = useSelector((state) => state.main.index)
    const entry = useSelector((state) => state.main.entry)

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);

    // 로그인 여부
    const isLogin = useSelector((state) => state.main.isLogin)

    const dispatch = useDispatch()

    // reducer data
    const mainData = useSelector((state) => state.main.contentList)

    // 스크롤바 표시 여부
    const [showScrollbar, setShowScrollbar] = useState(false);

    // 스크롤바 액션
    const [scrollAction, setScrollAction] = useState(false)
    // 스크롤 타이머 이벤트를 저장할 변수
    const [timeoutId, setTimeoutId] = useState(null);

    const infiniteScrollRefs = useRef([]); // useRef를 저장할 배열 ref

    useEffect(() => {
        getData();
    }, [props.categoryData, props.reloadSwitch]);

    useEffect(() => {
        if (category.length > 0) {
            handleReload()

        }
    }, [mainData])

    useEffect(() => {
        if (category.length > 0) {
            setDataOrder();
            setTimeout(() => {
                setDataLoaded(true)
            }, 1000)
        }
    }, [sortType]);

    useEffect(() => {
        handleIndexChange()
    }, [index, sortType]);

    const getData = () => {
        setPageNum(0)

        if (pageEnd.length > 0) {
            setPageEnd(prev => prev.map(item => ({...item, end: false})));
        }
        const subCategoryPromise = new Promise(async (resolve, reject) => {
            try {
                const promises = props.categoryData.map(async (ele) => {

                    return Promise.all(
                        ele.bookmark_sub_categories.map(async (data) => {

                            if (isLogin) {
                                if (data.selected) {
                                    return data.sub_category_id;
                                }
                            } else {
                                return data.sub_category_id;
                            }
                        })
                    ).then((trueList) => {
                        const values = trueList.length === 0 && trueList[0] === undefined ? [1000000000] : [...trueList];

                        console.log("trueList= ", trueList)
                        console.log("values= ", values)

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
                if (ele.bookmark_sub_categories.length > 0) {
                    const hasId = groupedData.find(u => u.id === ele.main_category_id)
                    if (!hasId) {
                        groupedData.push({
                            id: ele.main_category_id,
                            values: []
                        })
                    }
                }
            })

            setCategory(groupedData)
            const temp = [...groupedData]
            dispatch(mainDataActions.handleContent({contentList: temp}))
            setSortType("new")

            groupedData.map((data) => {
                setPageEnd(prev => {
                    if (prev.some(item => item.id === data.id)) {
                        return prev; // 이미 해당 id가 있는 경우 이전 배열을 반환합니다.
                    } else {
                        return [...prev, {id: data.id, end: false}]; // 해당 id가 없는 경우 새로운 요소를 추가합니다.
                    }
                });
            })


        })

        return subCategoryPromise;

    }

    const setDataOrder = () => {
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

    const getMoreDatas = (element) => {
        if (isLogin) {

            fetchTasks({
                    url: `http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=selected`,
                },
                (object) => {
                    const filterArr = object.filter(ele => ele.main_category_id === element.id)
                    const subCategoryIds = filterArr[0].bookmark_sub_categories.map((category) => {
                        return category.sub_category_id;
                    });

                    handleMoreData(subCategoryIds, element)
                }
            )
        } else {
            const categoryData = props.data.find(ele => ele.categoryId === element.id)
            const subCategoryIds = categoryData.subCategories.map(element => element.id);

            handleMoreData(subCategoryIds, element)
        }

        setPageNum(prev => prev + 1)
    }

    const handleMoreData = (subCategoryIds, element) => {
        fetchTasks(
            {
                url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?sub_id=${subCategoryIds.join(",")}&search=&paging_num=${pageNum + 1}&paging_count=5`,
            },
            (taskObj) => {
                if (taskObj.length > 0) {
                    const temp = category.map((ele) => {

                        if (ele.id === element.id) {
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
                    setTimeout(() => {
                        dispatch(mainDataActions.handleContent({contentList: temp}))
                    }, 700)

                } else {
                    setPageEnd(prev => prev.map(item => {
                        if (item.id === element.id) {
                            return {id: item.id, end: true};
                        } else {
                            return item;
                        }
                    }));
                }
            }
        );
    }

    const handleReload = () => {
        setCategory(mainData)

        const temp = JSON.parse(JSON.stringify(mainData))
        temp.sort((a, b) => {
            return a.id - b.id;
        });

        setCategory(temp);
    }

    // 메인 카테고리 선택 이벤트
    const handleIndexChange = () => {
        if (!entry && sliderRef.current) {
            sliderRef.current.slickGoTo(index, true);
        }
    };

    // 메인에서 슬라이드 이벤트
    const handleSlideChange = (index) => {
        dispatch(mainDataActions.handleIndex({index: index, entry: false}))
    };

    const handleSortChange = () => {
        setDataLoaded(false);

        if (sortType === "new") setSortType("like")
        else setSortType("new")
    }

    const handleCategoryUpdate = (e, data) => {
        e.preventDefault()
        e.stopPropagation()

        const temp = category.map((ele) => {

            if (ele.id === data.data.mainCategory.main_category_id) {
                const originalValues = ele.values.findIndex(item => item.id === data.data.id)
                const updatedValues = ele.values.filter(item => item.id !== data.data.id);
                updatedValues.splice(originalValues, 0, data.data);

                return {
                    ...ele,
                    values: updatedValues,
                };
            }

            return ele;
        });

        dispatch(mainDataActions.handleContent({contentList: temp}));
    }

    const getMoreData = (props) => {
        getMoreDatas(props)
    }


    const handleIsScroll = () => {
        setIsSlide(true)

        setScrollAction(true); // 스크롤바 보이기

        if (timeoutId) {
            clearTimeout(timeoutId); // 이전 타임아웃 취소
        }

        const newTimeoutId = setTimeout(() => {
            setScrollAction(false);
        }, 3000);

        setTimeoutId(newTimeoutId); // 새로운 타임아웃 ID 저장
    };

    const loader = (
        <div className={classes.loadingDiv}>
            {/* Lottie 애니메이션 컴포넌트 */}
            <Lottie options={{ animationData: animationData }} />
        </div>
    );

    const handleWritePage = () => {
        dispatch(writeActions.handleOpen({open: true}))
    }

    const handleTopClick = () =>{
        const firstDiv = infiniteScrollRefs.current[index]?.el?.querySelector('div:first-child')
        if (firstDiv) {
            firstDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        afterChange: handleSlideChange
    };

    if (isLoading || !dataLoaded) {
        return (
            <>
                <div className={classes.box}>
                    <div onClick={handleSortChange} className={classes.sortBox}>
                        <span>{sortType === "new" || sortType === "first" ? "최신순" : "좋아요 순"}</span>
                        <img src={"/images/icons/arrowBox.png"}/>
                    </div>
                    <Slider {...settings} ref={sliderRef}>
                        {(!category || category.length === 0) ? <div></div> :
                            category.map((ele, index) => {
                                return (
                                    <div key={uuidv4()} className={classes.scrollDiv} style={{height: "fit-content"}}>
                                        {ele.values.length === 0 ?
                                            <div className={classes.emptyItemBox}>
                                                <span>게시글이 존재하지 않습니다.</span>
                                                <label>카테고리를 설정해주세요.</label>
                                            </div> :

                                            <InfiniteScroll
                                                dataLength={ele.values.length}
                                                next={() => getMoreData(ele)}
                                                hasMore={!pageEnd[index].end}
                                                style={{overflow: "scroll", height: "100%"}}
                                                loader={<div className={classes.loadingDiv}><Lottie options={{
                                                    animationData: animationData
                                                }}/></div>}
                                                className={classes.noScrollComponent}
                                                height={"0"}
                                                onScroll={!isSlide ? handleIsScroll : ""}
                                            >

                                                {ele.values.map((data, index) => (
                                                    <ContentList key={uuidv4()} data={data}
                                                                 onUpdateCategory={handleCategoryUpdate}
                                                                 dataLoaded={false}/>
                                                ))}


                                            </InfiniteScroll>
                                        }
                                    </div>

                                )
                            })
                        }
                    </Slider>
                </div>
            </>
        );
    } else if (error) {
        return <div>error</div>
    } else {
        return (
            <>
                <div className={classes.box}>
                    <div onClick={handleSortChange} className={classes.sortBox}>
                        <span>{sortType === "new" ? "최신순" : "좋아요 순"}</span>
                        <img src={"/images/icons/arrowBox.png"}/>
                    </div>
                    <Slider {...settings} ref={sliderRef}>
                        {(!category || category.length === 0) ? <div></div> :
                            category.map((ele, index) => {
                                return (
                                    <div
                                        key={uuidv4()}
                                        className={classes.scrollDiv}
                                        style={{height: "fit-content"}}>
                                        {ele.values.length === 0 ?
                                            <div className={classes.emptyItemBox}>
                                                <span>게시글이 존재하지 않습니다.</span>
                                                <label>카테고리를 설정해주세요.</label>
                                            </div> :

                                            <InfiniteScroll
                                                ref={(el) => (infiniteScrollRefs.current[index] = el)}
                                                className={scrollAction ? classes.scrollComponentDiv : classes.noScrollComponent}
                                                dataLength={ele.values.length}
                                                next={() => getMoreData(ele)}
                                                hasMore={!pageEnd[index].end}
                                                style={{overflow: "scroll", height: "100%"}}
                                                loader={showScrollbar ? loader : null} // 스크롤바 보이는 동안만 로더 컴포넌트 렌더링
                                                height={"100%"}
                                                onScroll={handleIsScroll}
                                            >

                                                {ele.values.map((data, index) => (
                                                    <ContentList key={uuidv4()} data={data}
                                                                 onUpdateCategory={handleCategoryUpdate}
                                                                 dataLoaded={true}/>
                                                ))}

                                            </InfiniteScroll>
                                        }
                                    </div>

                                )
                            })
                        }
                    </Slider>
                </div>

                {isLogin ?
                    <>
                        <div onClick={handleWritePage} className={!isSlide ? classes.writeBox : classes.smallWriteBox}>
                            <img src={"/images/icons/writeAdd.png"}/>
                            {!isSlide ? <span>글쓰기</span> : ""}
                        </div>
                        {isSlide ?
                            <div onClick={handleTopClick} className={classes.upArrowBoxWith}>
                                <img src={"/images/icons/upBtn.svg"}/>
                            </div> : ""
                        }
                    </>
                    :
                    <div onClick={handleTopClick} className={classes.upArrowBoxWithout}>
                        <img src={"/images/icons/upBtn.svg"}/>
                    </div>
                }
            </>
        )
    }

})

export default BodyContents
