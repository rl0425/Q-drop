import classes from "./Search.module.css"
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {searchActions} from "../../store/search-slice";
import useHttp from "../../hooks/use-http";

function Search(){
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchData, setSearchData] = useState("")

    const dispatch = useDispatch()

    const { isLoading, error, sendRequest: getData } = useHttp();

    useEffect(()=>{
        setOpen(true)
    }, [])

    const prevBtnEvt = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(searchActions.changeOpen({open:false}))
        }, 300)
    }

    const searchEvt = (e) => {
        if(e.key === "Enter") {
            console.log("e.searchValue =", searchData)
            getData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?id=&search=${searchData}`}, (taskObj) => {
                console.log("taskObj= ", taskObj)
            })
        }
    }

    const handleSearchChange = (e) => {
        setSearchData('');
    }

    return (
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <div onClick={prevBtnEvt}><img src={"/images/icons/prevBtn.png"}/></div>
                <div className={classes.searchBarBox}>
                    <input type={"string"} value={searchData} onChange={(e) => setSearchData(e.target.value)} onKeyPress={searchEvt} placeholder={"궁금한 내용을 검색해보세요."}/>
                    <img onClick={handleSearchChange} src={"/images/icons/searchRemove.png"}/>
                </div>
            </div>
            <div className={classes.beforeBox}>
                <div className={classes.recentBox}>
                    <div className={classes.recentHead}>
                        <div><span>최근 검색어</span></div>
                        <div className={classes.recentDeleteBtn}><span>기록 삭제</span></div>
                    </div>
                    <div className={classes.recentContBox}>
                        {/*<div><span>최근 검색어가 없어요.</span></div>*/}
                        <div className={classes.recentContent}><span>디자인</span></div>
                        <div className={classes.recentContent}><span>프론트엔드</span></div>
                        <div className={classes.recentContent}><span>프론드스타트</span></div>
                        <div className={classes.recentContent}><span>백엔드</span></div>
                        <div className={classes.recentContent}><span>백스타트</span></div>
                        <div className={classes.recentContent}><span>컴퓨터 과학</span></div>
                        <div className={classes.recentContent}><span>포트폴리오</span></div>
                        <div className={classes.recentContent}><span>방구대장 뿡빵이</span></div>
                    </div>
                </div>
                <div className={classes.famousBox}>
                    <div className={classes.famousHead}>
                        <span>인기 검색어</span>
                    </div>
                    <div className={classes.famousContent}>
                        <ul>
                            <li><div><span>1</span></div><label>디자인</label></li>
                            <li><div><span>2</span></div><label>디자인</label></li>
                            <li><div><span>3</span></div><label>디자인</label></li>
                            <li><div><span>4</span></div><label>디자인</label></li>
                            <li><div><span>5</span></div><label>디자인</label></li>
                            <li><div><span>6</span></div><label>디자인</label></li>
                            <li><div><span>7</span></div><label>디자인</label></li>
                            <li><div><span>8</span></div><label>디자인</label></li>
                            <li><div><span>9</span></div><label>디자인</label></li>
                            <li><div><span>10</span></div><label>디자인</label></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.afterBox}></div>
        </div>
    )
}

export default Search
