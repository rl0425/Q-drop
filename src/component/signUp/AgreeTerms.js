import React, {useState} from "react";
import {KakaoLogin} from "../My/Login/kakaoLoginHandler";
import {useDispatch} from "react-redux";
import classes from "./AgreeTerms.module.css";


function AgreeTerms({rederPage}) {

    const dispatch = useDispatch()
    const kakao = new KakaoLogin();
    const [allCheck,setAllCheck] = useState(false);

    const handlePrevBtn = () => {
        //parameter
        window.history.pushState("", "", `/login?page=0`)
        rederPage(0)
    }

    const handleAllCheck = () => {
        allCheck ? setAllCheck(false) : setAllCheck(true)
    }


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
                        <div>
                            {allCheck ? <img src = "/images/icons/checked.png" /> :
                                <img src = "/images/icons/not_check.png" />}
                        </div>
                        <div className={classes.agree_text}>
                            <span>서비스 이용약관</span>
                            <span>(필수)</span>
                        </div>
                        <div className = {classes.right_btn}>
                            <img src = "/images/icons/right_btn.png" />
                        </div>
                    </div>
                    <div className={classes.private_agree}>
                        <div>
                            {allCheck ? <img src = "/images/icons/checked.png" /> :
                                <img src = "/images/icons/not_check.png" />}
                        </div>
                        <div className={classes.agree_text}>
                            <span>개인정보 처리 방침</span>
                            <span>(필수)</span>
                        </div>
                        <div className = {classes.right_btn}>
                            <img src = "/images/icons/right_btn.png" />
                        </div>
                    </div>
                </div>
                <div className={classes.footer}>
                    {/*<Footer/>*/}
                </div>
            </div>
        </div>


    )
}

export default AgreeTerms
