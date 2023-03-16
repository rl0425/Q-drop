import React, {useEffect, useState, useRef} from "react"
import {v4 as uuidv4} from "uuid";
import classes from "./ContentList.module.css"
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch} from "react-redux";
import useHttp from "../../../../hooks/use-http";

function ContentList(props){
    const data = props.data
    const dispatch = useDispatch()

    const [likeSrc, setLikeSrc] = useState(data.board_like.user_like_status ? "images/icons/colorHeart.png" : "images/icons/heart.png");
    const [likeCount, setLikeCount] = useState(data.board_like.total_like_count);
    const [favoriteSrc, setFavoriteSrc] = useState(data.bookmark_info.user_bookmark_status ? "images/icons/colorStar.png" : "images/icons/star.png");

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const handleLikeClick = () => {
        // Update like status and count
        const type = likeSrc === "images/icons/colorHeart.png" ? "uncheck" : "check"

        const newLikeSrc = type === "uncheck" ? "images/icons/heart.png" : "images/icons/colorHeart.png";
        const newLikeCount = likeCount + (type === "uncheck" ? -1 : 1);
        setLikeSrc(newLikeSrc);
        setLikeCount(newLikeCount);

        // Make API call to update like status
        if(type === "check"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`, type:"post"}, (taskObj) => {
                console.log("check")
            })
        }
        else if(type === "uncheck"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`, type:"delete"}, (taskObj) => {
                console.log("uncheck")
            })
        }

        const tempData = props.data
        tempData.board_like.total_like_count = type === "check" ? tempData.board_like.total_like_count+1 : tempData.board_like.total_like_count-1
        tempData.board_like.user_like_status = type === "check" ? true : false

        props.onUpdateCategory({type:"favorite", kind:type, data:props.data})

    }

    const handleFavoriteClick = () => {
        const type = favoriteSrc === "images/icons/colorStar.png" ? "uncheck" : "check"

        const newLikeSrc = type === "uncheck" ? "images/icons/star.png" : "images/icons/colorStar.png";
        setFavoriteSrc(newLikeSrc);

        if(type === "check"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type:"post"})
        }
        else if(type === "uncheck"){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type:"delete"})
        }

        const tempData = props.data
        tempData.bookmark_info.user_bookmark_status = type === "check" ? true : false

        props.onUpdateCategory({type:"favorite", kind:type, data:props.data})
    }

    // 세부 카테고리 설정 모달 이벤트
    const optClickEvt = (ele) => {
        dispatch(modalActions.changePostOpen({open: true, id: ele}))
    }


    return (
        <div className={classes.itemBox}>
            <div className={classes.qSpanBox}>
                <div className={classes.qSpan}><span>Q.</span></div>
            </div>
            <div className={classes.contentBox}>
                <div className={classes.questionBox}><span>{data.title}</span></div>
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
                    <div onClick={optClickEvt}>
                        <img style={{width: "3px", height: "14px"}}
                             src={"/images/icons/option.png"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ContentList;
