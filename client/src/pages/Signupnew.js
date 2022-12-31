import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registerUser } from "../store/reducers/UserReducer";
import userIcon from '../Images/user1.png';
import './login.css';

const Signupnew = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var obj = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        Todos: []
    };

    function setData(e) {
        e.preventDefault();


        if (firstname !== "" && lastname !== "" && username !== "" && password !== "") {
            dispatch(registerUser(obj));
            setFirstname('');
            setLastname('');
            setUsername('');
            setPassword('');
            navigate('/');
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
                            id="fname"
                            type="text"
                            name="Firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="First Name" />
                        <input
                            id="lname"
                            type="text"
                            name="Lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Last Name" />
                        <input
                            id="uname"
                            type="text"
                            name="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username" />
                        <input
                            id="pass"
                            type="password"
                            name="Password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <input onClick={setData} type="submit" name="" value="Signup" />
                </form>
                <div className="text-center">
                    <Link className="LinkTxt" to="/">Login</Link>
                </div>
            </div>
        </>
    )
}

export default Signupnew;