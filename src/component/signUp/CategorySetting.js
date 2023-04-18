import React, {useEffect, useRef, useState} from "react";
import {KakaoLogin} from "../My/Login/kakaoLoginHandler";
import {useDispatch, useSelector} from "react-redux";
import classes from "./CategorySetting.module.css";
import {v4 as uuidv4} from "uuid";
import Slider from "react-slick";
import Content from "../body/category/Content";
import useHttp from "../../hooks/use-http";
import {toastActions} from "../../store/toast-slice";


function CategorySetting({rederPage}) {
    const [pageIndex, setIndex] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [subs, setSubs] = useState([]);

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);

    const sliderRef = useRef(null);
    const elementRef = useRef(null);

    const dispatch = useDispatch()
    const tempData = useSelector(state => state.login.temp)
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    console.log("tempData = ", tempData)

    useEffect(() => {
        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/users/login/signup',
                data:{email:tempData.email, nickname:tempData.profile.nickname, profileImage:tempData.profile.profile_image_url} }, (taskObj) => {
                fetchTasks(
                    {url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main'}, (taskObj) => {
                        taskObj.map((ele) => (
                            ele.allSelect = false
                        ))
                        setTasks(taskObj);

                        setSubjectList(taskObj)
                    }
                );
            })
    }, [fetchTasks]);

    const setSubjectList = (taskObj) => {
        const selectedSubs = []
        const allSelectList = []

        tasks.map((ele) => {
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

    const handlePrevBtn = () => {
        //parameter
        window.history.pushState("", "", `/signup?page=0`)
        rederPage(0)
    }

    // 슬라이드로 인덱스 변경
    const handleSlideChange = (index) => {
        setIndex(index);
    };

    const handleNextBtn = () => {
        console.log("tempData = ", tempData)


        //todo 선택한 카테고리의 대한 검증을 끝내고 북마크에 추가한 뒤 후처리 기찬
        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark',  type:"post",  data: {"id":subs}},
        );
        window.location.href = '/main'

        dispatch(toastActions.handleToastOpt({msg:"가입이 완료 되었어요.", open:true}))

    }

    // 헤더로 인덱스 변경
    const handleIndexChange = (index) => {
        setIndex(index);
        sliderRef.current.slickGoTo(index, true);
    };

    const settings = {
        dots: false,
        infinite: false,
        button:false,
        speed:200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        afterChange:  handleSlideChange
    };


    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
            </div>
            <div className={classes.body}>
                <div className={classes.body_header}>
                    <div className={classes.title}>
                        <span>👀 어떤 주제에 관심이 있으세요?</span>
                    </div>
                    <div className={classes.sub_title}>
                        <span>주제에 맞는 노트를 보여드릴게요.</span>
                    </div>
                </div>
                <div className={classes.body_content}>
                    <div className={classes.contentHead}>
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
                    <div className={classes.contentBody}>
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
                                                                <Content key={uuidv4()} data={data} mainId={ele.categoryId} subs={subs} selectEvt={subSelectEvt} type={"register"}/>
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


                </div>
            </div>

            <div className={classes.footer}>
                    {/*<div onClick={handleNextBtn} className={classes.disabled_next_btn}>*/}
                    {/*    시작해 볼까요?*/}
                    {/*</div>*/}
                <div onClick={handleNextBtn} className={classes.enable_next_btn}>
                    시작해 볼까요?
                </div>
            </div>
        </div>


    )
}

export default CategorySetting
