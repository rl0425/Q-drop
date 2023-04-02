import React, {useEffect, useState} from "react";
import {KakaoLogin} from "../My/Login/kakaoLoginHandler";
import {useDispatch} from "react-redux";
import classes from "./AgreeTerms.module.css";
import {all} from "axios";


function CategorySetting({rederPage}) {

    const dispatch = useDispatch()

    const handlePrevBtn = () => {
        //parameter
        window.history.pushState("", "", `/signup?page=0`)
        rederPage(0)
    }
    const handleNextBtn = () => {
        window.history.pushState("", "", `/signup?page=1`)
        rederPage(1)
    }


    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
            </div>
            <div className={classes.body}>
                <div className={classes.body_header}>
                    <div className={classes.title}>
                        <span>👀 어떤 주제에 관심이 있으세요?</span>
                    </div>
                    <div className={classes.sub_title}>
                        <span>주제에 맞는 노트를 보여드릴게요.</span>
                    </div>
                </div>
                <div className={classes.body_content}>
                </div>
            </div>

            <div className={classes.footer}>
                    <div onClick={handleNextBtn} className={classes.disabled_next_btn}>
                        시작해 볼까요?
                    </div>
            </div>
        </div>


    )
}

export default CategorySetting
