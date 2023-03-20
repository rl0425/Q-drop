import classes from "./Post.module.css"
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import modalSlice, {modalActions} from "../../../store/modal-slice";
import {safePreventDefault} from "react-slick/lib/utils/innerSliderUtils";

function Post(){
    const dispatch = useDispatch()

    const [openAnimation, setOpenAnimation] = useState(false);
    const [blackAnimation, setBlackAnimation] = useState(false);
    const [deleteOpenAnimation, setDeleteAnimation] = useState(false);
    const [reportOpenAnimation, setReportAnimation] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        setTimeout(()=>{
            setOpenAnimation(true)
            setBlackAnimation(true)
        },50)
    },[])

    const removeModalClickEvt = () => {
        dispatch(modalActions.changePostOpen({open: false, id: null}))
    }

    const removeCancelClickEvt = () =>{
        setDeleteAnimation(false)
        setReportAnimation(false)
        setTimeout(()=>{
            setOpenAnimation(true)
        },200)
    }

    const deleteOpenClickEvt = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setOpenAnimation(false)
        setTimeout(()=>{
            setDeleteAnimation(true)
        },200)
    }

    const reportOpenClickEvt = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setOpenAnimation(false)
        setTimeout(()=>{
            setReportAnimation(true)
        },200)
    }

    const reportPrevBtnEvt = (e) => {
        setReportAnimation(false)
        setTimeout(()=>{
            setOpenAnimation(true)
        },200)
    }

    return (
        <div className={classes.box}>
            <div onClick={removeModalClickEvt} className={blackAnimation ? classes.blackBox : classes.unBlackBox}>

            </div>
            <div className={openAnimation ? classes.contentBox : classes.unContentBox}>
                <div><span>수정하기</span></div>
                <div onClick={deleteOpenClickEvt} className={classes.deleteBox}><span>삭제하기</span></div>
                <div onClick={reportOpenClickEvt} className={classes.reportBtnBox}><span>신고하기</span></div>
                <div className={classes.linkBox}><span>링크 공유하기</span></div>
            </div>
            <div className={deleteOpenAnimation ? classes.deleteDiv : classes.unDeleteDiv}>
                <div className={classes.deleteSpan}><span>해당 게시글을 삭제할까요?</span></div>
                <div className={classes.deleteCheck}>
                    <div onClick={removeCancelClickEvt} className={classes.deleteCancel}><span>취소</span></div>
                    <div className={classes.deleteBtn}><span>삭제</span></div>
                </div>
            </div>
            <div className={reportOpenAnimation ? classes.reportBox : classes.unReportBox}>
                <div className={classes.reportHead}>
                    <div onClick={reportPrevBtnEvt} className={classes.reportHeadBtn}><img src={"/images/icons/prevBtn.png"}/></div>
                    <div className={classes.reportHeadSpan}><span>신고사유</span></div>
                </div>
                <div className={classes.reportBody}>
                    <ul>
                        <li onClick={()=>{setSelectedIndex(0)}}><img src={selectedIndex === 0 ? "/images/icons/reportCheck.png" :  "/images/icons/circle.png" }/><span>잘못된 정보</span></li>
                        <li onClick={()=>{setSelectedIndex(1)}}><img src={selectedIndex === 1 ? "/images/icons/reportCheck.png" :  "/images/icons/circle.png" }/><span>중복 업로드</span></li>
                        <li onClick={()=>{setSelectedIndex(2)}}><img src={selectedIndex === 2 ? "/images/icons/reportCheck.png" :  "/images/icons/circle.png" }/><span>주제와 무관한 컨텐츠</span></li>
                        <li onClick={()=>{setSelectedIndex(3)}}><img src={selectedIndex === 3 ? "/images/icons/reportCheck.png" :  "/images/icons/circle.png" }/><span>욕설과 비방 및 인신공격</span></li>
                        <li onClick={()=>{setSelectedIndex(4)}}><img src={selectedIndex === 4 ? "/images/icons/reportCheck.png" :  "/images/icons/circle.png" }/><span>스팸 및 광고</span></li>
                    </ul>
                </div>
                <div className={classes.reportFooter}>
                    <div><span>완료</span></div>
                </div>
            </div>
        </div>
    )
}

export default Post
