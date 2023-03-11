import {Fragment} from "react";
import Head from "./head/Head";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import CategoryModal from "./body/category/CategoryModal";
import classes from "./Main.module.css"
import {useSelector} from "react-redux";
import Post from "./body/postOpt/Post";

function Main(){
    const categoryOpen = useSelector((state) => state.category.open)
    const postOpen = useSelector((state) => state.modal.postOpen)
    console.log("postOpen = ", postOpen)

    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <Head />
            </div>
            <div className={classes.body}>
                <Body />
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
            {categoryOpen && <CategoryModal />}
            {postOpen && <Post />}
        </div>
    )
}

export default Main
