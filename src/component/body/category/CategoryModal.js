import classes from "./CategoryModal.module.css"
import {v4 as uuidv4} from "uuid";
import {useSelector, useDispatch} from "react-redux";
import {categoryActions} from "../../../store/category-slice";
import {useEffect, useState, useRef, useContext} from "react";
import useHttp from "../../../hooks/use-http";
import Content from "./Content";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {mainDataActions} from "../../../store/mianData-slice";
import {CategorySettings, UserContext} from "../Home";
// register Swiper custom elements

function CategoryModal(){
    const [openAnimation, setOpenAnimation] = useState(false);
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [subs, setSubs] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const sliderRef = useRef(null);

    const categoryData = useSelector((state) => state.main.categoryData)

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            setTasks(tasksObj);
        };

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' },
            transformTasks
        );
    }, [fetchTasks]);


    useEffect(() => {
        setSubjectList()

    }, [categoryData])

    useEffect(() => {
        setOpenAnimation(true)
    }, [])

    const setSubjectList = () => {
        const selectedSubs = []

        categoryData.map((ele) => {
            ele.bookmark_sub_categories.map((data) => {
                if(data.selected){
                    selectedSubs.push(data.sub_category_id)
                }
            })
        })

        setSubs([...subs, ...selectedSubs])
    }

    const closeEvt = () => {
        setOpenAnimation(false)

        setTimeout(()=>{
            dispatch(categoryActions.changeOpen({open:false}))
        }, 500)
    }

    // 헤더로 인덱스 변경
    const handleIndexChange = (index) => {
        setIndex(index);
        sliderRef.current.slickGoTo(index, true);
    };

    // 슬라이드로 인덱스 변경
    const handleSlideChange = (index) => {
        setIndex(index);
    };

    // 서브카테고리 선택 이벱트
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

    // 변경사항 완료 버튼 이벤트
    const handleComplete = () => {
        const completePost = (data) => {
            dispatch(mainDataActions.changeSubCategory({subCategoryList:subs}))
            closeEvt()
        }

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark',  type:"post", dataType:"id", data: {type:"id", item:subs}},
            // { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/post/1',  type:"post", dataType:"subCategoryId", data:subs},
            completePost
        );
    }

    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        const settings = {
            dots: false,
            infinite: false,
            speed:200,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange:  handleSlideChange
            // beforeChange: (current,next) => handleSlideChange(next)
            // beforeChange: (current, next) => setState({ slideIndex: next })
        };

        return (
            <>
                <div className={openAnimation ? classes.blackBack : classes.nonBlackBack}>
                {/*<div className={openAnimation ? classes.blackBack : classes.nonBlackBack}>*/}

                </div>
                <div className={openAnimation ? classes.box : classes.nonBox}>
                {/*<div className={openAnimation ? classes.box : classes.nonBox}>*/}
                    <div className={classes.head}>
                        <div className={classes.header}>
                            <div className={classes.spanHeader}><span>관심 카테고리 설정</span></div>
                            <div onClick={closeEvt} className={classes.exit}><span>닫기</span><img/></div>
                        </div>
                        <div className={classes.categorySet}>
                            {tasks.map((ele, index) => {
                                return (
                                    <div key={uuidv4()} onClick={()=>handleIndexChange(index)} className={index === pageIndex ? classes.category : `${classes.category} ${classes.noSelect}`}>
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
                                            <div className={classes.jonh} key={uuidv4()}>
                                            {ele.subCategories.map((data) => {
                                                return (
                                                    <Content key={uuidv4()} data={data} subs={subs} selectEvt={subSelectEvt}/>
                                                )
                                            })}
                                            </div>
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
                        <div onClick={handleComplete} className={classes.footerBox}>
                            <span>카테고리 설정 완료</span>
                        </div>
                    </div>
                </div>
            </>
        )


    }

}

export default CategoryModal
