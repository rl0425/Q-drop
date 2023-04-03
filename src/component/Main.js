import Head from "./head/Head";
import Footer from "./footer/Footer";
import classes from "./Main.module.css"
import CategoryModalWrapper from "./body/category/CategoryModalWrapper";
import PostWrapper from "./body/postOpt/PostWrapper";
import HomeWrapper from "./body/HomeWrapper";
import MyWrapper from "./My/MyWrapper";
import ModalSetWrapper from "./modal/ModalSetWrapper";
import SearchWrapper from "./search/SearchWrapper";
import {useSelector, useDispatch} from "react-redux";
import ToastWrapper from "./toast/ToastWrapper";
import WriteWrapper from "./write/WriteWrapper";

import {useCookies} from 'react-cookie'
import {useEffect} from "react";
import {mainDataActions} from "../store/mianData-slice";

function Main(){
    const dispatch = useDispatch()
    const sector = useSelector((state) => state.sector.type);
    console.log("sector = ", sector)
    // 쿠키 관련
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    useEffect(()=>{
        if(cookies.jwt){
            dispatch(mainDataActions.handleLogin({isLogin:true}))
        }
        else{
            dispatch(mainDataActions.handleLogin({isLogin:false}))
        }

    }, [cookies])

    return (
        <div className={classes.box}>
            {sector === "home" ?
                <>
                    <div className={classes.head}>
                        <Head />
                    </div>
                    <div className={classes.body}>
                        <HomeWrapper />
                    </div>

                </>
            :
                <MyWrapper />
            }
            <div className={classes.footer}>
                <Footer />
            </div>

            <SearchWrapper />
            <WriteWrapper />
            <ModalSetWrapper />
            <ToastWrapper />

        </div>
    )
}

export default Main
