import classes from "./Withdrawal.module.css"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import useHttp from "../../../hooks/use-http";
import {modalActions} from "../../../store/modal-slice";
import {useCookies} from "react-cookie";
import {mainSectorActions} from "../../../store/mainSector-slice";
import {toastActions} from "../../../store/toast-slice";

function Withdrawal(){
    const [open, setOpen] = useState(false)
    const [data, setData] = useState("")
    const dispatch = useDispatch()

    const reason = useSelector((state => state.myPage.withdrawalReason.reason))

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const [etcOpen, setEtcOpen] = useState(false)
    const [content, setContent] = useState("")

    useEffect(()=>{
        setTimeout(()=> {
            setOpen(true)
        },50)
    }, [])

    useEffect(()=>{
        if(reason === "기타"){
            setEtcOpen(true)
        }
        else{
            if(etcOpen === true){
                setEtcOpen(false)
            }
        }

    }, [reason])


    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeWithdrawalOpen({withdrawalOpen:false}))
            dispatch(myPageActions.changeWithdrawalReason({open:false, reason:""}))

        }, 150)
    }

    const handleModalOpen = () => {
        dispatch(myPageActions.changeWithdrawalReason({open:true, reason:reason}))
    }

    const handleWithdrawalOkBtn = () => {
        const reasonData = reason === "기타" ? content : reason

        fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/users`, type:"delete", data: {reason:reasonData}})
        removeCookie('jwt');

        handlePrevBtn()

        setTimeout(()=> {
            dispatch(mainSectorActions.changeSector({type: "home"}))
            dispatch(toastActions.handleToastOpt({msg:"회원탈퇴가 완료되었어요.", open:true}))
        },150)

    }

    const handleTextAreaEvt = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                <span>회원탈퇴</span>
            </div>
            <div className={classes.body}>
                <div className={classes.h1}><span>정말 회원탈퇴 하실건가요?</span></div>
                <div className={classes.h2}><span>회원탈퇴 신청 전 아래 사항을 꼭 확인해 주세요.</span></div>
                <div className={classes.h3}>
                    <div><span>1.</span> <label>탈퇴 시 아이디 복구가 불가능 하오니, 신중하게 진행해주시기 바랍니다.</label></div>
                    <div><span>2.</span> <label>탈퇴 후 작성한 게시물과 댓글은 삭제 처리가 불가능합니다.</label></div>
                </div>
                <div className={classes.h4}>
                    <div><span>탈퇴사유 선택</span></div>
                    <div onClick={handleModalOpen} className={classes.selectBox}>
                        <span>{reason ? reason : "탈퇴사유 선택"}</span>
                        <img src={"/images/icons/prevBtn.png"}/>
                    </div>
                    {etcOpen ?
                        <div className={classes.etcBox}>
                            <textarea onChange={(e) => handleTextAreaEvt(e)} value={content} placeholder={"질문을 대한 답변을 입력하세요."} />
                        </div>
                        :
                        ""
                    }
                </div>
                <div className={classes.btn}>
                    <div onClick={handleWithdrawalOkBtn} className={reason ? classes.submitBtn : classes.noSelect}><span>회원 탈퇴하기</span></div>
                    <div onClick={handlePrevBtn} className={classes.cancelBtn}><span>게속 이용하기</span></div>
                </div>
            </div>
        </div>
    )
}

export default Withdrawal
