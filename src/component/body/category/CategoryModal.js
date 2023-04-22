import classes from "./CategoryModal.module.css"
import {v4 as uuidv4} from "uuid";
import {useSelector, useDispatch} from "react-redux";
import {categoryActions} from "../../../store/category-slice";
import React, {useEffect, useState, useRef, useContext} from "react";
import useHttp from "../../../hooks/use-http";
import Content from "./Content";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {mainDataActions} from "../../../store/mianData-slice";
import {toastActions} from "../../../store/toast-slice";

function CategoryModal(){
    const [openAnimation, setOpenAnimation] = useState(false);
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [subs, setSubs] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);

    const sliderRef = useRef(null);

    const categoryData = useSelector((state) => state.main.categoryData)

    const elementRef = useRef(null);

    useEffect(() => {

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' }, (taskObj) =>{
                taskObj.map((ele) => (
                    ele.allSelect = false
                ))
                setTasks(taskObj);

                setSubjectList(taskObj)

            }
        );
    }, [fetchTasks]);


    useEffect(() => {
        if(tasks.length > 0) {
            setSubjectList()
        }

    }, [])
    // }, [categoryData])

    useEffect(() => {
        setOpenAnimation(true)
    }, [])

    const setSubjectList = (taskObj) => {
        const selectedSubs = []
        const allSelectList = []

        categoryData.map((ele) => {
            ele.bookmark_sub_categories.map((data) => {
                if(data.selected){
                    selectedSubs.push(data.sub_category_id)
                }
            })

            const hasFalse = ele.bookmark_sub_categories.find((data) => data.selected === false)


            if(!hasFalse){
                allSelectList.push(ele.main_category_id)
            }
        })

        if(allSelectList.length > 0){

            const updatedTasks = allSelectList.reduce((acc, item) => {
                const findTask = taskObj.find((t) => t.categoryId === item);
                if (findTask && findTask.subCategories.length > 0) {
                    acc.push({ ...findTask, allSelect: true });
                }
                return acc;
            }, []);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    updatedTasks.find((t) => t.categoryId === task.categoryId) || task
                )
            );

        }

        setSubs([...subs, ...selectedSubs])
        setDataLoaded(true)
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
        const newArray = [...subs]
        const index = newArray.indexOf(ele.id)

        if(index !== -1 && ele.type === "remove") {
            newArray.splice(index, 1)
            setSubs(newArray)

            const taskIndex = tasks.findIndex((obj) => obj.categoryId === ele.mainId);
            const updatedObj = {...tasks[taskIndex], allSelect: false};
            const updatedArr = [...tasks.slice(0, taskIndex), updatedObj, ...tasks.slice(taskIndex + 1)];

            setTasks(updatedArr);
        }

        if(ele.type === "add") {
            const tempArray = [ele.id , ...newArray]
            setSubs(tempArray)

            const taskIndex = tasks.findIndex((obj) => obj.categoryId === ele.mainId);
            const result = tasks[taskIndex].subCategories.every(({id}) => tempArray.includes(id));

            if(result) {
                const updatedObj = {...tasks[taskIndex], allSelect: true};
                const updatedArr = [...tasks.slice(0, taskIndex), updatedObj, ...tasks.slice(taskIndex + 1)];
                setTasks(updatedArr);
            }
        }
    }

    // 변경사항 완료 버튼 이벤트
    const handleComplete = () => {
        const completePost = (data) => {
            dispatch(mainDataActions.handleSubCategory({subCategoryList:subs}))
            closeEvt()
        }

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark',  type:"post",  data: {"id":subs}},
            completePost
        );

        dispatch(toastActions.handleToastOpt({msg:"관심 카테고리가 변경되었어요.", open:true}))
    }

    const handleAllSelect = (ele) => {
        const index = tasks.findIndex((item) => item.categoryId === ele.categoryId)
        const data = tasks.filter((item) => item.categoryId === ele.categoryId)
        const removeData = tasks.filter((item) => item.categoryId !== ele.categoryId)

        if(data[0].allSelect){
            data[0].allSelect = false

            const tempSet = data[0].subCategories

            const newCate = subs.reduce((acc, cur) => {
                if (data[0].subCategories.some(item => item.id === cur)) {
                    // 현재 요소가 b 배열에 포함되어 있다면 제거
                    return acc;
                }
                // 현재 요소가 b 배열에 포함되어 있지 않다면 새로운 배열에 추가
                return [...acc, cur];
            }, []);

            setSubs(newCate)

        }
        else{
            const tempSubs = [...subs]
            data[0].allSelect = true

            data[0].subCategories.forEach(subCategory => {
                // subs 배열에 해당 id가 없으면, subs 배열에 추가합니다.
                if (!tempSubs.includes(subCategory.id)) {
                    tempSubs.push(subCategory.id);
                }
            });
            setSubs(tempSubs)
        }

        removeData.splice(index,0,data[0])
        setTasks(removeData)
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

                </div>
                <div ref={elementRef} className={openAnimation ? classes.box : classes.nonBox}>
                    <div className={classes.head}>
                        <div className={classes.header}>
                            <div className={classes.spanHeader}><span>관심 카테고리 설정</span></div>
                            <div onClick={closeEvt} className={classes.exit}>
                                <img src={"/images/icons/exit.png"}/>
                            </div>
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
                                                    <>
                                                    <div onClick={() => handleAllSelect(ele)}
                                                         className={classes.allSelect}>
                                                        {ele.allSelect ? <img src={"/images/icons/allSelectActive.png"}/> :
                                                            <img src={"/images/icons/allSelectDefault.png"}/>}
                                                        <span style={{color: ele.allSelect  ? "#48BAFB" : "#DADCE1"}}>전체 선택</span>
                                                    </div>

                                                    {
                                                        ele.subCategories.map((data) => {
                                                            return (
                                                                <Content key={uuidv4()} data={data} mainId={ele.categoryId} subs={subs} selectEvt={subSelectEvt}/>
                                                            )
                                                        })
                                                    }
                                                    </>
                                                    :
                                                    <div className={classes.noContents}><span>카테고리가 존재하지 않아요.</span></div>
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

export default CategoryModal
