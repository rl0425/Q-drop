import {useSelector} from "react-redux";
import WriteCategory from "./WriteCategory";

function WriteCategoryWrapper(props){
    const open = useSelector((state) => state.write.categoryOpen)
    const setCategory = (ele) => {
        props.setCateogry(ele)
    }

    return open ? <WriteCategory setCategory={setCategory} activeNum={props.activeNum}/> : null;
}

export default WriteCategoryWrapper
