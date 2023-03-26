import classes from "./FavoriteNote.module.css"
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {myPageActions} from "../../../store/myPage-slice";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import useHttp from "../../../hooks/use-http";
import {modalActions} from "../../../store/modal-slice";

// 무한스크롤
import InfiniteScroll from "react-infinite-scroll-component";


function FavoriteNote(){
    const [open, setOpen] = useState(false)
    const [data, setData] = useState("")
    const dispatch = useDispatch()

    // 무한 스크롤
    const [pageEnd, setPageEnd] = useState(true)

    const { isLoading, error, sendRequest: fetchTask } = useHttp();

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
            dispatch(myPageActions.changeFavoriteOpen({favoriteOpen:false}))
        }, 150)
    }

    const handleGetData = () => {
        fetchTask({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/my`}, (taskObj) => {
            console.log("taskObj = ", taskObj)
            setData(taskObj)
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

    const handleMoreData = (ele) => {

    }

    return (
        data ?
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <img onClick={handlePrevBtn} src={"/images/icons/prevBtn.png"}/>
                <span>즐겨찾기한 노트 </span>
            </div>
            <div className={classes.body}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={() => handleMoreData(data)}
                    hasMore={pageEnd}
                    style={{ overflow: "scroll", height: "100%", display:"flex", flexDirection:"column", gap:"16px"}}
                    loader={<h4>Loading...</h4>}
                    height={"0"}
                >
                    {data.map((ele) => {
                        return (
                            <div onClick={() => handlePostDetail(ele)} key={uuidv4()} className={classes.content}>

                                <div className={classes.contentBody}>
                                    <div className={classes.contentTitle}>
                                        <div className={classes.contentTitleSpan}><span>Q. {ele.title}</span></div>
                                        <img onClick={(e) => handleIsFavorite(e,ele)} src={"/images/mypage/icons/favorite.png"}/>
                                    </div>
                                    <div className={classes.contentMain}><span>{ele.content}</span></div>
                                    <div className={classes.contentSub}><span>{ele.subCategory.sub_category_name}</span></div>
                                </div>
                            </div>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </div>
        :
        ""
    )
}

export default FavoriteNote
