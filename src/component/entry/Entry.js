import classes from "./Entry.module.css"
import {useEffect} from "react";

function Entry(){
    useEffect(()=> {
        setTimeout(()=>{
            window.location.href = '/main'
        }, 2000)

    }, [])

    return (
        <div className={classes.main}>
            <img src={"/images/icons/logo/mainLogo.svg"} />
        </div>
    )
}

export default Entry
