import classes from "./Toast.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {toastActions} from "../../store/toast-slice";

function Toast() {
    const [open, setOpen] = useState(false)
    const msg = useSelector((state) => state.toast.msg)

    const dispatch = useDispatch()

    useEffect(()=>{
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
            setTimeout(() => {
                dispatch(toastActions.handleToastOpt({msg:"", open:false}))
            }, 400)
        }, 3000)
    }, [])

    return (
        <div className={open ? classes.box : classes.unBox}>
            <span>{msg}</span>
        </div>
    )
}

export default Toast
