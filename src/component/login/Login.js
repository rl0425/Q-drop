import classes_login from "./Login.module.css";
import React, {useEffect, useState} from "react";
import {KakaoLogin} from "../My/Login/kakaoLoginHandler";
import {useDispatch} from "react-redux";
import {toastActions} from "../../store/toast-slice";
import {loginActions} from "../../store/login-slice";
function Login() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const kakao = new KakaoLogin();

    useEffect(()=>{
        setOpen(true)
    }, [])

    const handleExitBtn = () => {
        setOpen(false)

        setTimeout(() =>{
            dispatch(loginActions.handleOpen({open:false}))
        }, 300)
    }

    return (
        <div className={open ? classes_login.box : classes_login.unBox}>
            <div className={classes_login.head}>
                <div onClick={handleExitBtn} className={classes_login.exitBox}><img src={"/images/icons/exit.png"}/></div>
            </div>
            <div className={classes_login.body}>
                <div className={classes_login.app_logo_area}>
                    <div className={classes_login.app_log}>
                        <img src="/images/mypage/icons/approvalReady.png"/>
                    </div>
                </div>

                <div className={classes_login.login_btn_group}>
                    <div className={classes_login.withKakao}>
                        <div className={classes_login.logo_area}>
                            <img src="/images/icons/with_kakao.png"/>
                        </div>
                        <div onClick={()=> {kakao.loginWithKakao()}} className={classes_login.login_text_area}>
                            <span>카카오로 3초만에 시작하기</span>
                        </div>
                        <div className={classes_login.btn_blank}>
                        </div>
                    </div>
                    <div className={classes_login.withNaver}>
                        <div className={classes_login.logo_area}>
                            <img src="/images/icons/with_naver.png"/>
                        </div>
                        <div onClick={()=> {dispatch(toastActions.handleToastOpt({msg:"네이버 로그인은 현재 준비중 입니다.", open:true}))}} className={classes_login.login_text_area}>
                            <span>네이버로 로그인하기</span>
                        </div>
                        <div className={classes_login.btn_blank}>
                        </div>
                    </div>
                    <div className={classes_login.withGoogle}>
                        <div className={classes_login.logo_area}>
                            <img src="/images/icons/with_google.png"/>
                        </div>
                        <div onClick={()=> {dispatch(toastActions.handleToastOpt({msg:"구글 로그인은 현재 준비중 입니다.", open:true}))}} className={classes_login.login_text_area}>
                            <span>구글로 로그인하기</span>
                        </div>
                        <div className={classes_login.btn_blank}>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login
