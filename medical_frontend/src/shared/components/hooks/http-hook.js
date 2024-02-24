import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async(url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            try{
                const response = await fetch(url, {
                    method,
                    headers,
                    body,
                    signal: httpAbortCtrl.signal
                });
                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );
                
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                return responseData;
            }
            catch(err) {
                setIsLoading(false);
                setError(err.message || "Something went wrong, please try again.");
                throw err;
            }
        }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};