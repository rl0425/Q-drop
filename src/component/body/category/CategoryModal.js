import classes from "./CategoryModal.module.css"
import {v4 as uuidv4} from "uuid";
import {useSelector, useDispatch} from "react-redux";
import {categoryActions} from "../../../store/category-slice";
import {useEffect, useState, useRef} from "react";
import useHttp from "../../../hooks/use-http";
import Content from "./Content";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { register } from 'swiper/element/bundle';
import {logDOM} from "@testing-library/react";
// register Swiper custom elements

function CategoryModal(){
    const open = useSelector((state) => state.category.open)
    const [openAnimation, setOpenAnimation] = useState(false);
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [test1, setTest1] = useState([]);
    const [subs, setSubs] = useState([1,2,4,6]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const [state, setState] = useState({slideIndex:0, updateCount:0})

    register();

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            setTasks(tasksObj);
        };

        const transformSubs = (tasksObj) => {
            setTest1(tasksObj);
        };

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' },
            transformTasks
        );
        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=all', header:true},
            transformSubs
        );
    }, [fetchTasks]);


    const openEvt = () => {
        dispatch(categoryActions.changeOpen({open:false}))
    }

    const handleIndexChange = (index) => {
        setIndex(index);

        sliderRef.current.slickGoTo(index, true);
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

    const sliderRef = useRef(null);

    console.log("test1 = ", test1)

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

        const settings = {
            dots: true,
            infinite: false,
            speed:500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: () =>
                setState(prevState => {
                    const content = {
                        slideIndex:prevState.slideIndex,
                        updateCount:prevState.updateCount + 1
                    }

                    return content
                }),
            // beforeChange: (current, next) => setState({ slideIndex: next })
        };

        return (
            <>
                <div className={openAnimation ? classes.blackBack : classes.nonBlackBack}>

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
                        <Slider {...settings} ref={sliderRef}>
                                {tasks.map((ele, index) => {
                                    if(ele){
                                        return (
                                            // <SwiperSlide key={uuidv4()}>
                                                <div className={classes.jonh}>
                                                {ele.subCategories.map((data) => {
                                                    return (
                                                        <>
                                                            <Content key={uuidv4()} data={data} subs={subs} selectEvt={subSelectEvt}/>
                                                        </>
                                                    )
                                                })}
                                                </div>
                                            // </SwiperSlide>
                                        )
                                    }
                                    else{
                                        return  (
                                            <div key={uuidv4()}>asd</div>
                                        )
                                    }
                                })}
                        </Slider>
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
