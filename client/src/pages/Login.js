import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { currentUser, loggingIn, registerUser } from "../store/reducers/UserReducer";

const Login = () => {

    const dispatch = useDispatch();
    dispatch(loggingIn(false));
    dispatch(currentUser({}));
    // for(var i=0;i<=1;i++){
    //     dispatch(registerUser());
    // }
    
    // useEffect(()=>{
    //     dispatch(registerUser());
    // },[]);
    //console.log(useSelector((state)=>state.userSlice.currentUser));
    const users = useSelector((state) => state.userSlice.users);
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var obj = {
        un: username,
        pw: password
    };

    const validate = (e) => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        alert(obj.un+ ' '+obj.pw)
        alert(users[0].username + ' '+users[0].password)
        if (users.length === 0) {
            alert('The username or password is incorrect');
        }

        for (var i = 0; i < users.length; i++) {
            alert('I am in loop')
            alert(users[i].username + ' ' + users[i].password)
            if (users[i].username === obj.un && users[i].password === obj.pw) {
                alert('I am in loop2')
                dispatch(loggingIn(true));
                dispatch(currentUser(users[i]));
                navigate('/dashboard');

                alert('successfully logged in')
                break;

            }
            else if (i === users.length - 1) {
                alert('username or password is incorrect'+users.length);
            }
        }
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