import classes from "../Main.module.css";
import Head from "../head/Head";
import Footer from "../footer/Footer";
import {KakaoLogin} from "./loginHandler/kakaoLoginHandler";

function My(){
    //key는 따로 config 파일로 추후 분리해서 gitIgnore 에 추가해놓을것.

    //카카오 로그인 관련한 클래스 주입
    const kakao = new KakaoLogin();

    return (
        <div className={classes.box}>
            <div onClick={ () => {kakao.loginWithKakao()} }>카카오로 로그인하기</div>
        </div>
    )
}

export default My
