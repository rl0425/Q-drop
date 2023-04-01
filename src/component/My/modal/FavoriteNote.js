import classes from "./FavoriteNote.module.css"
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import useHttp from "../../../hooks/use-http";
import {modalActions} from "../../../store/modal-slice";

import InfiniteScroll from "react-infinite-scroll-component";
import Lottie from "lottie-react-web";
import animationData from "../../../jsons/spinner.json";

function FavoriteNote(){
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    // 무한 스크롤
    const [pageEnd, setPageEnd] = useState(true)
    const [pageNum, setPageNum] = useState(0)

    const { isLoading, error, sendRequest: fetchTask } = useHttp();

    // 모든 데이터의 로드 확인
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(()=>{
        // setOpen(true)
        // setTimeout(()=> {
        //     setOpen(true)
        // },50)
    }, [])

    useEffect(()=>{
        handleGetData()
    }, [])

    useEffect(() => {
        console.log("adss")
        const handleScroll = () => {
            console.log("Scorlodld")
            // Handle scroll event here
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handlePrevBtn = () => {
        setOpen(false)
        setTimeout(()=>{
            dispatch(myPageActions.changeFavoriteOpen({favoriteOpen:false}))
        }, 150)
    }

    const handleGetData = () => {
        fetchTask({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/my?paging_num=${pageNum}&paging_count=7&sortType=desc`}, (taskObj) => {
            setData(taskObj)
            setDataLoaded(true)
            setTimeout(()=> {
                setOpen(true)
            },20)
        })
    }

    const handlePostDetail = (element) => {
        dispatch(modalActions.changeDetailOpen({open:true, dataId: {id:element.id, mainCategory:element.mainCategory.main_category_id ,subcategory:element.subCategory.sub_category_id}}))
    }

    const handleIsFavorite = (e,element) => {
        e.preventDefault()
        e.stopPropagation()

        fetchTask({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${element.id}`, type:"delete"}, (request) => {
            if(request){
                handleGetData()
            }
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
                        <span>즐겨찾기한 노트 </span>
                    </div>
                    <div className={classes.body}>
                        <div className={classes.scrollDiv}>
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
                            {data.map((ele) => {
                                return (
                                    <div onClick={() => handlePostDetail(ele)} key={uuidv4()}
                                         className={classes.content}>


                                        <div className={classes.contentBody}>
                                            <div className={classes.contentTitle}>
                                                <div className={classes.contentTitleSpan}><span>Q. {ele.title}</span>
                                                </div>
                                                <img onClick={(e) => handleIsFavorite(e, ele)}
                                                     src={"/images/mypage/icons/favorite.png"}/>
                                            </div>
                                            <div className={classes.contentMain}><span>{ele.content}</span></div>
                                            <div className={classes.contentSub}>
                                                <span>{ele.subCategory.sub_category_name}</span></div>
                                        </div>


                                    </div>

                                )
                            })}
                            </InfiniteScroll>

                        </div>

                    </div>
                </div>
                :
                ""
        )
    }
}

export default FavoriteNote
