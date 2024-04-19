import {useEffect, useState} from "react";

export  const useFetchData=({
        requestFn,
        dependency = [],
        condition,
        onSuccess,
        onError,
    })=>{
    const [data,setData]=useState()
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState()

    useEffect(()=>{
        if (condition) return;
        const fetchData = async ()=>{
            setLoading(true)
            try{
                const response = await  requestFn();
                setData(response.data)
                onSuccess?.(response.data);

            }catch (err){
                setError(err);
                onError?.(err);
            }finally {
                setLoading(false)
            }
        }
        fetchData()

    },[...dependency])
    return {data,loading,error,setData}
}