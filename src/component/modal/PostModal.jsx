import classes from "./PostModal.module.css"
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {modalActions} from "../../store/modal-slice";
import {mainDataActions} from "../../store/mianData-slice";
import useHttp from "../../hooks/use-http";
import {toastActions} from "../../store/toast-slice";
import {loginActions} from "../../store/login-slice";

function PostModal(){
    const dispatch = useDispatch()

    const contentList = useSelector((state) => state.main.contentList)
    const id = useSelector((state) => state.modal.dataId)
    const openType = useSelector((state) => state.modal.detailOpen)

    const [data, setData] = useState("")
    const [like, setHeart] = useState("")
    const [likeNum, setHeartNum] = useState("")
    const [favorite, setFavorite] = useState("")

    const [open, setOpen] = useState(false)
    const [setting, setSetting] = useState(false)

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const isLogin = useSelector((state) => state.main.isLogin)

    useEffect(()=>{
        if(openType) {
            getIdData()
        }
    }, [contentList])

    const getIdData = () => {
        fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${id.subcategory}/${id.id}`}, (taskObj) => {
            setData(taskObj)
            setHeart(taskObj.board_like.user_like_status)
            setHeartNum(taskObj.board_like.total_like_count)
            setFavorite(taskObj.bookmark_info.user_bookmark_status)

            setSetting(true)

            setTimeout(() => {
                setOpen(true)
            }, 50)
        })
    }

    const closeModal = () => {
        setOpen(false)

        setTimeout(() => {
            dispatch(modalActions.changeDetailOpen({open:false, data:null}))
        }, 200)
    }

    const handleLike = async () => {
        const type = !like
        const newLikeCount = likeNum + (type === false ? -1 : 1);

        // Make API call to update like status
        try {
            await fetchTasks({url:`http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`,  type: type ? "post" : "delete" });

        } catch (error) {
            console.error(error);
        }

        const temp = contentList.map((ele) => {
            if (ele.id === id.mainCategory) {
                const updatedIndex = ele.values.findIndex(item => item.id === id.id);
                const updatedValues = ele.values.filter(item => item.id !== id.id);

                updatedValues.splice(updatedIndex, 0, {
                    ...data,
                    board_like:{
                        total_like_count:newLikeCount,
                        user_like_status:type
                    }
                });

                return {
                    ...ele,
                    values: updatedValues,
                };
            }
            return ele;
        });

        dispatch(mainDataActions.handleContent({contentList: temp }))

        // if(type){
        //     dispatch(toastActions.handleToastOpt({msg:"좋아요를 눌렀어요", open:true}))
        // }
        // else{
        //     dispatch(toastActions.handleToastOpt({msg:"좋아요를 취소했어요", open:true}))
        // }
    }

    const handleFavorite = async () => {
        const type = !favorite

        try {
            await fetchTasks({url:`http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type: type ? "POST" : "DELETE" });
            // const taskObj = await response.json();
        } catch (error) {
            console.error(error);
        }

        const temp = contentList.map((ele) => {
            if (ele.id === id.mainCategory) {
                const updatedIndex = ele.values.findIndex(item => item.id === id.id);
                const updatedValues = ele.values.filter(item => item.id !== id.id);

                updatedValues.splice(updatedIndex, 0, {
                    ...data,
                    bookmark_info:{
                        user_bookmark_status:type
                    }
                });

                return {
                    ...ele,
                    values: updatedValues,
                };
            }
            return ele;
        });

        dispatch(mainDataActions.handleContent({ contentList: temp }))

/*        if(type){
            dispatch(toastActions.handleToastOpt({msg:"즐겨찾기에 추가했어요.", open:true}))
        }
        else{
            dispatch(toastActions.handleToastOpt({msg:"즐겨찾기에서 삭제했어요", open:true}))
        }*/
    }

    const handleOption = (e) => {
        dispatch(modalActions.changePostOpen({
            open: true,
            dataInfo:{
                id:data.id,
                categoryId: data.mainCategory.main_category_id,
                subCategory: data.subCategory.sub_category_id,
                author:data.author
            }
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(loginActions.handleOpen({open:true}))
    }

    return (
        !setting ? "" :
        <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <div className={classes.prevHead}>
                    <img onClick={closeModal} src={"/images/icons/prevBtn.png"}/>
                </div>
                <div className={classes.contentHead}>
                    <div className={classes.qDiv}>
                        <span>Q.</span>
                    </div>
                    <div className={classes.qContent}>
                        <span>{data.title}</span>
                        <div className={classes.qContentDetail}>
                            <div className={classes.detailSubcategory}>
                                <label>{data.subCategory.sub_category_name}</label>
                            </div>
                            <span>{data.member_info.nickname}</span>
                            <span>|</span>
                            <span>{moment(new Date(data.createTime)).format("YYYY.MM.DD")}</span>
                        </div>
                    </div>
                    <div onClick={handleOption} className={classes.qOption}>
                        <img src={"images/icons/option.png"}/>
                    </div>
                </div>
            </div>
            <div className={classes.body}>
                <textarea value={data.content ?? ""} readOnly={true}/>
            </div>
            <div className={classes.footer}>
                <div onClick={isLogin ? handleLike : handleLogin} className={classes.likeDiv}>
                    <img src={like ? "/images/icons/colorHeart.svg" : "/images/icons/heart.svg"}/>
                    <span>
                        {likeNum}
                    </span>
                </div>
                <div onClick={isLogin ? handleFavorite : handleLogin} className={classes.favoriteDiv}>
                    <img src={favorite ? "/images/icons/colorStar.svg" : "/images/icons/star.svg"}/>
                </div>
            </div>
        </div>
    )
}

export default PostModal
