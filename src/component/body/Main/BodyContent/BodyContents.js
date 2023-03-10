import {v4 as uuidv4} from "uuid";
import Content from "./Content";
import classes from "./BodyContents.module.css"
import SwipeableViews  from 'react-swipeable-views';
import {useState} from "react";

function BodyContents(props){
    const [pageIndex, setIndex] = useState(0);
    const handleIndexChange = (index) => {
        setIndex(index);
    };

    return (
        <div className={classes.box}>
            <SwipeableViews index={pageIndex} onChangeIndex={handleIndexChange}>
                {props.data.map((ele) => {
                    return (
                        <Content data={ele} key={uuidv4()}/>
                    )
                })}
            </SwipeableViews>
        </div>
    )
}

export default BodyContents
