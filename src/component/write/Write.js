import {useEffect, useRef, useState} from "react";
import classes from "./Write.module.css"
import {useDispatch, useSelector} from "react-redux";
import useHttp from "../../hooks/use-http";
import WriteCategoryWrapper from "./WriteCategoryWrapper";
import {writeActions} from "../../store/write-slice";
import {toastActions} from "../../store/toast-slice";
import {mainDataActions} from "../../store/mianData-slice";
import {modalActions} from "../../store/modal-slice";

function Write(){
    const [open, setOpen] = useState(false)
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [categoryId, setCategoryId] = useState("")

    const dataInfo = useSelector((state) => state.modal.dataInfo)

    useEffect(()=>{
        setOpen(true)

        console.log("dataInfo ", dataInfo)

        if(dataInfo.author){
            handleGetContents()
        }
        else{
            dispatch(writeActions.handleCategoryOpen({categoryOpen:true}))
        }
    }, [])

    const handleGetContents = () => {
        fetchTasks({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${dataInfo.subCategory}/${dataInfo.id}`}, (taskObj) => {
            setCategory(taskObj.subCategory.sub_category_name)
            setCategoryId(taskObj.subCategory.sub_category_id)
            setTitle(taskObj.title)
            setContent(taskObj.content)
        })
    }

    const handleOpenCategory = () => {
        dispatch(writeActions.handleCategoryOpen({categoryOpen:true}))
    }

    const handleSetCategory = (ele) => {
        setCategory(ele.text)
        setCategoryId(ele.id[0])
    }

    const handleExit = () => {
        setOpen(false)
        dispatch(modalActions.changeDetailOpen({open:false, data:null}))

        setTimeout(() => {
            dispatch(modalActions.changePostOpen({open: false, dataInfo:{}}))
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
            const lines = content.split('\n');
            console.log("content ", content)
            console.log("lines ", lines)

            dispatch(toastActions.handleToastOpt({msg:"내용을 입력해주세요.", open:true}))
        }
        else {
            fetchTasks({
                url : `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${categoryId}`,
                type: "post",
                data: {"title": title, "content": content}
            }, (taskObj) => {
                handleExit()
                dispatch(toastActions.handleToastOpt({
                    msg:
                        <div>
                            <span style={{color:"#DADCE1", fontWeight:"800"}}>안내</span>
                            <span>작성한 노트는 <label>관라자 승인 후 게시</label>됩니다. 관련사항은 <label>마이페이지 > 내가 쓴 노트</label>에서 확인하실 수 있습니다.</span>
                        </div>,
                    open: true
                }))

                dispatch(modalActions.changePostOpen({open: false, dataInfo:{}}))
                dispatch(mainDataActions.handleReload())
            })
        }
    }

    const handleEditCompleteBtn = () => {
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
            fetchTasks({
                url : `http://explorer-cat-api.p-e.kr:8080/api/v1/post/update/${dataInfo.id}`,
                type: "post",
                data: {"title": title, "content": content}
            }, (taskObj) => {
                handleExit()
                dispatch(toastActions.handleToastOpt({msg:"수정을 완료했습니다", open:true}))
                dispatch(modalActions.changePostOpen({open: false, dataInfo:{}}))
                dispatch(mainDataActions.handleReload())
            })
        }
    }

    const handleTextAreaEvt = (e) => {
        setContent(e.target.value)
    }

    return (

        <>
            <div className={open ? classes.box : classes.unBox}>
            <div className={classes.head}>
                <img onClick={handleExit} src={"/images/icons/exit.png"}/>
                <span>노트 작성</span>
                {dataInfo.author ?
                    <label onClick={handleEditCompleteBtn}>수정</label> :  <label onClick={handleCompleteBtn}>완료</label>}
            </div>
            <div className={classes.body}>
                <div onClick={handleOpenCategory} className={classes.categoryBox}>
                    <span>{category ? category : "노트의 카테고리를 선택해 주세요."}</span>
                    <img src={"/images/icons/prevBtn.png"}/>
                </div>
                <div className={classes.contentBox}>
                    <div className={classes.questionBox}>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder={"질문을 입력하세요"} />
                    </div>
                    <div className={classes.answerBox}>
                        <textarea onChange={(e) => handleTextAreaEvt(e)} value={content} placeholder={"질문을 대한 답변을 입력하세요."} />
                    </div>
                </div>
            </div>
            </div>
            <WriteCategoryWrapper setCateogry={handleSetCategory} activeNum={categoryId}/>
        </>
    )
}

export default Write
