import { useState, useCallback } from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 쿠키 관련
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const token = cookies.jwt || ""

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        const header = token ? {"Authorization":`Bearer ${token}`} : ""

        if (requestConfig.type){
            try {
                const opt = {
                    url: requestConfig.url,
                    method: requestConfig.type,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: requestConfig.data || null
                }

                if(header){
                    opt.headers = header
                }

                axios(opt)
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
                const opt = {
                    url: requestConfig.url,
                    method: "get",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: requestConfig.data || null
                }

                if(header){
                    opt.headers = header
                }

                axios(opt)
                    .then(response => {
                        applyData(response.data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log(error)
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

