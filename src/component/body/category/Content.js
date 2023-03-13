import classes from "./Content.module.css"
import {useEffect, useState} from "react";

function Content(props){
    const clickEvt = (ele) => {
        props.selectEvt({id:props.data.id, type:ele})
    }
    const hasChecked = props.subs.find(u => u === props.data.id)

    return (
        <>
        <div onClick={hasChecked ? () => clickEvt("remove") : () => clickEvt("add")} className={hasChecked ? `${classes.box} ${classes.active}` : classes.box}>
            {hasChecked ? <img src={"/images/icons/fullCircle.png"}/> : <img src={"/images/icons/circle.png"}/>}
            <span>{props.data.name}</span>
        </div>
        <div onClick={hasChecked ? () => clickEvt("remove") : () => clickEvt("add")} className={hasChecked ? `${classes.box} ${classes.active}` : classes.box}>
            {hasChecked ? <img src={"/images/icons/fullCircle.png"}/> : <img src={"/images/icons/circle.png"}/>}
            <span>{props.data.name}</span>
        </div>
        </>

    )
}

export default Content
