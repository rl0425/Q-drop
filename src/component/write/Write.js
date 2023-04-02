import {useEffect, useRef, useState} from "react";
import classes from "./Write.module.css"
import {useDispatch, useSelector} from "react-redux";
import useHttp from "../../hooks/use-http";
import WriteCategoryWrapper from "./WriteCategoryWrapper";
import {writeActions} from "../../store/write-slice";
import {toastActions} from "../../store/toast-slice";
import {mainDataActions} from "../../store/mianData-slice";

function Write(){
    const [open, setOpen] = useState(false)
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [categoryId, setCategoryId] = useState("")

    useEffect(()=>{
        setOpen(true)
    }, [])

    const handleOpenCategory = () => {
        dispatch(writeActions.handleCategoryOpen({categoryOpen:true}))
    }

    const handleSetCategory = (ele) => {
        setCategory(ele.text)
        setCategoryId(ele.id[0])
    }

    const handleExit = () => {
        setOpen(false)
        setTimeout(() => {
            dispatch(writeActions.handleOpen({open:false}))
        }, 400)
    }

    const handleCompleteBtn = () => {
        if(!categoryId){
            dispatch(toastActions.handleToastOpt({msg:"카테고리를 설정해주세요.", open:true}))
        }
        else if(!title){
            dispatch(toastActions.handleToastOpt({msg:"제목을 입력해주세요.", open:true}))

        }
        else if(!content){
            dispatch(toastActions.handleToastOpt({msg:"내용을 입력해주세요.", open:true}))
        }
        else {

            console.log("content =", content)
            fetchTasks({
                url : `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${categoryId}`,
                type: "post",
                data: {"title": title, "content": content}
            }, (taskObj) => {
                handleExit()
                dispatch(toastActions.handleToastOpt({msg:"새로운 글을 작성하였습니다.", open:true}))
                dispatch(mainDataActions.handleReload())
            })
        }

    }

    return (
        <>
            <div className={open ? classes.box : classes.unBox}>
                <div className={classes.head}>
                    <img onClick={handleExit} src={"/images/icons/exit.png"}/>
                    <span>노트 작성</span>
                    <label onClick={handleCompleteBtn}>완료</label>
                </div>
                <div className={classes.body}>
                    <div onClick={handleOpenCategory} className={classes.categoryBox}>
                        <span>{category ? category : "노트의 카테고리를 선택해 주세요."}</span>
                        <img src={"/images/icons/prevBtn.png"}/>
                    </div>
                    <div className={classes.contentBox}>
                        <div className={classes.questionBox}>
                            <input onChange={(e) => setTitle(e.target.value)} placeholder={"질문을 입력하세요"} />
                        </div>
                        <div className={classes.answerBox}>
                            <textarea onChange={(e) => setContent(e.target.value)} placeholder={"질문을 대한 답변을 입력하세요."} />
                        </div>
                    </div>
                </div>
            </div>
            <WriteCategoryWrapper setCateogry={handleSetCategory} activeNum={categoryId}/>
        </>
    )
}

export default Write
