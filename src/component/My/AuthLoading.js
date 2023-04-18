import React, {useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useCookies} from 'react-cookie'
import {KakaoLogin} from "./Login/kakaoLoginHandler";
import classes from "./AuthLoading.module.css"

import animationData from "../../jsons/spinner.json";
import Lottie from "lottie-react-web";
import {useDispatch} from "react-redux";
import {loginActions} from "../../store/login-slice";

//사용자가 로그인 요청시 로딩화면 컴포넌트 입니다.
const AuthLoading = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const KAKAO_CODE = location.search.split('=')[1];
    const [cookies, setCookie] = useCookies(['jwt']);
    const history = useNavigate();

    //카카오 로그인 관련한 클래스 주입
    const kakao = new KakaoLogin();

    const getKakaoToken = async (code) => {
        const requestURL = `http://explorer-cat-api.p-e.kr:8080/api/v1/users/login/kakao?code=${code}`


        axios.get(requestURL, {}, {}).then(async function (response) {
            //정상적으로 응답이 왔을 경우 : 토큰 저장 및 사용자 데이터 가입 유무 확인
            if(response.status === 200) {
                console.log("user_profile22", response.data.token)
                console.log("response= ", response)

                if (response.data.code === 1001) {
                    dispatch(loginActions.handleTempData({data:response.data.data}))
                    // window.location.href = '/signup?page=0'

                } else {
                    setCookie('jwt', response.data.token.data.token, {path: '/'});
                    window.location.href = '/main'
                }
            }
        }).catch(function (error) {
        }).then(function (res) {
            return res;
        });
    }

    useEffect(() => {
        getKakaoToken(KAKAO_CODE)
    }, [])

    return (
            <div className={classes.ingBox}>
                <div className={classes.loadingDiv}><Lottie options={{animationData: animationData}}/></div>
            </div>
    );
}

export default AuthLoading;
