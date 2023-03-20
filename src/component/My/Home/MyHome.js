import classes from "./MyHome.module.css"

function MyHome(){
    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <span>마이페이지</span>
            </div>
            <div className={classes.body}>
                <div className={classes.loginDiv}>
                    <div className={classes.logoSet}>
                        <div className={classes.logoImg}>
                            <img src={"/images/icons/tempLogo.png"} />
                        </div>
                        <div className={classes.logoSpan}>
                            <div className={classes.logoSpanHead}><span>로그인 / 회원가입</span></div>
                            <div className={classes.logoSpanCont}><span>로그인하고 관심 카테고리를 설정해보세요!</span></div>
                        </div>
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
                        <div><span>내가 쓴 노트</span></div>
                        <div className={classes.favoriteNote}><span>즐겨찾기한 노트</span></div>
                    </div>
                </div>
                <div className={classes.guide}>
                    <div className={classes.guideHead}>
                        <span>이용안내</span>
                    </div>
                    <div className={classes.guideBody}>
                        <div className={classes.terms}><span>이용약관 / 개인정보 처리방침</span></div>
                        <div className={classes.version}><span>앱 버전</span><label>1.0</label></div>
                        <div className={classes.logout}><span>로그아웃</span></div>
                        <div className={classes.withdrawal}><span>회원탈퇴</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyHome