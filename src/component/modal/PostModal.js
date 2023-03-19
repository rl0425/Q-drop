import classes from "./PostModal.module.css"
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {useEffect, useState} from "react";
import {modalActions} from "../../store/modal-slice";
import {mainDataActions} from "../../store/mianData-slice";
import useHttp from "../../hooks/use-http";

function PostModal(){
    const dispatch = useDispatch()

    const contentList = useSelector((state) => state.main.contentList)
    const id = useSelector((state) => state.modal.dataId)

    const [data, setData] = useState("")
    const [like, setHeart] = useState("")
    const [likeNum, setHeartNum] = useState("")
    const [favorite, setFavorite] = useState("")

    const [open, setOpen] = useState(false)
    const [setting, setSetting] = useState(false)

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(()=>{
        getIdData()
    }, [contentList])

    const getIdData = () => {
        const tempData = contentList[id.mainCategory-1].values.find(item => item.id === id.id)
        setData(tempData)
        setHeart(tempData.board_like.user_like_status)
        setHeartNum(tempData.board_like.total_like_count)
        setFavorite(tempData.bookmark_info.user_bookmark_status)

        setSetting(true)

        setTimeout(() => {
            setOpen(true)
        }, 50)
    }

    const closeModal = () => {
        setOpen(false)

        setTimeout(() => {
            dispatch(modalActions.changeDetailOpen({open:false, data:null}))
        }, 200)
    }

    const handleLike = () => {
        const type = !like
        const newLikeCount = likeNum + (type === false ? -1 : 1);

        // Make API call to update like status
        if(type){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`, type:"post"}, (taskObj) => {
            })
        }
        else if(!type){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/like/${data.id}`, type:"delete"}, (taskObj) => {
            })
        }

        const temp = contentList.map((ele) => {
            if (ele.id === id.mainCategory) {
                const updatedValues = ele.values.filter(item => item.id !== id.id);
                updatedValues.push({
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

        dispatch(mainDataActions.changeContent({ contentList: temp }))
    }

    const handleFavorite = () => {
        const type = !favorite

        if(type){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type:"post"})
        }
        else if(!type){
            fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/bookmark/${data.id}`, type:"delete"})
        }

        const temp = contentList.map((ele) => {
            if (ele.id === id.mainCategory) {
                const updatedValues = ele.values.filter(item => item.id !== id.id);
                updatedValues.push({
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

        dispatch(mainDataActions.changeContent({ contentList: temp }))
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
                            <span>{data.member_info.nickname}</span>
                            <span>|</span>
                            <span>{moment(new Date(data.createTime)).format("YYYY.MM.DD")}</span>
                        </div>
                    </div>
                    <div className={classes.qOption}>
                        <img src={"images/icons/option.png"}/>
                    </div>
                </div>
            </div>
            <div className={classes.body}>
                <span>
                    {data.content}
                    <p />
                    {data.content}
                    <p />
                    {data.content}
                    {data.content}
                    {data.content}
                    <p />
                    {data.content}
                    {data.content}
                    <p />
                    {data.content}
                    {data.content}
                </span>
            </div>
            <div className={classes.footer}>
                <div onClick={handleLike} className={classes.likeDiv}>
                    <img src={like ? "/images/icons/colorHeart.png" : "/images/icons/heart.png"}/>
                    <span>
                        {likeNum}
                    </span>
                </div>
                <div onClick={handleFavorite} className={classes.favoriteDiv}>
                    <img src={favorite ? "/images/icons/colorStar.png" : "/images/icons/star.png"}/>
                </div>
            </div>
        </div>
    )
}

export default PostModal
