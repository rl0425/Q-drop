import {useSelector} from "react-redux";
import WrittenNote from "../WrittenNote";

function WrittenWrapper(){
    const open = useSelector((state) => state.myPage.writtenOpen)
    return open ? <WrittenNote/> : null;
}

export default WrittenWrapper
