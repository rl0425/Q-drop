import React, {useEffect, useState, useRef, forwardRef} from "react"
import {v4 as uuidv4} from "uuid";
import classes from "./ContentList.module.css"
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch} from "react-redux";
import useHttp from "../../../../hooks/use-http";
import {logDOM} from "@testing-library/react";
import moment from "moment";

const ContentList = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const [data, setData] = useState(props.data)
    const [temp, setTemp] = useState(data)

    const [refreshing, setRefreshing] = useState(false);


    const [likeSrc, setLikeSrc] = useState(data.board_like.user_like_status ? "images/icons/colorHeart.png" : "images/icons/heart.png")
    const [likeCount, setLikeCount] = useState(data.board_like.total_like_count)
    const [favoriteSrc, setFavoriteSrc] = useState(data.bookmark_info.user_bookmark_status ? "images/icons/colorStar.png" : "images/icons/star.png")

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() =>{
        setData(props.data)
    }, [likeSrc, favoriteSrc])

    const handleLikeClick = (e) => {
        e.stopPropagation()
        e.preventDefault()

        // Update like status and count
        const type = likeSrc === "images/icons/colorHeart.png" ? "uncheck" : "check"
        const newLikeCount = likeCount + (type === "uncheck" ? -1 : 1);

        // Make API call to update like status
        if(type === "check"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`, type:"post"}, (taskObj) => {
            })
        }
        else if(type === "uncheck"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`, type:"delete"}, (taskObj) => {
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

        props.onUpdateCategory(e,{type:"like", kind:type, data:tempData})
    }

    const handleFavoriteClick = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const type = favoriteSrc === "images/icons/colorStar.png" ? "uncheck" : "check"

        const newLikeSrc = type === "uncheck" ? "images/icons/star.png" : "images/icons/colorStar.png";
        setFavoriteSrc(newLikeSrc);

        if(type === "check"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type:"post"})
        }
        else if(type === "uncheck"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type:"delete"})
        }

        const tempData = {
            ...data,
            bookmark_info: {
                ...data.board_like,
                user_bookmark_status: type === "check" ? true : false
            }
        };
        props.onUpdateCategory(e,{type:"like", kind:type, data:tempData})


    }

    const changeData = () => {
        const temp = [...data]
        const matchingBData = temp.find(b => b.id === data.data.mainCategory.main_category_id);
        if (matchingBData){
            const updatedBData = matchingBData.values.filter(item => item.id !== data.data.id);

            updatedBData.push(data.data);
            temp[data.data.mainCategory.main_category_id-1].values = updatedBData
        }

    }

    // 세부 카테고리 설정 모달 이벤트
    const optClickEvt = (e, ele) => {
        e.stopPropagation()
        e.preventDefault()

        dispatch(modalActions.changePostOpen({
            open: true,
            dataInfo:{
                id:ele.data.id,
                categoryId: data.mainCategory.main_category_id,
                author:data.author
            }
        }))
    }

    // 내용 자세히 보기 이벤트
    const openDetail = (e) => {
        dispatch(modalActions.changeDetailOpen({open:true, dataId: {id:temp.id, mainCategory:temp.mainCategory.main_category_id,  subcategory:temp.subCategory.sub_category_id}}))

    }

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
                            <span>{data.member_info.nickname}  |  {moment(data.createTime).format("YYYY.MM.DD")}</span>
                        </div>
                    </div>
                    <div className={classes.answerBox}><span>{data.content}</span></div>
                    <div className={classes.optBox}>
                        <div className={classes.heartBox} onClick={handleLikeClick}>
                            <img style={{width: "20px", height: "17px"}}
                                 src={likeSrc}/>
                            <span>{likeCount}</span>
                        </div>
                        <div onClick={handleFavoriteClick}>
                            <img style={{width: "20px", height: "17px"}}
                                 src={favoriteSrc}/>
                        </div>
                        <div onClick={(e) => optClickEvt(e,props)}>
                            <img style={{width: "3px", height: "14px"}}
                                 src={"/images/icons/option.png"}/>
                        </div>
                    </div>
                </div>
            </div> : ""

    )
})


export default ContentList;
