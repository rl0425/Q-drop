import classes from "./WrittenNote.module.css"
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import useHttp from "../../../hooks/use-http";
import {modalActions} from "../../../store/modal-slice";

import InfiniteScroll from "react-infinite-scroll-component";

function WrittenNote(){
    const [open, setOpen] = useState(false)
    const [data, setData] = useState("")
    const dispatch = useDispatch()

    // 무한 스크롤
    const [pageEnd, setPageEnd] = useState(true)
    const [pageNum, setPageNum] = useState(0)

    const { isLoading, error, sendRequest: getData } = useHttp();

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(()=>{
        setTimeout(()=> {
            setOpen(true)
        },50)
    }, [])

    useEffect(()=>{
        handleGetData()
    }, [])

    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeWrittenOpen({writtenOpen:false}))
        }, 150)
    }

    const handleGetData = () => {
        getData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/my?paging_num=${pageNum}&paging_count=20&sortType=desc`}, (taskObj) => {
            setData(taskObj)
            setDataLoaded(true)
        })
    }

    const handlePostDetail = (element) => {
        dispatch(modalActions.changeDetailOpen({open:true, dataId: {id:element.id, mainCategory:element.mainCategory.main_category_id ,subcategory:element.subCategory.sub_category_id}}))
    }

    const handleMoreData = () => {
        getData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/my?paging_num=${pageNum+1}&paging_count=20&sortType=desc`}, (taskObj) => {
            if(taskObj.length > 0) {
                const temp = [...data, ...taskObj]
                setData(temp)
            }
            else{
                setPageEnd(false)
            }
        })

        setPageNum((prev) => prev+1)
    }

    if(isLoading || !dataLoaded){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        return (
            data ?
                <div className={open ? classes.box : classes.unBox}>
                    <div className={classes.head}>
                        <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                        <span>내가 쓴 노트</span>
                    </div>
                    <div className={classes.body}>
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
                            // loader={<h4>Loading...</h4>}
                            // endMessage={<p>stop</p>}
                            height={"0"}
                        >
                            <div className={classes.scrollDiv}>
                            {data.map((ele) => {
                                return (
                                    <div onClick={() => handlePostDetail(ele)} key={uuidv4()}
                                         className={classes.content}>
                                        <div className={classes.contentHead}>
                                            <img
                                                src={ele.approval === 0 ?
                                                    "/images/mypage/icons/approvalReady.png" : ele.approval === 1 ?
                                                        "/images/mypage/icons/approvalCheck.png" :
                                                        "/images/mypage/icons/approvalReject.png"
                                                }/>
                                            <span
                                                className={ele.approval === 0 ? classes.readyNote : ele.approval === 1 ? classes.completeNote : classes.rejectNote}>
                                    {ele.approval === 0 ? "승인대기중" : ele.approval === 1 ? "승인" : "거절"}
                                </span>
                                        </div>
                                        <div className={classes.contentBody}>
                                            <div className={classes.contentTitle}><span>Q. {ele.title}</span></div>
                                            <div className={classes.contentMain}><span>{ele.content}</span></div>
                                            <div className={classes.contentSub}>
                                                <span>{ele.subCategory.sub_category_name}</span></div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </InfiniteScroll>

                    </div>
                </div>
                :
                ""
        )
    }
}

export default WrittenNote
