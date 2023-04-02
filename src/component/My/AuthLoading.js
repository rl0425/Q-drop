import React, {useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useCookies} from 'react-cookie'
import {KakaoLogin} from "./Login/kakaoLoginHandler";

//사용자가 로그인 요청시 로딩화면 컴포넌트 입니다.
const AuthLoading = () => {
    const url = "sungwoo-net.p-e.kr"
    const location = useLocation();
    const KAKAO_CODE = location.search.split('=')[1];
    const [cokkies, setCookie] = useCookies(['jwt']);
    const history = useNavigate();

    //카카오 로그인 관련한 클래스 주입
    const kakao = new KakaoLogin();

    const getKakaoToken = async (code) => {
        const requestURL = `http://explorer-cat-api.p-e.kr:8080/api/v1/users/login/kakao?code=${code}`


        axios.get(requestURL, {}, {}).then(async function (response) {
            //정상적으로 응답이 왔을 경우 : 토큰 저장 및 사용자 데이터 가입 유무 확인
            if(response.status === 200) {
                if (response.status === 200 && response.data.code === 1001) {
                    //todo 회원가입 페이지로 이동 시켜야함 , 약관동의 및 닉네임 정도 받고
                    //바로 약관 동의 받는 페이지로 이동시켜줌
                    window.location.href = '/login?page=1'


                } else {
                    //todo 이미 가입된 사용자임, 토큰 쿠키에 세팅 후 사용자 정보로 화면 세팅
                    console.log("user_profile22", response.data.token)
                    //JWT token cookie
                    setCookie('jwt', response.data.token.data.token, {path: '/'});
                    // window.location.reload();
                    // history("/")
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
            <div>
                카카오 로그인 인증 진행 중입니다.
            </div>
    );
}

export default AuthLoading;
