import classes from "./PostModal.module.css"
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {useEffect, useState} from "react";
import {modalActions} from "../../store/modal-slice";

function PostModal(){
    const data = useSelector((state) => state.modal.data)
    const dispatch = useDispatch()

    const [heart, setHeart] = useState(data.board_like.user_like_status)
    const [heartNum, setHeartNum] = useState(data.board_like.total_like_count)
    const [favorite, setFavorite] = useState(data.bookmark_info.user_bookmark_status)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        setOpen(true)
    }, [])

    const closeModal = () => {
        setOpen(false)

        setTimeout(() => {
            dispatch(modalActions.changeDetailOpen({open:false, data:null}))
        }, 200)
    }

    const handleHeart = () => {

    }

    return (
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
                <div className={classes.likeDiv}>
                    <img src={heart ? "/images/icons/colorHeart.png" : "/images/icons/heart.png"}/>
                    <span>
                        {heartNum}
                    </span>
                </div>
                <div className={classes.favoriteDiv}>
                    <img src={favorite ? "/images/icons/colorStar.png" : "/images/icons/star.png"}/>
                </div>
            </div>
        </div>
    )
}

export default PostModal
