import {Fragment, useEffect, useState} from "react";
import BodyHead from "./Main/BodyHead";
import BodyContents from "./Main/BodyContent/BodyContents";
import useHttp from "../../hooks/use-http";
import MemoizedBodyContents from "./Main/BodyContent/BodyContents";
import {useDispatch} from "react-redux";
import {mainDataActions} from "../../store/mianData-slice";
import axios from "axios";

function Body(){
    const [mainData, setMainData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    // const { isLoading, error, sendRequest: fetch } = useHttp();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        Promise.all([
            axios.get('http://explorer-cat-api.p-e.kr:8080/api/v1/category/main'),
            axios.get('http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=all'),
        ])
            .then(([mainData, categoryData]) => {
                setMainData(mainData.data);
                setCategoryData(categoryData.data);
                dispatch(mainDataActions.addCategoryData({ data: categoryData.data }));
            })
            .catch(error => {
                console.log('Error: ', error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        console.log("12312")
    }, [])


    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        console.log("mainData= ", mainData)

        return (
            <Fragment>
                <BodyHead data={mainData} categoryData={categoryData}/>
                <BodyContents data={mainData} categoryData={categoryData}/>
            </Fragment>
        )
    }

}

export default Body
