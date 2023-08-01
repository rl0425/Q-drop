import classes from "./Content.module.css"
import {useEffect, useRef, useState} from "react";

function Content(props){

    const ref = useRef(null)

    useEffect(()=>{
        if(props.type && props.type === "register"){
            ref.current.classList.add(classes.register)
        }
    }, [])

    const clickEvt = (e,ele) => {
        e.stopPropagation()
        e.preventDefault()

        props.selectEvt({id:props.data.id, type:ele, mainId:props.mainId, text:props.data.name})
    }
    const hasChecked = props.subs ? props.subs.find(u => u === props.data.id) : false

    return (

        <div ref={ref} onClick={hasChecked ? (e) => clickEvt(e,"remove") : (e) => clickEvt(e,"add")}
             className={hasChecked ? `${classes.box} ${classes.active}` : classes.box}>
            {hasChecked ? <img src={"/images/icons/fullCircle.png"}/> : <img src={"/images/icons/circle.png"}/>}
            <span>{props.data.name}</span>
        </div>


    )
}

export default Content
