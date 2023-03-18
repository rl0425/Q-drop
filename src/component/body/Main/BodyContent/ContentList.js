import React, {useEffect, useState, useRef} from "react"
import {v4 as uuidv4} from "uuid";
import classes from "./ContentList.module.css"
import {modalActions} from "../../../../store/modal-slice";
import {useDispatch} from "react-redux";
import useHttp from "../../../../hooks/use-http";
import {logDOM} from "@testing-library/react";

function ContentList(props){
    const dispatch = useDispatch()

    const [data, setData] = useState(props.data)
    const [temp, setTemp] = useState(data)


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

        const newLikeSrc = type === "uncheck" ? "images/icons/heart.png" : "images/icons/colorHeart.png";
        const newLikeCount = likeCount + (type === "uncheck" ? -1 : 1);
        setLikeSrc(newLikeSrc);
        setLikeCount(newLikeCount);

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

        setData(tempData)
        setTemp(tempData);
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

        const tempData = props.data
        tempData.bookmark_info.user_bookmark_status = type === "check" ? true : false
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

        dispatch(modalActions.changePostOpen({open: true, id: ele}))
    }

    // 내용 자세히 보기 이벤트
    const openDetail = (e) => {
        dispatch(modalActions.changeDetailOpen({open:true, data: {...temp}}))
    }

    return (

        data !== "" ? <div onClick={openDetail} className={classes.itemBox} data={data}>
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
        </div> : ""

    )
}


export default ContentList;
