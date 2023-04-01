import {createContext, Fragment, useEffect, useMemo, useState} from "react";
import BodyHead from "./Main/BodyHead";
import BodyContents from "./Main/BodyContent/BodyContents";
import useHttp from "../../hooks/use-http";
import MemoizedBodyContents from "./Main/BodyContent/BodyContents";
import {useDispatch, useSelector} from "react-redux";
import {mainDataActions} from "../../store/mianData-slice";
import axios from "axios";


function Home(){
    const dispatch = useDispatch()

    const [mainData, setMainData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    // const { isLoading, error, sendRequest: fetch } = useHttp();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    // subcategory 변경 시 리렌더링 위한 selector
    const subs = useSelector((state) => state.main.subCategoryList)
    const reloadSwitch = useSelector((state) => state.main.reloadSwitch)

    console.log("aaa1")

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODAxNzYyMDcsImV4cCI6MTY4MDc4MTAwNywiaXNzIjoidGVzdCIsInN1YiI6InJsMDQyNUBuYXZlci5jb20ifQ.B_Or_wcOO29kibHx0Bed5q59jkPsFbdU-bj_YuQKFo4"
    const header ={"Authorization":`Bearer ${token}`}

    useEffect(() => {
        Promise.all([
            axios.get('http://explorer-cat-api.p-e.kr:8080/api/v1/category/main',{
                headers: header
            }),
            axios.get('http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=all',{
                headers: header
            }),
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
    }, [subs])


    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        return (
            <Fragment>
                <BodyHead subs={subs} data={mainData} categoryData={categoryData} reloadSwitch={reloadSwitch}/>
                <BodyContents subs={subs} data={mainData} categoryData={categoryData} reloadSwitch={reloadSwitch}/>
            </Fragment>
        )
    }

}


export default Home
