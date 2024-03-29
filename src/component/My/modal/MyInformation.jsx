import React, {useEffect, useRef, useState} from "react";
import classes from "./MyInformation.module.css"
import {myPageActions} from "../../../store/myPage-slice";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "../../../hooks/use-http";
import {mainDataActions} from "../../../store/mianData-slice";
import {toastActions} from "../../../store/toast-slice";

function MyInformation(){
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const dispatch = useDispatch()

    const profile = useSelector((state) => state.main.profile)

    useEffect(()=>{
        setOpen(true)
    }, [])


    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeMyInformationOpen({myInformation:false}))
        }, 150)
    }

    const handleContent = (e) => {
        setSearchValue(e.target.value)

        setChange(true)
    }

    const handleSaveNickname = () => {
        if(change) {
            const regex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s]*$/; // 허용되는 문자 패턴 정규식

            if (searchValue === profile.nickname) {
                dispatch(toastActions.handleToastOpt({msg:"기존 닉네임과 동일해요.", open:true}))
            }

            else if (searchValue.length < 2 || searchValue.length > 50) {
                dispatch(toastActions.handleToastOpt({msg:"입력값은 2~50자 이상이어야 해요.", open:true}))
            }

            else if (!regex.test(searchValue)) {
                dispatch(toastActions.handleToastOpt({msg:"닉네임은 특수문자를 포함하면 안돼요.", open:true}))
            }

            else {
                fetchTasks({
                    url: `http://explorer-cat-api.p-e.kr:8080/api/v1/users/profile`,
                    type:"post",
                    data: {nickname: searchValue}
                }, (taskObj) => {
                    dispatch(mainDataActions.handleProfile({
                        profile: {
                            ...profile,
                            nickname: searchValue
                        }
                    }))
                    handlePrevBtn()
                    dispatch(toastActions.handleToastOpt({msg:"프로필 수정을 완료했어요.", open:true}))
                })
            }
        }
    }

    const searchEvt = (e) => {
        if(searchValue === profile.nickname){
            setChange(false)
        }
        else{
            setChange(true)
        }
    }

    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {

        return (
            <div className={open ? classes.box : classes.unBox}>
                <div className={classes.head}>
                    <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                    <span>내 정보</span>
                </div>
                <div className={classes.body}>
                    <div className={classes.profile}>
                        <img src={profile.image ? profile.image : "/images/icons/noProfile.png"}/>
                    </div>
                    <div className={classes.nickname}>
                        <div className={classes.nicknameHead}>
                            <span>닉네임</span>
                        </div>
                        <div className={classes.nicknameContent}>
                            <input onChange={(e) => handleContent(e)} onKeyPress={searchEvt}
                                   placeholder={profile.nickname}/>
                        </div>
                    </div>
                    <div className={classes.email}>
                        <div className={classes.emailHead}>
                            <span>이메일</span>
                        </div>
                        <div className={classes.emailContent}>
                            <span>{profile.email}</span>
                        </div>
                    </div>
                    <div onClick={handleSaveNickname} className={change ? classes.submit : classes.unChanged}>
                        <span>저장하기</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyInformation
