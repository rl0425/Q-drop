import classes from "../Main.module.css";
import Head from "../head/Head";
import Footer from "../footer/Footer";
import {KakaoLogin} from "./loginHandler/kakaoLoginHandler";
import MyHome from "./Home/MyHome";
import TermsWrapper from "./modal/TermsWrapper";

function My(){
    //key는 따로 config 파일로 추후 분리해서 gitIgnore 에 추가해놓을것.

    //카카오 로그인 관련한 클래스 주입
    const kakao = new KakaoLogin();

    return (

        <>
            <MyHome />
            <TermsWrapper />
        </>
    )
}

export default My
