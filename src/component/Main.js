import Head from "./head/Head";
import Footer from "./footer/Footer";
import classes from "./Main.module.css"
import CategoryModalWrapper from "./body/category/CategoryModalWrapper";
import PostWrapper from "./body/postOpt/PostWrapper";
import HomeWrapper from "./body/HomeWrapper";
import MyWrapper from "./My/MyWrapper";

function Main(){
    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <Head />
            </div>
            <div className={classes.body}>
                <HomeWrapper />
                <MyWrapper />
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
