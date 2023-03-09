import classes from "./BodyHead.module.css"
import {useDispatch} from "react-redux";
import {categoryActions} from "../../../store/category-slice";
import {useState} from "react";

function BodyHead(props){
    const dispatch = useDispatch()

    const [activeIndex, setIndex] = useState(1)

    const categoryClickEvt = (index) =>{
        setIndex(index)
    }

    const searchClick = () => {
        dispatch(categoryActions.changeOpen({open:true}))
    }

    console.log("props= ", props)

    return (
        <div className={classes.box}>
            <div className={classes.contents}>
                {props.data.map((ele, index) => {
                    return (
                        <div onClick={()=> categoryClickEvt(index)} className={activeIndex === index ? `${classes.categoryBox} ${classes.active}` : classes.categoryBox}>
                            {ele.mainCategoryName}
                        </div>
                    )
                })}
            </div>
            <div onClick={searchClick} className={classes.setting}>
                <div>img</div>
            </div>
        </div>
    )
}

export default BodyHead
