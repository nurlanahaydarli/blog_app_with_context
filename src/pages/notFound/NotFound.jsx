import React from "react";
import {useNavigate} from "react-router-dom";
import {useTitle} from "../../hooks/UseTitle";

const NotFound=()=>{
    let navigate = useNavigate()
    useTitle(`Not Found | Blog app`);
    return(
        <>
            <section >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 center_el">
                            <div className="col-sm-12 col-sm-offset-1 text-center">
                                <div className="bg-img">
                                    <h1 className="text-center">404</h1>
                                </div>
                                <div className="content">
                                    <h3 className="h2">Page not found!</h3>
                                    <p>are you sure you want to be here?</p>
                                    <button onClick={()=>navigate("/")} className="link">Go to Home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default NotFound