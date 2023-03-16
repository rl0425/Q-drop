import PostModal from "./PostModal";
import {useSelector} from "react-redux";

function PostModalWrapper(){
    const open = useSelector((state) => state.modal.detailOpen)
    return open ? <PostModal/> : null;
}

export default PostModalWrapper
