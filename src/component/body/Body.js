import {Fragment, useEffect, useState} from "react";
import BodyHead from "./Main/BodyHead";
import BodyContents from "./Main/BodyContent/BodyContents";
import useHttp from "../../hooks/use-http";
import MemoizedBodyContents from "./Main/BodyContent/BodyContents";
import {useDispatch} from "react-redux";
import {mainDataActions} from "../../store/mianData-slice";

function Body(){
    const [mainData, setMainData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const dispatch = useDispatch()

    useEffect(() => {
        const handleMainData = (tasksObj) => {
            setMainData(tasksObj);
        };

        const handleCategoryData = (tasksObj) => {
            // tasksObj[0].bookmark_sub_categories[0].selected = true
            // tasksObj[0].bookmark_sub_categories[2].selected = true
            // tasksObj[0].bookmark_sub_categories[4].selected = true
            // tasksObj[1].bookmark_sub_categories[0].selected = true
            // tasksObj[1].bookmark_sub_categories[1].selected = true
            // tasksObj[1].bookmark_sub_categories[3].selected = true
            // tasksObj[1].bookmark_sub_categories[5].selected = true
            // tasksObj[2].bookmark_sub_categories[0].selected = true
            // tasksObj[3].bookmark_sub_categories[0].selected = true
            dispatch(mainDataActions.addCategoryData({data:tasksObj}))

            setCategoryData(tasksObj);
        };

        // Main 데이터
        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' },
            handleMainData
        );

        // 카테고리 관련 데이터
        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/sub/bookmark?option=all', header:true},
            handleCategoryData
        );

    }, [fetchTasks]);

    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        console.log("mainData= ", mainData)
        console.log("categoryData= ", categoryData)

        return (
            <Fragment>
                <BodyHead data={mainData} categoryData={categoryData}/>
                <BodyContents data={mainData} categoryData={categoryData}/>
            </Fragment>
        )
    }

}

export default Body
