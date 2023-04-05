import classes from "./Search.module.css"
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {searchActions} from "../../store/search-slice";
import useHttp from "../../hooks/use-http";
import {useCookies} from 'react-cookie'
import {modalActions} from "../../store/modal-slice";
import {v4 as uuidv4} from "uuid";

function Search(){
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [hasSearch, setHasSearch] = useState(false)
    const [searchData, setSearchData] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(['search']);

    const dispatch = useDispatch()

    const { isLoading, error, sendRequest: getData } = useHttp();

    const ref = useRef(null);
    const [left, setLeft] = useState(100);

    useEffect(()=>{
        setOpen(true)
        // requestAnimationFrame(() => {
        //     ref.current.style.left = "0%"
        // });
    }, [])

    // useEffect(() => {
    //     const handleOpen = () => {
    //         requestAnimationFrame(() => {
    //             ref.current.classList.add(classes.box);
    //             setOpen(true);
    //         });
    //     };
    //
    //     const handleClose = () => {
    //         // ref.current.classList.remove(classes.box);
    //         // setOpen(false);
    //     };
    //
    //     const handleClick = () => {
    //         if (!open) {
    //             handleOpen();
    //         } else {
    //             handleClose();
    //         }
    //     };
    //
    //     ref.current.addEventListener("transitionend", handleClose);
    //
    //     return () => {
    //         ref.current.removeEventListener("transitionend", handleClose);
    //     };
    // }, [classes.box, open]);

    const prevBtnEvt = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(searchActions.changeOpen({open:false}))
        }, 300)
    }

    const searchEvt = (e) => {
        if(e.key === "Enter") {
            getData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?sub_id=&search=${searchValue}&sortTarget=createTime&sortType=desc`}, (taskObj) => {
                setHasSearch(true)
                setSearchData(taskObj)
            })
            const names = cookies.search || [];
            const newNames = [...names, searchValue];

            setCookie("search", newNames, { path: "/"});
        }
    }

    const handleDeleteCookies = (e) =>{
        removeCookie("search");
    }

    const handleClickRecord = (element) => {
        getData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post?sub_id=&search=${element}&sortTarget=createTime&sortType=desc`}, (taskObj) => {
            setHasSearch(true)
            setSearchData(taskObj)
        })
    }

    const handleDataDetail = (data) => {
        dispatch(modalActions.changeDetailOpen({open:true, dataId: {id:data.id, mainCategory:data.mainCategory.main_category_id, subcategory:data.subCategory.sub_category_id}}))
    }


    const handleSearchChange = (e) => {
        setSearchValue('');
    }

    return (
        // <div ref={boxRef} className={open ? classes.box : classes.unBox}>
        <div ref={ref} className={open ? classes.box : classes.unBox} style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}>
            <div className={classes.head}>
                <div onClick={prevBtnEvt}><img src={"/images/icons/prevBtn.png"}/></div>
                <div className={classes.searchBarBox}>
                    <input type={"string"} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyPress={searchEvt} placeholder={"궁금한 내용을 검색해보세요."}/>
                    <img onClick={handleSearchChange} src={"/images/icons/searchRemove.png"}/>
                </div>
            </div>
            {!hasSearch ? <div className={classes.beforeBox}>
                <div className={classes.recentBox}>
                    <div className={classes.recentHead}>
                        <div><span>최근 검색어</span></div>
                        <div onClick={handleDeleteCookies} className={classes.recentDeleteBtn}><span>기록 삭제</span></div>
                    </div>
                    <div className={classes.recentContBox}>
                        {cookies.search ? cookies.search.map((ele) => (
                            <div onClick={() => handleClickRecord(ele)} key={uuidv4()} className={classes.recentContent}><span>{ele}</span></div>
                        )) : <div className={classes.noRecentCont}><span>최근 검색어가 없어요.</span></div>
                        }
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
            </div> :

            searchData.length === 0 ?
                <div><span>검색 결과가 없어요.</span></div>
                :
                <div className={classes.afterBox}>
                    <div className={classes.numDiv}>
                        <span>총</span>
                        <label>{searchData.length > 99 ? "99+" : searchData.length}</label>
                    </div>
                    <div className={classes.searchContents}>
                        {
                            searchData.map((ele) => {
                                return (
                                    <div key={uuidv4()} onClick={() => {handleDataDetail(ele)}} className={classes.searchContent}>
                                        <div className={classes.searchHead}>
                                            <span>Q. {ele.title}</span>
                                        </div>
                                        <div className={classes.searchBody}>
                                            <span>{ele.content}</span>
                                        </div>
                                        <div className={classes.searchFooter}>
                                            <div className={classes.subCategoryBox}><span>{ele.subCategory.sub_category_name}</span></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Search
