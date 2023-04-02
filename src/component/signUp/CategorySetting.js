import classes from "../Main.module.css";
import React from "react";
import {KakaoLogin} from "../My/Login/kakaoLoginHandler";
import {useDispatch} from "react-redux";
import {toastActions} from "../../store/toast-slice";
import classes_login from "./Login.module.css";

function AgreeTerms() {
    const dispatch = useDispatch()

    const kakao = new KakaoLogin();

    return (
        <div className={classes.box}>
            <div className={classes.head}>

            </div>
            <div className={classes.body}>
                <div>카테고리 설정하세요</div>
            </div>
            <div className={classes.footer}>
                {/*<Footer/>*/}
            </div>
        </div>


    )
}

export default AgreeTerms
