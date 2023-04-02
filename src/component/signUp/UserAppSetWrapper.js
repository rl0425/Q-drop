import Login from "./Login";
import ToastWrapper from "../toast/ToastWrapper";
import AgreeTerms from "./AgreeTerms";
import CategorySetting from "./CategorySetting";
import classes from "./UserAppSetWrapper.module.css";
import React, {useEffect, useState} from "react";
import {Link, Route, Routes, BrowserRouter, useNavigate,useLocation} from 'react-router-dom'
function UserAppSetWrapper() {
    const location = useLocation().search
    const [page,setPage] = useState(location.replace("?page=", ""))


    const handlePageRender = (page) => {
        setPage(page);
    }

    return (
        <>
            <ToastWrapper/>
            <div className={classes.wrapper_main}>
                <div style ={{left: `${(100 * (0 - page))}%`}}>
                    <AgreeTerms rederPage = {handlePageRender}/>
                </div>
                <div style ={{left: `${(100 * (1 - page))}%`}}>
                    <CategorySetting />
                </div>
            </div>
        </>
    )

}

export default UserAppSetWrapper
