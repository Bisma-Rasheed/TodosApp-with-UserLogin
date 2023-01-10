import React, { useEffect } from "react";
import { Link, redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Todos from "./Todos";

const Welcome = () => {

    let navigate = useNavigate();
    const { currentUser, loader, isError} = useSelector((state) => state.userSlice);

    return !isError ? (!loader ?
        <>
            <div className="upperdiv">
                <nav style={{ color: "black" }} className="navbar1">{currentUser.firstname} {currentUser.lastname}<Link style={{ color: "aliceblue" }} to="/">Log out</Link></nav>
                <span className="meridiv">
                    <div>
                        <p className="p1">Welcome {currentUser.firstname} {currentUser.lastname}</p>
                        <p>Your User id: {currentUser.username}</p>
                    </div>
                    <Todos />
                </span>
            </div>
        </> :
        <Loader />) : (navigate('/'))
        

}

export default Welcome;