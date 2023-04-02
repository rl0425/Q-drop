import React, {useEffect, useState} from "react";
import {KakaoLogin} from "../My/Login/kakaoLoginHandler";
import {useDispatch} from "react-redux";
import classes from "./AgreeTerms.module.css";
import {all} from "axios";


function AgreeTerms({rederPage}) {

    const dispatch = useDispatch()
    const kakao = new KakaoLogin();
    const [allCheck,setAllCheck] = useState(false);
    const [serviceCheck,setServiceCheck] = useState(false);
    const [privateCheck,setPrivateCheck] = useState(false);
    const handlePrevBtn = () => {
        //parameter
        window.history.pushState("", "", `/signup?page=0`)
        rederPage(0)
    }

    const handleNextBtn = () => {
        window.history.pushState("", "", `/signup?page=1`)
        rederPage(1)
    }
    const handleAllCheck = () => {
        if(allCheck) {
            setAllCheck(false)
            setPrivateCheck(false)
            setServiceCheck(false)
        } else {
            setAllCheck(true)
            setPrivateCheck(true)
            setServiceCheck(true)
        }
    }

    const handlePrivateCheck = () => {
        if(privateCheck) {
            setPrivateCheck(false)
        } else {
            setPrivateCheck(true)
        }
    }

    const handleServiceCheck = () => {
        if(serviceCheck) {
            setServiceCheck(false)
        } else {
            setServiceCheck(true)
        }
    }

    useEffect(() => {
        if(serviceCheck && privateCheck) {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }

    },[serviceCheck,privateCheck])


    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
            </div>
            <div className={classes.body}>
                <div className={classes.body_header}>
                    <div className={classes.title}>
                        <span>만나서 반가워요 !</span>
                    </div>
                    <div className={classes.sub_title}>
                        <span>서비스 이용을 위해, 이용약관 동의가 필요해요.</span>
                    </div>
                </div>
                <div className={classes.body_content}>
                    <div onClick={handleAllCheck} className={classes.all_agree_div}>
                        <div>
                            {allCheck ? <img src = "/images/icons/checked.png" /> :
                                <img src = "/images/icons/not_check.png" />}
                        </div>
                        <span>전체 동의</span>
                    </div>
                    <div className={classes.service_agree}>
                        <div onClick={handleServiceCheck}>
                            {serviceCheck ? <img src = "/images/icons/checked.png" /> :
                                <img src = "/images/icons/not_check.png" />}
                        </div>
                        <div onClick={handleServiceCheck} className={classes.agree_text}>
                            <span>서비스 이용약관</span>
                            <span>(필수)</span>
                        </div>
                        <div className = {classes.right_btn}>
                            <img src = "/images/icons/right_btn.png" />
                        </div>
                    </div>
                    <div className={classes.private_agree}>
                        <div onClick={handlePrivateCheck}>
                            {privateCheck ? <img src = "/images/icons/checked.png" /> :
                                <img src = "/images/icons/not_check.png" />}
                        </div>
                        <div onClick={handlePrivateCheck} className={classes.agree_text}>
                            <span>개인정보 처리 방침</span>
                            <span>(필수)</span>
                        </div>
                        <div className = {classes.right_btn}>
                            <img src = "/images/icons/right_btn.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                {allCheck ?
                    <div onClick={handleNextBtn} className={classes.enable_next_btn}>
                        다음
                    </div>
                    :
                    <div className={classes.disabled_next_btn}>
                    다음
                    </div>
                }
            </div>
        </div>


    )
}

export default AgreeTerms
