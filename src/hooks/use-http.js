import { useState, useCallback } from 'react';
import axios from "axios";


const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        const header ={Authorization:null}

        // if (requestConfig.header === true) {
        //     // header['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzgwMzIxNzYsImV4cCI6MTY3ODYzNjk3NiwiaXNzIjoidGVzdCIsInN1YiI6InNxbHN0eWxlQGtha2FvLmNvbSJ9.wulLuDasOKkP1iqwyQdQonZ-kxa8DBLXrJJUQHrsaSk`
        // }

        if (requestConfig.type){
            try {
                // const dataType = requestConfig.dataType

                // axios.post(requestConfig.url, {[dataType]: requestConfig.data})
                axios({
                    url: requestConfig.url,
                    method: requestConfig.type,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                })
                    .then(function a(response) {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }
        }
        else {
            try {
                axios.get(requestConfig.url, {
                    headers: header
                })
                    .then(response => {
                        applyData(response.data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log("Error= ", error)
                        setError(error);
                        setIsLoading(false);
                    });
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }
        }
        setIsLoading(false);

    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;

