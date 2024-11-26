import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
    let Comp = props.Comp;
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('user-token')){
            navigate('/signin');
        } 
    },[]);
    return(
        <div>
            <Comp />
        </div>
    );
}

export default Protected;