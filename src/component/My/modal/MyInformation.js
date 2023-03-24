import {useEffect, useRef, useState} from "react";
import classes from "./MyInformation.module.css"
import {myPageActions} from "../../../store/myPage-slice";
import {useDispatch} from "react-redux";

function MyInformation(){
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [state, setState] = useState(0)

    const dispatch = useDispatch()

    const cookiesValue = {
        nickname:"은비"
    }

    useEffect(()=>{
        setOpen(true)
    }, [])


    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeMyInformationOpen({myInformation:false}))
        }, 150)
    }

    const searchEvt = (e) => {
        if(searchValue === cookiesValue.nickname){
            setChange(false)
        }
        else{
            setChange(true)
        }
    }

    return (
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                <span>내 정보</span>
            </div>
            <div className={classes.body}>
                <div className={classes.profile}>
                    <img src={"/images/icons/tempLogo.png"} />
                </div>
                <div className={classes.nickname}>
                    <div className={classes.nicknameHead}>
                        <span>닉네임</span>
                    </div>
                    <div className={classes.nicknameContent}>
                        <input onChange={(e) => setSearchValue(e.target.value)} onKeyPress={searchEvt} placeholder={"은비"} />
                    </div>
                </div>
                <div className={classes.email}>
                    <div className={classes.emailHead}>
                        <span>이메일</span>
                    </div>
                    <div className={classes.emailContent}>
                        <span>abcde@naver.com</span>
                    </div>
                </div>
                <div className={change ? classes.submit : classes.unChanged}>
                    <span>저장하기</span>
                </div>
            </div>
        </div>
    )
}

export default MyInformation
