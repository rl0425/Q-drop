import { useState, useCallback } from 'react';
import axios from "axios";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODAxNzYyMDcsImV4cCI6MTY4MDc4MTAwNywiaXNzIjoidGVzdCIsInN1YiI6InJsMDQyNUBuYXZlci5jb20ifQ.B_Or_wcOO29kibHx0Bed5q59jkPsFbdU-bj_YuQKFo4"
    // const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODAwMTcwOTEsImV4cCI6MTY4MDYyMTg5MSwiaXNzIjoidGVzdCIsInN1YiI6InNxbHN0eWxlQGtha2FvLmNvbSJ9.U3zdRtjxJkLWCjKciqH40RneZQYPMWcN8CN6HOYzEUQ`

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        const header ={"Authorization":`Bearer ${token}`}
        // if (requestConfig.header === true) {
        //     header['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzgwMzIxNzYsImV4cCI6MTY3ODYzNjk3NiwiaXNzIjoidGVzdCIsInN1YiI6InNxbHN0eWxlQGtha2FvLmNvbSJ9.wulLuDasOKkP1iqwyQdQonZ-kxa8DBLXrJJUQHrsaSk`
        // }

        if (requestConfig.type){
            try {
                axios({
                    url: requestConfig.url,
                    method: requestConfig.type,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: header,
                    // withCredentials:true,
                    data: requestConfig.data || null
                })
                    .then(function a(response) {
                        if(requestConfig.type === "delete"){
                            applyData(true);
                        }
                        else {
                            applyData(response.data);
                        }

                        setIsLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setError(error);
                        setIsLoading(false);
                    });
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }
        }
        else {
            try {
                // axios.get(requestConfig.url, {
                //     headers: header
                // })
                axios({
                    url: requestConfig.url,
                    method: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: {
                        "Authorization":`Bearer ${token}`
                    },
                    // withCredentials:true,
                    data: requestConfig.data || null
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

