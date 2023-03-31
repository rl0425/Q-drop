import classes from "./BodyHead.module.css"
import {useDispatch, useSelector} from "react-redux";
import {categoryActions} from "../../../store/category-slice";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {mainDataActions} from "../../../store/mianData-slice";
import {logDOM} from "@testing-library/react";

function BodyHead(props){
    const dispatch = useDispatch()

    const activeIndex = useSelector((state) => state.main.index)

    const categoryClickEvt = (index) =>{
        dispatch(mainDataActions.handleIndex({index:index}))
    }

    const searchClick = () => {
        dispatch(categoryActions.changeOpen({open:true}))
    }

    const handleCategoryList = () => {

    }

    useEffect(() => {
        handleCategoryList()
    },[])

    return (
        <div className={classes.box}>
            <div className={classes.contents}>
                {props.categoryData.map((ele, index) => {
                    if(ele.bookmark_sub_categories.length === 0){ return }
                    else {
                        return (
                            <div key={uuidv4()} onClick={() => categoryClickEvt(index)}
                                 className={activeIndex === index ? `${classes.categoryBox} ${classes.active}` : classes.categoryBox}>
                                {ele.main_category_name}
                            </div>
                        )
                    }
                })}
            </div>
            <div onClick={searchClick} className={classes.setting}>
                <div><img src={"/images/icons/subModalBtn.png"}/></div>
            </div>
        </div>
    )
}

export default BodyHead
