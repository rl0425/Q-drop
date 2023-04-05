import classes from "./MyHome.module.css"
import {useDispatch, useSelector} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";

// 슬라이드 이벤트
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useEffect, useState} from "react";
import useHttp from "../../../hooks/use-http";
import {mainSectorActions} from "../../../store/mainSector-slice";
import {toastActions} from "../../../store/toast-slice";
import {useCookies} from "react-cookie";
import {loginActions} from "../../../store/login-slice";

function MyHome(){
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const isLogin = useSelector((state) => state.main.isLogin)
    const profile = useSelector((state) => state.main.profile)

    const dispatch = useDispatch()

    const handleTerms = (e) => {
        dispatch(myPageActions.changeTermsOpen({termsOpen:true}))
    }

    const handleWritten = (e) => {
        dispatch(myPageActions.changeWrittenOpen({writtenOpen:true}))
    }

    const handleFavorite = (e) => {
        dispatch(myPageActions.changeFavoriteOpen({favoriteOpen:true}))
    }

    const handleWithdrawal = (e) => {
        dispatch(myPageActions.changeWithdrawalOpen({withdrawalOpen:true}))
    }

    const handleMyInformation = (e) => {
        dispatch(myPageActions.changeMyInformationOpen({myInformation:true}))
    }

    const handleLogout = (e) => {

        removeCookie('jwt');

        dispatch(mainSectorActions.changeSector({type: "home"}))
        dispatch(toastActions.handleToastOpt({msg:"로그아웃 되었어요.", open:true}))
    }

    const handleLogin = () => {
        dispatch(loginActions.handleOpen({open:true}))
    }


    return (
        <div className={classes.box}>
            {/*<div className={classes.box}>*/}
            {/*    <div onClick={ () => {kakao.loginWithKakao()} }>카카오로 로그인하기</div>*/}
            {/*</div>*/}
            <div className={classes.head}>
                <span>마이페이지</span>
            </div>
            <div className={classes.body}>
                <div onClick={!isLogin ? handleLogin : handleMyInformation} className={classes.loginDiv}>
                    <div className={classes.logoSet}>
                        {!isLogin ?
                            <div>
                                <div className={classes.logoImg}>
                                    <img src={"/images/icons/tempLogo.png"} />
                                </div>
                                <div className={classes.logoSpan}>
                                    <div className={classes.logoSpanHead}><span>로그인 / 회원가입</span></div>
                                    <div className={classes.logoSpanCont}><span>로그인하고 관심 카테고리를 설정해보세요!</span></div>
                                </div>
                            </div>
                        :
                            <div>
                                <div className={classes.hasLogoImg}>
                                    <img src={profile.image} />
                                </div>
                                <div className={classes.logoSpan}>
                                    <div className={classes.logoSpanHead}><span>{profile.nickname}</span></div>
                                    <div className={classes.logoSpanCont}><span>{profile.email}</span></div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={classes.logoNextBtn}>
                        <img src={"/images/icons/prevBtn.png"}/>
                    </div>
                </div>
                <div className={classes.note}>
                    <div className={classes.noteHead}>
                        <span>노트</span>
                    </div>
                    <div className={classes.noteBody}>
                        <div onClick={handleWritten}><span>내가 쓴 노트</span></div>
                        <div onClick={handleFavorite} className={classes.favoriteNote}><span>즐겨찾기한 노트</span></div>
                    </div>
                </div>
                <div className={classes.guide}>
                    <div className={classes.guideHead}>
                        <span>이용안내</span>
                    </div>
                    <div className={classes.guideBody}>
                        <div onClick={handleTerms} className={classes.terms}><span>이용약관 / 개인정보 처리방침</span></div>
                        <div className={classes.version}><span>앱 버전</span><label>1.0</label></div>
                        {isLogin ?
                            <div onClick={handleLogout} className={classes.logout}><span>로그아웃</span></div> : <div onClick={handleLogin} className={classes.logout}><span>로그인</span></div>}
                        {isLogin ? <div onClick={handleWithdrawal} className={classes.withdrawal}><span>회원탈퇴</span></div> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyHome
