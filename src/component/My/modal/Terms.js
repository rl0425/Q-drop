import {useEffect, useRef, useState} from "react";
import classes from "./Terms.module.css"
import Slider from "react-slick";
import {mainDataActions} from "../../../store/mianData-slice";
import {myPageActions} from "../../../store/myPage-slice";
import {useDispatch} from "react-redux";

function Terms(){
    const [open, setOpen] = useState(false)
    const [state, setState] = useState(0)

    const dispatch = useDispatch()

    // 슬라이더 ref
    const sliderRef = useRef(null);

    useEffect(()=>{
        setOpen(true)
    }, [])

    // 메인에서 슬라이드 이벤트
    const handleSlideChange = (index) => {
        setState(index)
    };

    const handleSectorClick = (index) => {
        setState(index)
        sliderRef.current.slickGoTo(index, false);
    }

    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeTermsOpen({termsOpen:false}))
        }, 150)
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: handleSlideChange
    };

    return (
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                <span>이용약관 / 개인정보처리방침</span>
            </div>
            <div className={classes.body}>
                <div className={classes.bodyTop}>
                    <div className={classes.sectorBox}>
                        <div onClick={() => handleSectorClick(0)} className={state === 0 ? classes.sector : classes.unSector}>
                            <span>이용약관</span>
                        </div>
                        <div onClick={() => handleSectorClick(1)}  className={state === 1 ? classes.sector : classes.unSector}>
                            <span>개인정보 처리방침</span>
                        </div>
                    </div>
                    <div className={state === 0 ? classes.bottomOne : classes.bottomTwo}>
                    </div>
                </div>
                <Slider {...settings} ref={sliderRef}>
                    <div className={classes.contents}>
                        <span>
                            ㅇㅇㅇㅇ 이용약관 제 1조
                            어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구쩌구어쩌구 저쩌구어쩌구 저쩌구구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구
                            저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
                        </span>
                    </div>
                    <div className={classes.contents}>
                        <span>
                            If You Unscramble LOARUM... What Does It Mean?
                            Definition of LOARUM When Unscrambled
                            If we unscramble these letters, LOARUM, it and makes several words.
                            Here is one of the definitions for a word that uses all the unscrambled letters:
                        </span>
                    </div>
                </Slider>

            </div>
        </div>
    )
}

export default Terms
