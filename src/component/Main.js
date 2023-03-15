import Head from "./head/Head";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import classes from "./Main.module.css"
import {useSelector} from "react-redux";
import CategoryModalWrapper from "./body/category/CategoryModalWrapper";
import PostWrapper from "./body/postOpt/PostWrapper";

function Main(){
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
            <CategoryModalWrapper/>
            <PostWrapper />
        </div>
    )
}

export default Main
