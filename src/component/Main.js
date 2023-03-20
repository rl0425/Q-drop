import Head from "./head/Head";
import Footer from "./footer/Footer";
import classes from "./Main.module.css"
import CategoryModalWrapper from "./body/category/CategoryModalWrapper";
import PostWrapper from "./body/postOpt/PostWrapper";
import HomeWrapper from "./body/HomeWrapper";
import MyWrapper from "./My/MyWrapper";
import ModalSetWrapper from "./modal/ModalSetWrapper";
import SearchWrapper from "./search/SearchWrapper";
import {useSelector} from "react-redux";

function Main(){
    const sector = useSelector((state) => state.sector.type);
    console.log("sector = ", sector)

    return (
        <div className={classes.box}>
            {sector === "home" ?
                <>
                    <div className={classes.head}>
                            <Head />
                        </div>
                    <div className={classes.body}>
                        <HomeWrapper />
                    </div>

                </>
            :
                <MyWrapper />
            }
            <div className={classes.footer}>
                <Footer />
            </div>

            <SearchWrapper />
            <ModalSetWrapper />
        </div>
    )
}

export default Main
