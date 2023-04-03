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

    const { isLoading, error, sendRequest: fetchData } = useHttp();
    const [isLoad, setIsLoad] = useState(false)

    const subs = useSelector((state) => state.main.subCategoryList)


    // subcategory 변경 시 리렌더링 위한 selector
    const reloadSwitch = useSelector((state) => state.main.reloadSwitch)

    useEffect(() => {
        fetchData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/category/main`}, (obj) => {
            setMainData(obj);

            fetchData({url: `http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=all`}, (obj) => {
                setCategoryData(obj);
                dispatch(mainDataActions.addCategoryData({ data: obj }));

                setIsLoad(true)
            })
        })
    }, [subs])

    if(isLoad){
        return (
            <Fragment>
                <BodyHead subs={subs} data={mainData} categoryData={categoryData} reloadSwitch={reloadSwitch}/>
                <BodyContents subs={subs} data={mainData} categoryData={categoryData} reloadSwitch={reloadSwitch}/>
            </Fragment>
        )

    }


}


export default Home
