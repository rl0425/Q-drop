import {v4 as uuidv4} from "uuid";
import classes from "./BodyContents.module.css"

import SwipeableViews  from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import React, {useState, useEffect, useRef} from "react";
import useHttp from "../../../../hooks/use-http";
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch} from "react-redux";

function BodyContents(props){
    const [tasks, setTasks] = useState([]);
    const [pageIndex, setIndex] = useState(0);
    const [category, setCategory] = useState([])
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const bottomBoundaryRef = useRef(null);
    const noRef = useRef(null);

    const VirtualizeSwipeableViews = virtualize(SwipeableViews);

    const dispatch = useDispatch()

    const getData = async () => {
        const categoryData = [];
        const subCategorySet = new Set();

        await Promise.all(props.data.map(async (ele) => {
            const categoryItem = { id: ele.categoryId, value: 0, data:null };
            categoryData.push(categoryItem);

            await Promise.all(ele.subCategories.map(async (data) => {
                subCategorySet.add(data.id);
                await fetchTasks({ url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${data.id}?count=10&page=1` }, (tasksObj) => {

                    if(tasksObj.length > 0 ) {
                        setTasks((prevTasks) => ([...prevTasks, ...tasksObj]))
                        setCategory((prevArray) =>
                            prevArray.map((item) =>
                                item.id === tasksObj[0].mainCategory.main_category_id ? {
                                    ...item,
                                    value: item.value + 1
                                } : item
                            )
                        );
                    }
                });
            }));

        }));

        setCategory(categoryData);
    };

    const setDataOrder = () =>{
        if (tasks.length === 0) {
            return category;
        }

        return (
            setCategory(prevArray =>
                prevArray.map(categoryItem => {
                    const updatedCategoryItem = { ...categoryItem };
                    const taskData = [];

                    tasks.forEach(task => {
                        if (task.mainCategory.main_category_id === categoryItem.id) {
                            taskData.push(task);
                        }
                    });

                    updatedCategoryItem.data = taskData;
                    return updatedCategoryItem;
                })
            ))
    }

    const optClickEvt = (ele) => {
        dispatch(modalActions.changePostOpen({open: true, id: ele}))
    }

    const handleChangeIndex = (index) => {
        setIndex(index);
    };


    useEffect(() => {
        getData();
    }, [props.data]);

    useEffect(() => {
        if (tasks.length > 0) {
            setDataOrder();
        }
    }, [tasks]);

    return (
        <div className={classes.box}>
            <SwipeableViews  index={pageIndex} onChangeIndex={handleChangeIndex} virtualize>
                {category.map((ele,index) => {
                    return (
                        <div key={uuidv4()}>
                            {(!ele.data || ele.data.length === 0) ?
                                <div className={classes.emptyItemBox} key={uuidv4()}>empty</div>
                                :
                                ele.data.map((data, index) => {
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
                                                    <div>
                                                        <img style={{width: "20px", height: "17px"}}
                                                             src={"images/icons/heart.png"}/>
                                                        <span>99</span>
                                                    </div>
                                                    <img style={{width: "20px", height: "17px"}}
                                                         src={"images/icons/star.png"}/>
                                                    <div onClick={() => optClickEvt(data.id)}>
                                                        <img style={{width: "3px", height: "14px"}}
                                                             src={"images/icons/option.png"}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    )

                    // return (
                    //     <div style={{ height: ele.value * 172, containerStyle: { height: ele.value * 172 } }} className={classes.contentBox} key={uuidv4()} >
                    //         {tasks.length > 0 ? tasks.map((data, index) => {
                    //             tasks.sort((a, b) => {
                    //                 return a.id - b.id
                    //             })
                    //
                    //             if (data.mainCategory.main_category_id === ele.id) {
                    //                 empty = false
                    //
                    //                 return (
                    //                     <div key={uuidv4()} ref={index === 5 ? bottomBoundaryRef : noRef}
                    //                          className={classes.itemBox} key={uuidv4()}>
                    //                         <div className={classes.qSpanBox}>
                    //                             <div className={classes.qSpan}><span>Q.</span></div>
                    //                         </div>
                    //                         <div className={classes.contentBox}>
                    //                             <div className={classes.questionBox}><span>{data.title}</span></div>
                    //                             <div className={classes.answerBox}><span>{data.content}</span></div>
                    //                             <div className={classes.optBox}>
                    //                                 <div>
                    //                                     <img style={{width: "20px", height: "17px"}}
                    //                                          src={"images/icons/heart.png"}/>
                    //                                     <span>99</span>
                    //                                 </div>
                    //                                 <img style={{width: "20px", height: "17px"}}
                    //                                      src={"images/icons/star.png"}/>
                    //                                 <div onClick={() => optClickEvt(data.id)}>
                    //                                     <img style={{width: "3px", height: "14px"}}
                    //                                          src={"images/icons/option.png"}/>
                    //                                 </div>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    //                 )
                    //             }
                    //         }) : tasks.length === 0 && <div style={{width:"100%", height:"400px"}} className={classes.asdassa}><span></span></div>
                    //         }
                    //         {empty && <div className={classes.emptyItemBox}><span>asdasdasd</span></div>}
                    //     </div>
                    // )
                })}

            </SwipeableViews >
        </div>
    )
}

export default BodyContents
