import classes from "./CategoryModal.module.css"
import {useSelector, useDispatch} from "react-redux";
import SwipeableViews  from 'react-swipeable-views';
import {categoryActions} from "../../../store/category-slice";
import {useState} from "react";

function CategoryModal(){
    const open = useSelector((state) => state.category.open)
    const [pageIndex, setIndex] = useState(0);
    const dispatch = useDispatch()

    const openEvt = () => {
        dispatch(categoryActions.changeOpen({open:false}))
    }

    const handleIndexChange = (index) => {
        setIndex(index);
    };
  
    const categoryClickEvt = (index) => {
        setIndex(index);
    }

    const categoryData = {
        category: ["개발", "디자인", "기획", "마케팅", "HR"]
    }

    return (
        <div className={open ? classes.box : classes.nonBox}>
            <div className={classes.head}>
                <div className={classes.header}>
                    <div className={classes.spanHeader}><span>관심 카테고리 설정</span></div>
                    <div onClick={openEvt} className={classes.exit}><span>닫기</span><img/></div>
                </div>
                <div className={classes.categorySet}>
                    {categoryData.category.map((ele, index) => {
                        return (
                            <div key={index} onClick={()=>categoryClickEvt(index)} className={index === pageIndex ? classes.category : `${classes.category} ${classes.noSelect}`}><span>{ele}</span></div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.body}>
                <SwipeableViews index={pageIndex} onChangeIndex={handleIndexChange}>
                    <div style={{ height: '100vh'}}>
                        <li>FrontEnd</li>
                        <li>BackEnd</li>
                        <li>DB</li>
                        <li>Infra</li>
                    </div>
                    <div style={{ height: '100vh'}}>
                        <li>Design1</li>
                        <li>Design2</li>
                        <li>Design3</li>
                        <li>Design4</li>
                    </div>
                    <div style={{ height: '100vh'}}>
                        <li>기획1</li>
                        <li>기획12</li>
                        <li>기획123</li>
                        <li>기획1234</li>
                    </div>
                </SwipeableViews>
            </div>
            <div className={classes.footer}>
                <div className={classes.footerBox}>
                    <span>카테고리 설정 완료</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal
