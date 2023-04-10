import classes from "./WithdrawalReason.module.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";
import {modalActions} from "../../../store/modal-slice";


function WithdrawalReason(){
    const [open, setOpen] = useState(false)
    const [blackAnimation, setBlackAnimation] = useState(false);
    const [etcOpen, setEtcOpen] = useState(false)

    const dispatch = useDispatch()

    const [selectedItem, setSelectedItem] = useState(null);
    const items = ['사용빈도가 낮습니다', '컨텐츠가 마음에 안듭니다', '서비스 오류 및 장애가 잦습니다', '다른 계정으로 가입하려고 합니다', '기타'];

    const reason = useSelector((state => state.myPage.withdrawalReason))

    useEffect(()=>{
        setTimeout(()=> {
            setOpen(true)
            setBlackAnimation(true)

            if(reason){
                setSelectedItem(reason.reason)
            }

        },50)
    }, [])

    useEffect(()=>{
        if(selectedItem === "기타"){
            setEtcOpen(open)
        }

    }, [selectedItem])

    const handlePrevBtn = () => {
        setOpen(false)
        setBlackAnimation(false)

        setTimeout(()=>{
            dispatch(myPageActions.changeWithdrawalReason({open:false, reason:selectedItem}))
        }, 150)
    }

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const removeModalClickEvt = () => {
        setOpen(false)
        setBlackAnimation(false)

        setTimeout(()=>{
            dispatch(myPageActions.changeWithdrawalReason({open:false, reason:selectedItem}))
        }, 150)

    }

    const handleSubmit = () => {
        setOpen(false)
        setBlackAnimation(false)

        setTimeout(()=>{
            dispatch(myPageActions.changeWithdrawalReason({open:false, reason:selectedItem}))
        }, 150)
    }

    return (

        <>
            <div onClick={removeModalClickEvt} className={blackAnimation ? classes.blackBack : classes.nonBlackBack}></div>
            <div className={open ? classes.box : classes.unBox}>

                <div className={classes.head}>
                    <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                    <span>탈퇴사유</span>
                </div>
                <div className={classes.body}>
                    <ul>
                        {items.map((item) => (
                            <li key={item} onClick={() => handleItemClick(item)}>
                                <div>
                                    <img src={selectedItem === item ? "/images/icons/reportCheck.png" : "/images/icons/circle.png"}/>
                                    <span>{item}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classes.footer}>
                    <div onClick={handleSubmit} className={selectedItem ? classes.submit : classes.noSelect}>
                        <span>완료</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithdrawalReason
