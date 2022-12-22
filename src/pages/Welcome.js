
import React from "react";
import {Link}  from 'react-router-dom';
import { useSelector } from "react-redux";

const Welcome = () => {
    
    const loggedInUser = useSelector((state) => state.userSlice.currentUser);

    return (
        <>
        <nav className="navbar">{loggedInUser.firstname} {loggedInUser.lastname}<Link to="/">Log out</Link></nav>
            <div>
                <p className="p1">Welcome {loggedInUser.firstname} {loggedInUser.lastname}</p>
                <p>Your User id: {loggedInUser.username}</p>
            </div>
        </>
    )
}

export default Welcome;