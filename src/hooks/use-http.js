import { useState, useCallback } from 'react';
import axios from "axios";


const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            axios.get(requestConfig.url, {
                headers: {
                    // 'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzgzODU1MTcsImV4cCI6MTY3ODk5MDMxNywiaXNzIjoidGVzdCIsInN1YiI6InNxbHN0eWxlQGtha2FvLmNvbSJ9.x8ZarTw6EZmRpbK24ynr1XRjmGRla9eAbbEj6JVUK-A`
                }
            })
                .then(response => {
                    applyData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
            });
        } catch (err) {
            setError(err.message || 'Something went wrong!');
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

