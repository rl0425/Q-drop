import {useEffect, useState} from "react";
import classes from "./Terms.module.css"
function Terms(){
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        setOpen(true)
    }, [])

    return (
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <img src={"/images/icons/prevBtn.png"}/>
                <span>이용약관 / 개인정보처리방침</span>
            </div>
            <div className={classes.body}>
                <div className={classes.bodyTop}>
                    <div className={classes.sectorBox}>
                        <div className={classes.sector}>
                            <span>이용약관</span>
                        </div>
                        <div className={classes.sector}>
                            <span>개인정보 처리방침</span>
                        </div>
                    </div>
                    <div className={classes.bottom}>
                    </div>
                </div>
                <div className={classes.contents}>
                    <span>ㅇㅇㅇㅇ 이용약관 제 1조
                        어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구쩌구어쩌구 저쩌구어쩌구 저쩌구구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                        저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구</span>
                </div>
            </div>
        </div>
    )
}

export default Terms