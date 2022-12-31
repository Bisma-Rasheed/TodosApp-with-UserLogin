import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { currentUser, fetchUser, loggingIn } from "../store/reducers/UserReducer";
import userIcon from '../Images/user.png';
import './login.css';

const Loginnew = () => {

    const dispatch = useDispatch();
    dispatch(loggingIn(false));
    dispatch(currentUser({}));
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var obj = {
        un: username,
        pw: password
    };

    const validate = (e) => {
        e.preventDefault();

        if (username !== '' && password !== '') {
            dispatch(fetchUser(obj));
            setUsername('');
            setPassword('');
            navigate('/dashboard');
        }
        else {
            alert('input fields must not be empty');
        }

    }

    return (
        <>
            <div className="loginBox">
                <img className="user" src={userIcon} height="100px" width="100px" />
                <h3>Sign-In</h3>
                <form>
                    <div className="inputBox">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input onClick={validate} type="submit" name="" value="Login" />
                </form>
                <div className="text-center">
                    <Link className="LinkTxt" to="/Signup">Sign-up</Link>
                </div>
            </div>
        </>
    )
}

export default Loginnew;