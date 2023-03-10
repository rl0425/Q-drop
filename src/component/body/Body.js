import {Fragment, useEffect, useState} from "react";
import BodyHead from "./Main/BodyHead";
import BodyContents from "./Main/BodyContent/BodyContents";
import useHttp from "../../hooks/use-http";

function Body(){
    const [tasks, setTasks] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            setTasks(tasksObj);
        };

        fetchTasks(
            { url: 'http://explorer-cat-api.p-e.kr:8080/api/v1/category/main' },
            transformTasks
        );
    }, [fetchTasks]);

    if(isLoading){
        return <div></div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        return (
            <Fragment>
                <BodyHead data={tasks}/>
                <BodyContents data={tasks}/>
            </Fragment>
        )
    }

}

export default Body
