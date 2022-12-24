import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { currentUser, fetchUser, loggingIn } from "../store/reducers/UserReducer";

const Login = () => {

    const dispatch = useDispatch();
    dispatch(loggingIn(false));
    dispatch(currentUser({}));

    //const users = useSelector((state) => state.userSlice.users);
    // const loggedInState = useSelector((state) => state.userSlice.isLoggedIn);
    // const currentUser = useSelector((state) => state.userSlice.currentUser);
    // const loader = useSelector((state)=>state.userSlice.loader);
    // const error = useSelector((state) => state.userSlice.error);
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var obj = {
        un: username,
        pw: password
    };

    const validate = (e) => {
        e.preventDefault();
        //console.log("hjghghgh")

        dispatch(fetchUser(obj));
        setUsername('');
        setPassword('');
        navigate('/dashboard');
        //console.log('hehe' + loggedInState);

        //const loggedInState = useSelector((state) => state.userSlice.isLoggedIn);
        // //console.log(loggedInState);
        // if (loggedInState === true) {
        //     console.log('i am here');
        //     alert('successfully logged in')
        //     navigate('/dashboard');
        // }
        // else if (error === "The username or password is incorrect") {
        //     console.log('i am here2');
        //     alert(error);
        // }

    }

    return (
        <>
            <span><nav className="navbar"><Link to="/" style={{ color: "white" }}>Dashboard</Link></nav>
                <nav className="navbar"><Link to="/signup" style={{ color: "black" }}>Signup</Link></nav>
            </span>
            <div className="main_div">
                <form action="/page">
                    <label htmlFor="username">Username</label>
                    <input name="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <br />
                    <button onClick={validate}>Login</button>
                    <br /><br />
                    <Link to="/signup" style={{ color: "white" }}>Signup</Link>
                </form>
            </div>

        </>
    )
}

export default Login;