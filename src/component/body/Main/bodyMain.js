import classes from "./bodyMain.module.css"
import {useDispatch} from "react-redux";
import {categoryActions} from "../../../store/category-slice";

function BodyMain(){
    const dispatch = useDispatch()

    const searchClick = () => {
        dispatch(categoryActions.changeOpen({open:true}))
    }

    return (
        <div className={classes.box}>
            <div className={classes.contents}>Content Set</div>
            <div onClick={searchClick} className={classes.setting}>
                <div>img</div>
            </div>
        </div>
    )
}

export default BodyMain
