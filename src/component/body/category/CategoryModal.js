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
    const [openAnimation, setOpenAnimation] = useState(false);
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const [tasks, setTasks] = useState([]);
    const [subs, setSubs] = useState([1,2,4,6]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

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

    console.log("tasks = ", tasks)
    console.log("subs = ", subs)

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
                    <div className={classes.body}>
                        <SwipeableViews index={pageIndex} onChangeIndex={handleIndexChange}>
                            {tasks.map((ele, index) => {
                                if(ele){
                                    return (
                                        <div key={uuidv4()} style={{ height : '100vh'}}>
                                            {ele.subCategories.map((data) => {
                                                return (
                                                    // <div key={uuidv4()}>asd</div>
                                                    <Content selectEvt={subSelectEvt} key={uuidv4()} data={data} subs={subs}/>
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
            </>
        )
    }

}

export default CategoryModal
