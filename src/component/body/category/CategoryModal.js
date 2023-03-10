import classes from "./CategoryModal.module.css"
import {v4 as uuidv4} from "uuid";
import {useSelector, useDispatch} from "react-redux";
import SwipeableViews  from 'react-swipeable-views';
import {categoryActions} from "../../../store/category-slice";
import {useEffect, useState} from "react";
import useHttp from "../../../hooks/use-http";
import Content from "./Content";

function CategoryModal(){
    const open = useSelector((state) => state.category.open)
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            setTasks(tasksObj);
        };

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' },
            transformTasks
        );
    }, [fetchTasks]);

    console.log("tasks = ", tasks)

    const openEvt = () => {
        dispatch(categoryActions.changeOpen({open:false}))
    }

    const handleIndexChange = (index) => {
        setIndex(index);
    };

    const categoryClickEvt = (index) => {
        setIndex(index);
    }

    const categoryData = {
        category: ["개발", "디자인", "기획", "마케팅", "HR"]
    }

    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        return (
            <div className={open ? classes.box : classes.nonBox}>
                <div className={classes.head}>
                    <div className={classes.header}>
                        <div className={classes.spanHeader}><span>관심 카테고리 설정</span></div>
                        <div onClick={openEvt} className={classes.exit}><span>닫기</span><img/></div>
                    </div>
                    <div className={classes.categorySet}>
                        {tasks.map((ele, index) => {
                            return (
                                <div key={index} onClick={()=>categoryClickEvt(index)} className={index === pageIndex ? classes.category : `${classes.category} ${classes.noSelect}`}>
                                    <span>{ele.mainCategoryName}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.body}>
                    <SwipeableViews index={pageIndex} onChangeIndex={handleIndexChange}>
                        {tasks.map((ele, index) => {
                            if(ele){
                                console.log("Ele =" ,ele)
                                return (
                                    <div key={uuidv4()} style={{ height : '100vh'}}>
                                        {ele.subCategories.map((data) => {
                                            return (
                                                // <div key={uuidv4()}>asd</div>
                                                <Content key={uuidv4()} data={data}/>
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

                    </SwipeableViews>
                </div>
                <div className={classes.footer}>
                    <div className={classes.footerBox}>
                        <span>카테고리 설정 완료</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default CategoryModal
