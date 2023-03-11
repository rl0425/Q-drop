import classes from "./Post.module.css"
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import modalSlice, {modalActions} from "../../../store/modal-slice";

function Post(){
    const dispatch = useDispatch()
    const [openAnimation, setOpenAnimation] = useState(false);
    const [deleteOpenAnimation, setDeleteAnimation] = useState(false);

    useEffect(() => {
        setTimeout(()=>{
            setOpenAnimation(true)
        },50)
    },[])

    const removeModalClickEvt = () => {
        dispatch(modalActions.changePostOpen({open: false, id: null}))
    }

    const deleteOpenClickEvt = () => {
        setOpenAnimation(false)
        setTimeout(()=>{
            setDeleteAnimation(true)
        },200)
    }

    return (
        <div className={classes.box}>
            <div onClick={removeModalClickEvt} className={classes.blackBox}></div>
            <div className={openAnimation ? classes.contentBox : classes.unContentBox}>
                <div><span>수정하기</span></div>
                <div onClick={deleteOpenClickEvt} className={classes.deleteBox}><span>삭제하기</span></div>
                <div className={classes.linkBox}><span>링크 공유하기</span></div>
            </div>
            <div className={deleteOpenAnimation ? classes.deleteDiv : classes.unDeleteDiv}>
                <div className={classes.deleteSpan}><span>해당 게시글을 삭제할까요?</span></div>
                <div className={classes.deleteCheck}>
                    <div onClick={removeModalClickEvt} className={classes.deleteCancel}><span>취소</span></div>
                    <div className={classes.deleteBtn}><span>삭제</span></div>
                </div>
            </div>
        </div>
    )
}

export default Post
