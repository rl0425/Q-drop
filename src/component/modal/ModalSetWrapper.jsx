import PostModalWrapper from "./PostModalWrapper";
import CategoryModalWrapper from "../body/category/CategoryModalWrapper";
import PostWrapper from "../body/postOpt/PostWrapper";

function ModalSetWrapper(){
    return (
        <>
            <CategoryModalWrapper/>
            <PostWrapper />
            <PostModalWrapper />
        </>
    )
}

export default ModalSetWrapper
