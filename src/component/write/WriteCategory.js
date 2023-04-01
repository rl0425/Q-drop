import classes from "./WriteCategory.module.css"
import {v4 as uuidv4} from "uuid";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState, useRef, useContext} from "react";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useHttp from "../../hooks/use-http";
import Content from "../body/category/Content";
import {writeActions} from "../../store/write-slice";


function WriteCategory(props){
    const [openAnimation, setOpenAnimation] = useState(false);
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [subs, setSubs] = useState([props.activeNum]);
    const [subName, setSubName] = useState("");
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        setOpenAnimation(true)
    }, [])

    useEffect(() => {
        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' }, (taskObj) =>{
                taskObj.map((ele) => (
                    ele.allSelect = false
                ))
                setTasks(taskObj);
                setDataLoaded(true)
            }
        );
    }, [fetchTasks]);

    const closeEvt = () => {
        setOpenAnimation(false)

        setTimeout(()=>{
            dispatch(writeActions.handleCategoryOpen({categoryOpen:false}))
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
        const newArray = [...subs]
        const index = newArray.indexOf(ele.id)

        if(index !== -1 && ele.type === "remove") {
            newArray.splice(index, 1)
            setSubs("")
            setSubName("")
        }

        if(ele.type === "add") {
            setSubs([ele.id])
            setSubName(ele.text)
        }
    }

    // 변경사항 완료 버튼 이벤트
    const handleComplete = () => {
        closeEvt()
        props.setCategory({id:subs, text:subName})
    }

    if(isLoading && !dataLoaded){
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
                                                {ele.subCategories.length > 0 ?
                                                    ele.subCategories.map((data) => {
                                                        return (
                                                            <Content key={uuidv4()} data={data}
                                                                     mainId={ele.categoryId} subs={subs}
                                                                     selectEvt={subSelectEvt}/>
                                                        )
                                                    })
                                                    :
                                                    <div className={classes.noContents}><span>카테고리가 존재하지 않습니다.</span></div>
                                                }
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

export default WriteCategory
