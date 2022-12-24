
import React from "react";
import {Link}  from 'react-router-dom';
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Welcome = () => {
    
    const {currentUser, loader} = useSelector((state) => state.userSlice);

    return !loader ?
        <>
        <nav className="navbar">{currentUser.firstname} {currentUser.lastname}<Link to="/">Log out</Link></nav>
            <div>
                <p className="p1">Welcome {currentUser.firstname} {currentUser.lastname}</p>
                <p>Your User id: {currentUser.username}</p>
            </div>
        </> :
        <Loader/>
    
}

export default Welcome;