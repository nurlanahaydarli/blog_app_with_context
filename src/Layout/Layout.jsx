import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";

const Layout=()=>{
    return(
        <>
            <Outlet />
        </>
    )
}
export default Layout