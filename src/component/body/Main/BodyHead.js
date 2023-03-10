import classes from "./BodyHead.module.css"
import {useDispatch} from "react-redux";
import {categoryActions} from "../../../store/category-slice";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";

function BodyHead(props){
    const dispatch = useDispatch()

    const [activeIndex, setIndex] = useState(1)

    const categoryClickEvt = (index) =>{
        setIndex(index)
    }

    const searchClick = () => {
        dispatch(categoryActions.changeOpen({open:true}))
    }

    return (
        <div className={classes.box}>
            <div className={classes.contents}>
                {props.data.map((ele, index) => {
                    return (
                        <div key={uuidv4()} onClick={()=> categoryClickEvt(index)} className={activeIndex === index ? `${classes.categoryBox} ${classes.active}` : classes.categoryBox}>
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
