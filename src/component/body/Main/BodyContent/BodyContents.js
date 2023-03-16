import {v4 as uuidv4} from "uuid";
import classes from "./BodyContents.module.css"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, {useState, useEffect, useRef} from "react";
import useHttp from "../../../../hooks/use-http";
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch, useSelector} from "react-redux";
import {mainDataActions} from "../../../../store/mianData-slice";

function BodyContents(props){
    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState([])
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    // 정렬 이벤트
    const [sortType, setSortType] = useState("new")

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

    const dispatch = useDispatch()

    const getData = () => {
        const subCategoryPromise = new Promise((resolve, reject) => {
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?id=`}, (taskObj) => {
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
        })

        return subCategoryPromise;

    }

    const setDataOrder = (sortType) =>{

        if (tasks.length === 0) {
            return category;
        }
        else {
            return (
                setCategory(prevArray =>
                    prevArray.map(categoryItem => {
                        const updatedCategoryItem = {...categoryItem};
                        const taskData = [];

                        tasks.forEach(task => {
                            if (task.mainCategory.main_category_id === categoryItem.id) {
                                taskData.push(task);
                            }
                        });

                        const sortData = sortType === "new" ? taskData.sort((a, b) => new Date(b.createTime) - new Date(a.createTime)) : taskData.sort((a, b) => new Date(b.board_like.total_like_count) - new Date(a.board_like.total_like_count))

                        updatedCategoryItem.data = sortData;
                        return updatedCategoryItem;
                    })
                ))
        }
    }

    // 세부 카테고리 설정 모달 이벤트
    const optClickEvt = (ele) => {
        dispatch(modalActions.changePostOpen({open: true, id: ele}))
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
        if(sortType === "new") setSortType("joah")
        else setSortType("new")
    }

    useEffect(() => {
        getData();
    }, [props.data]);

    useEffect(() => {

        if (category.length > 0) {
            setDataOrder();
            setDataLoaded(true)
        }
    }, [category]);

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
        return (
            <div className={classes.box}>
                <div onClick={handleSortChange} className={classes.sortBox}>
                    <span>{sortType === "new" ? "최신순" : "좋아요순"}</span>
                    <img src={"/images/icons/arrowBox.png"}/>
                </div>
                <Slider {...settings} ref={sliderRef}>
                        {(!category || category.length === 0) ? <div></div>:
                            category.map((ele, index) => {
                                return (
                                    <div key={uuidv4()} className={classes.silderBox}>
                                        {ele.values.length === 0 ? <div className={classes.emptyItemBox}>empty</div> : ele.values.map((data) => {
                                            return (
                                                <div key={uuidv4()} ref={index === 5 ? bottomBoundaryRef : noRef}
                                                     className={classes.itemBox} key={uuidv4()}>
                                                    <div className={classes.qSpanBox}>
                                                        <div className={classes.qSpan}><span>Q.</span></div>
                                                    </div>
                                                    <div className={classes.contentBox}>
                                                        <div className={classes.questionBox}><span>{data.title}</span></div>
                                                        <div className={classes.answerBox}><span>{data.content}</span></div>
                                                        <div className={classes.optBox}>
                                                            <div className={classes.heartBox}>
                                                                <img style={{width: "20px", height: "17px"}}
                                                                     src={data.board_like.user_like_status ? "images/icons/colorHeart.png" : "images/icons/heart.png"}/>
                                                                <span>{data.board_like.total_like_count}</span>
                                                            </div>
                                                            <img style={{width: "20px", height: "17px"}}
                                                                 src={data.bookmark_info.user_bookmark_status ? "images/icons/colorStar.png" : "images/icons/star.png"}/>
                                                            <div onClick={() => optClickEvt(data.id)}>
                                                                <img style={{width: "3px", height: "14px"}}
                                                                     src={"images/icons/option.png"}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                            })
                        }
                </Slider>
            </div>
        )
    }
}

export default BodyContents
