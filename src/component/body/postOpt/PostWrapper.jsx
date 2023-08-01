import {useSelector} from "react-redux";
import Post from "./Post";

function PostWrapper(){
    const postOpen = useSelector((state) => state.modal.postOpen)

    return postOpen ? <Post /> : null;
}

export default PostWrapper
