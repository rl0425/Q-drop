import {Fragment} from "react";
import Head from "./head/Head";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import CategoryModal from "./body/category/CategoryModal";
import classes from "./Main.module.css"
import {useSelector} from "react-redux";

function Main(){
    const open = useSelector((state) => state.category.open)

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
            <CategoryModal />
        </div>
    )
}

export default Main
