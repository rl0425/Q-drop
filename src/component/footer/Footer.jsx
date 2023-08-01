import classes from "./Footer.module.css"
import {useDispatch, useSelector} from "react-redux";
import {mainSectorActions} from "../../store/mainSector-slice";
import {mainDataActions} from "../../store/mianData-slice";
function Footer(){
    const dispatch = useDispatch()
    const sector = useSelector((state) => state.sector.type)

    const handleSector = (type) => {
        if(type === "home"){
            if(sector === "my"){
                // 메인 카테고리 슬라이더 인덱스 변경
                dispatch(mainDataActions.handleIndex({index:0, entry:true}))

                // 렌더링 요소 변경
                dispatch(mainSectorActions.changeSector({type:"home"}))
            }
        }

        if(type === "my"){
            if(sector === "home"){
                // 렌더링 요소 변경
                dispatch(mainSectorActions.changeSector({type:"my"}))
            }
        }
    }

    return (
        <div className={classes.box}>
            <div className={sector === "home" ? classes.active : classes.disable} onClick={() => handleSector("home")}>
                <img src={sector === "home" ? "/images/icons/colorHome.png" : "/images/icons/home.png"}/>
                <span>홈</span>
            </div>
            <div className={sector === "my" ? classes.active : classes.disable} onClick={() => handleSector("my")}>
                <img src={sector === "my" ? "/images/icons/colorMy.png" : "/images/icons/my.png"}/>
                <span>My</span>
            </div>
        </div>
    )
}

export default Footer
