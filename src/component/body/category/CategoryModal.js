import classes from "./CategoryModal.module.css"
import {v4 as uuidv4} from "uuid";
import {useSelector, useDispatch} from "react-redux";
import SwipeableViews  from 'react-swipeable-views';
import {categoryActions} from "../../../store/category-slice";
import {useEffect, useState, useRef} from "react";
import useHttp from "../../../hooks/use-http";
import Content from "./Content";

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

import { register } from 'swiper/element/bundle';
// register Swiper custom elements

function CategoryModal(){
    const open = useSelector((state) => state.category.open)
    const [openAnimation, setOpenAnimation] = useState(false);
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [subs, setSubs] = useState([1,2,4,6]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const swiperContainer = useRef(null);
    const [allowTouchMove, setAllowTouchMove] = useState(false);

    register();

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            setTasks(tasksObj);
        };

        const transformSubs = (tasksObj) => {
            setTasks(tasksObj);
        };

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' },
            transformTasks
        );
        // fetchTasks(
        //     { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option={all}' },
        //     transformSubs
        // );
    }, [fetchTasks]);


    const openEvt = () => {
        dispatch(categoryActions.changeOpen({open:false}))
    }

    const handleIndexChange = (index) => {
        setIndex(index);
    };

    const subSelectEvt = (ele) => {
        let newArray = [...subs]
        const index = newArray.indexOf(ele.id)

        if(index !== -1 && ele.type === "remove") {
            newArray.splice(index, 1)
            setSubs(newArray)
        }

        if(ele.type === "add") {
            newArray = [ele.id , ...newArray]
            setSubs(newArray)
        }
    }

    const [bodyHeight, setBodyHeight] = useState('auto');
    const [slideScrollPositions, setSlideScrollPositions] = useState({});

    const swiperElRef = useRef(null);

    // const handleSlideChange = (e) => {
    //     // get the Swiper instance
    //     const swiper = swiperElRef.current.swiper;
    //     const activeIndex = swiper.activeIndex;
    //     const slideHeight = swiper.slides[activeIndex].clientHeight;
    //
    //     setBodyHeight(`${slideHeight}px`);
    //
    //     // get the scroll position for the active slide
    //     const scrollTop = slideScrollPositions[activeIndex];
    //     const containerEl = swiperElRef.current;
    //
    //     console.log("swiperElRef.current= ", swiperElRef.current.scrollTop)
    //     console.log("containerEl= ", containerEl.scrollTop)
    //
    // };

    const handleScroll = (e) => {
        console.log("asdasdasas")
    }

    const handleSlideScroll = (index, scrollTop) => {
        setSlideScrollPositions(prevState => ({
            ...prevState,
            [index]: scrollTop
        }));
    };
    //
    // useEffect(() => {
    //     // listen for Swiper events using addEventListener
    //     swiperElRef.current.addEventListener('progress', (e) => {
    //         const [swiper, progress] = e.detail;
    //     });
    //
    //     swiperElRef.current.addEventListener('slidechange', (e) => {
    //         handleSlideChange(e)
    //     });
    // }, []);


    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        setTimeout(()=>{
            setOpenAnimation(true)
        },50)

        return (
            <>
                <div className={classes.blackBack}>

                </div>
                <div className={openAnimation ? classes.box : classes.nonBox}>
                    <div className={classes.head}>
                        <div className={classes.header}>
                            <div className={classes.spanHeader}><span>관심 카테고리 설정</span></div>
                            <div onClick={openEvt} className={classes.exit}><span>닫기</span><img/></div>
                        </div>
                        <div className={classes.categorySet}>
                            {tasks.map((ele, index) => {
                                return (
                                    <div key={index} onClick={()=>handleIndexChange(index)} className={index === pageIndex ? classes.category : `${classes.category} ${classes.noSelect}`}>
                                        <span>{ele.mainCategoryName}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={classes.body} >
                        <swiper-container
                            // style={{ height: bodyHeight }}
                            ref={swiperElRef}
                            observer="false">
                                {tasks.map((ele, index) => {
                                    if(ele){
                                        return (
                                            <swiper-slide
                                                style = {{overflow : "auto"}}
                                            >
                                                {ele.subCategories.map((data) => {
                                                    return (
                                                        <>
                                                            <Content selectEvt={subSelectEvt} key={uuidv4()} data={data} subs={subs} onScroll={(e) => handleSlideScroll(index, e.target.scrollTop)}/>
                                                        </>
                                                    )
                                                })}
                                            </swiper-slide>
                                        )
                                    }
                                    else{
                                        return  (
                                            <div key={uuidv4()}>asd</div>
                                        )
                                    }
                                })}
                        </swiper-container>
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.footerBox}>
                            <span>카테고리 설정 완료</span>
                        </div>
                    </div>
                </div>
            </>
        )


    }

}

export default CategoryModal
