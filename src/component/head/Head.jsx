import classes from "./Head.module.css"
import {useDispatch} from "react-redux";
import {searchActions} from "../../store/search-slice";

function Head(){
    const dispatch = useDispatch()

    const searchClickEvt = () => {
        dispatch(searchActions.changeOpen({open:true}))
    }

    return (
        <div className={classes.box}>
            <div><img />Logo</div>
            <div onClick={searchClickEvt} className={classes.search}><img src={"/images/icons/mainSearch.png"}/></div>
        </div>
    )
}

export default Head

