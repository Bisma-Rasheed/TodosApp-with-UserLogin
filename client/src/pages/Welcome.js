
import React from "react";
import {Link}  from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Welcome = () => {
    
    let navigate = useNavigate();
    const {currentUser, loader, isError} = useSelector((state) => state.userSlice);

    return !isError ? (!loader ?
        <>
        <nav className="navbar">{currentUser.firstname} {currentUser.lastname}<Link to="/">Log out</Link></nav>
            <div>
                <p className="p1">Welcome {currentUser.firstname} {currentUser.lastname}</p>
                <p>Your User id: {currentUser.username}</p>
            </div>
        </> :
        <Loader/>) : (navigate('/'))
    
}

export default Welcome;