import {useSelector} from "react-redux";
import Write from "./Write";

function WriteWrapper(){
    const open = useSelector((state) => state.write.open)
    return open ? <Write/> : null;
}

export default WriteWrapper
