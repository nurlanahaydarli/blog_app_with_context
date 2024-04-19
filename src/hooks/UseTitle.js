import {useLayoutEffect} from "react";

export  const useTitle=(title="My Blog app")=>{
    useLayoutEffect(() => {
        document.title = title;
    }, [title]);
}

