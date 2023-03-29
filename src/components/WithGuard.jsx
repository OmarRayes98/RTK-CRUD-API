// import { useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const WithGuard = ({children}) => {

    const {isLoggedIn} = useSelector((state) => state.auth)

    return (
    isLoggedIn ? children:<div>please log in first </div>
        )
}

export default WithGuard


/*const WithGuard = ({children}) => {

    //First way for Protection Route
    // const navigate = useNavigate();
    const {isLoggedIn} = useSelector((state) => state.auth)

    // useEffect(()=>{
    //     if(!isLoggedIn) navigate("/");

    // },[isLoggedIn , navigate])

    return (
    children
        )
}
*/