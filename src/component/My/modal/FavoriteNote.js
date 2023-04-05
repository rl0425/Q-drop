import classes from "./FavoriteNote.module.css"
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import useHttp from "../../../hooks/use-http";
import {modalActions} from "../../../store/modal-slice";

import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from "lottie-react-web";
import animationData from "../../../jsons/spinner.json";
import {toastActions} from "../../../store/toast-slice";

import PullToRefresh from 'react-pull-to-refresh';

function FavoriteNote(){
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const [removeModal, setRemoveModal] = useState(false)
    const [animated, setAnimated] = useState(false)
    const [select, setSelect] = useState("")

    const dispatch = useDispatch()

    // 무한 스크롤
    const [pageEnd, setPageEnd] = useState(true)
    const [pageNum, setPageNum] = useState(0)

    const { isLoading, error, sendRequest: fetchTask } = useHttp();

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);

    // 리렌더링
    const reload = useSelector((state) => state.main.reloadSwitch)
    const isLogin = useSelector((state) => state.main.isLogin)

    useEffect(()=>{
        setOpen(true)

        handleGetData()
    }, [reload])

    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeFavoriteOpen({favoriteOpen:false}))
        }, 150)
    }

    const handleGetData = () => {
        fetchTask({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/my?paging_num=${pageNum}&paging_count=7&sortType=asc`}, (taskObj) => {
            if(taskObj) {
                setData(taskObj)
            }
            setDataLoaded(true)
            // setTimeout(()=> {
            //     setOpen(true)
            // },300)
        })
    }

    const handlePostDetail = (element) => {
        dispatch(modalActions.changeDetailOpen({open:true, dataId: {id:element.id, mainCategory:element.mainCategory.main_category_id ,subcategory:element.subCategory.sub_category_id}}))
    }

    const handleModalOpen = (e,element) => {
        e.preventDefault()
        e.stopPropagation()

        setRemoveModal(true)
        setSelect(element.id)

        setTimeout(() => {
            setAnimated(true)
        }, 10)
    }

    const handleDeleteItems = () => {

        fetchTask({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${select}`, type:"delete"}, (request) => {

            // 데이터 리렌더링
            if (request){
                handleGetData()
            }

            // 모달 종료
            removeModalClickEvt()

            // toast msg
            setTimeout(() => {
                dispatch(toastActions.handleToastOpt({msg:"즐겨찾기가 제거되었습니다.", open:true}))
            }, 300)
        })
    }

    const handleMoreData = () => {
        fetchTask({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/my?paging_num=${pageNum+1}&paging_count=7&sortType=desc`}, (taskObj) => {
            if(taskObj.length > 0) {
                const temp = [...data, ...taskObj]

                setTimeout(() => {
                    setData(temp)
                }, 700)
            }
            else{
                setPageEnd(false)
            }
        })

        setPageNum((prev) => prev+1)
    }

    const removeModalClickEvt = () => {
        setAnimated(false)

        setTimeout(() => {
            setRemoveModal(false)
        }, 200)

    }

    const handleRefresh = () => {
        // refresh 로직을 작성합니다.
        console.log("123123")
    };

    if(isLoading){
        return <div>sss</div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        return (
            data ?
                <>
                    <div className={open ? classes.box : classes.unBox}>
                        <div className={classes.head}>
                            <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                            <span>즐겨찾기한 노트 </span>
                        </div>
                        <div className={classes.body}>
                            {!isLogin ?
                                <div className={classes.emptyBox}><span>로그인을 해주세요.</span></div>
                                : data.length > 0 ?
                                <div className={classes.scrollDiv}>
                                    <PullToRefresh
                                        onRefresh={handleRefresh}
                                        style={{
                                            // overflow:"scroll"
                                            // height: "100%",
                                            // display: "flex",
                                            // flexDirection: "column",
                                            // gap: "16px"
                                        }}
                                    >
                                    <InfiniteScroll
                                        dataLength={data.length}
                                        next={() => handleMoreData()}
                                        hasMore={pageEnd}
                                        style={{
                                            overflow: "scroll",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "16px"
                                        }}
                                        loader={<div className={classes.loadingDiv}><Lottie options={{
                                            animationData: animationData
                                        }}/></div>}
                                        height={"0"}
                                    >

                                            {/*<div style={{height:"100%"}}>*/}
                                            {data.map((ele) => {
                                                return (
                                                    <div onClick={() => handlePostDetail(ele)} key={uuidv4()} className={classes.content}>
                                                        <div className={classes.contentBody}>
                                                            <div className={classes.contentTitle}>
                                                                <div className={classes.contentTitleSpan}><span>Q. {ele.title}</span>
                                                                </div>
                                                                <img onClick={(e) => handleModalOpen(e, ele)}
                                                                     src={"/images/mypage/icons/favorite.png"}/>
                                                            </div>
                                                            <div className={classes.contentMain}><span>{ele.content}</span></div>
                                                            <div className={classes.contentSub}>
                                                                <span>{ele.subCategory.sub_category_name}</span></div>
                                                        </div>
                                                    </div>
                                                 )

                                            })}
                                            {/*</div>*/}

                                    </InfiniteScroll>
                                    </PullToRefresh>


                                </div>
                                : <div className={classes.emptyBox}><span>게시글이 없어요.</span></div>
                            }

                        </div>
                    </div>
                    {removeModal ?
                        <>
                            <div onClick={removeModalClickEvt}
                                 className={animated ? classes.blackBox : classes.unBlackBox}></div>
                            <div className={animated ? classes.modalBox : classes.unModalBox}>
                                <div className={classes.modalHead}>
                                    <span>즐겨찾기를 해제 할까요?</span>
                                </div>
                                <div className={classes.modalBody}>
                                    <div onClick={removeModalClickEvt} className={classes.cancelBtn}>
                                        <span>취소</span>
                                    </div>
                                    <div onClick={handleDeleteItems} className={classes.submitBtn}>
                                        <span>해제</span>
                                    </div>
                                </div>
                            </div>
                        </>
                        : ""
                    }
                </>
                :
                "ss"
        )
    }
}

export default FavoriteNote
