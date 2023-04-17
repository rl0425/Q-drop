import React, {useEffect, useState, useRef, forwardRef} from "react"
import {v4 as uuidv4} from "uuid";
import classes from "./ContentList.module.css"
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "../../../../hooks/use-http";
import {logDOM} from "@testing-library/react";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import {toastActions} from "../../../../store/toast-slice";
import {loginActions} from "../../../../store/login-slice";

const ContentList = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const [data, setData] = useState(props.data)
    const [dataLoaded, setDataLoaded] = useState(props.dataLoaded)
    const [temp, setTemp] = useState(data)

    const [likeSrc, setLikeSrc] = useState(data.board_like.user_like_status ? "images/icons/colorHeart.svg" : "images/icons/heart.svg")
    const [likeCount, setLikeCount] = useState(data.board_like.total_like_count)
    const [favoriteSrc, setFavoriteSrc] = useState(data.bookmark_info.user_bookmark_status ? "images/icons/colorStar.svg" : "images/icons/star.svg")

    const {isLoading, error, sendRequest: fetchTasks} = useHttp();

    const isLogin = useSelector((state) => state.main.isLogin)

    useEffect(() => {
        setData(props.data)
    }, [likeSrc, favoriteSrc])

    const handleLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(loginActions.handleOpen({open:true}))
    }

    const handleLikeClick = (e) => {
        e.stopPropagation()
        e.preventDefault()

        // Update like status and count
        const type = likeSrc === "images/icons/colorHeart.svg" ? "uncheck" : "check"
        const newLikeCount = likeCount + (type === "uncheck" ? -1 : 1);

        // Make API call to update like status
        if (type === "check") {
            fetchTasks({
                url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`,
                type: "post"
            }, (taskObj) => {
            })
        } else if (type === "uncheck") {
            fetchTasks({
                url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`,
                type: "delete"
            }, (taskObj) => {
            })
        }

        const tempData = {
            ...data,
            board_like: {
                ...data.board_like,
                total_like_count: newLikeCount,
                user_like_status: type === "check" ? true : false
            }
        };

        props.onUpdateCategory(e, {type: "like", kind: type, data: tempData})

        // if(type === "check"){
        //     dispatch(toastActions.handleToastOpt({msg:"좋아요를 눌렀어요", open:true}))
        // }
        // else{
        //     dispatch(toastActions.handleToastOpt({msg:"좋아요를 취소했어요", open:true}))
        // }
    }

    const handleFavoriteClick = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const type = favoriteSrc === "images/icons/colorStar.svg" ? "uncheck" : "check"

        const newLikeSrc = type === "uncheck" ? "images/icons/star.svg" : "images/icons/colorStar.svg";
        setFavoriteSrc(newLikeSrc);

        if (type === "check") {
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type: "post"})
        } else if (type === "uncheck") {
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type: "delete"})
        }

        const tempData = {
            ...data,
            bookmark_info: {
                ...data.board_like,
                user_bookmark_status: type === "check" ? true : false
            }
        };
        props.onUpdateCategory(e, {type: "like", kind: type, data: tempData})

        // if(type === "check"){
        //     dispatch(toastActions.handleToastOpt({msg:"즐겨찾기에 추가했어요.", open:true}))
        // }
        // else{
        //     dispatch(toastActions.handleToastOpt({msg:"즐겨찾기에서 삭제했어요", open:true}))
        // }

    }

    const changeData = () => {
        const temp = [...data]
        const matchingBData = temp.find(b => b.id === data.data.mainCategory.main_category_id);
        if (matchingBData) {
            const updatedBData = matchingBData.values.filter(item => item.id !== data.data.id);

            updatedBData.push(data.data);
            temp[data.data.mainCategory.main_category_id - 1].values = updatedBData
        }

    }

    // 세부 카테고리 설정 모달 이벤트
    const optClickEvt = (e, ele) => {
        e.stopPropagation()
        e.preventDefault()

        dispatch(modalActions.changePostOpen({
            open: true,
            dataInfo: {
                id: ele.data.id,
                categoryId: data.mainCategory.main_category_id,
                subCategory: data.subCategory.sub_category_id,
                author: data.author
            }
        }))
    }

    // 내용 자세히 보기 이벤트
    const openDetail = (e) => {
        dispatch(modalActions.changeDetailOpen({
            open: true,
            dataId: {
                id: temp.id,
                mainCategory: temp.mainCategory.main_category_id,
                subcategory: temp.subCategory.sub_category_id
            }
        }))
    }


    if (!dataLoaded) {
       return(<>
            <div onClick={openDetail} className={classes.itemBox} style={{marginLeft:"0px"}} data={data} ref={ref}>
                <div className={classes.qSpanBox}>
                    <div className={classes.qSpan}><span></span></div>
                </div>
                <div className={classes.contentBox}>
                    <div className={classes.questionBox}>
                        <div>
                            <Skeleton variant="rounded"  animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} width={'25%'} height={15} />
                        </div>
                        <Skeleton variant="rounded"  animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} width={'100%'} height={60} />
                    <div className={classes.optBox}>
                        <Skeleton variant="rounded"  animation="wave" sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}} width={'30%'} height={20} />
                    </div>
                </div>
            </div>
            </div>
        </>)
    } else {
        return (

            data !== "" ?
                <div onClick={openDetail} className={classes.itemBox} data={data} ref={ref}>
                    <div className={classes.qSpanBox}>
                        <div className={classes.qSpan}><span>Q.</span></div>
                    </div>
                    <div className={classes.contentBox}>
                        <div className={classes.questionBox}>
                            <div><span>{data.title}</span></div>
                            <div className={classes.detailQuestion}>
                                <div className={classes.detailSubcategory}>
                                    <label>{data.subCategory.sub_category_name}</label>
                                </div>
                                <span>{data.member_info.nickname} | {moment(data.createTime).format("YYYY.MM.DD")}</span>
                            </div>
                        </div>
                        <div className={classes.answerBox}><span>{data.content}</span></div>
                        <div className={classes.optBox}>
                            <div className={classes.heartBox} onClick={isLogin ? handleLikeClick : handleLogin} style={{width:"48px"}}>
                                <img style={{width: "20px", height: "17px"}}
                                     src={likeSrc}/>
                                <span>{likeCount}</span>
                            </div>
                            <div onClick={isLogin ? handleFavoriteClick : handleLogin} style={{width:"57px"}}>
                                <img style={{width: "20px", height: "17px"}}
                                     src={favoriteSrc}/>
                            </div>
                            <div onClick={(e) => optClickEvt(e, props)} style={{width:"19px"}}>
                                <img style={{width: "3px", height: "14px"}}
                                     src={"/images/icons/option.png"}/>
                            </div>
                        </div>
                    </div>
                </div> : ""

        )
    }
})


export default ContentList;
