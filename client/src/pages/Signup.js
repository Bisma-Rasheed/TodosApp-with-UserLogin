import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registerUser } from "../store/reducers/UserReducer";

const Signup = () => {
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
        password: password
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
        else{
            alert('input fields must not be empty');
        }
    }

    return (
        <>
            <span><nav className="navbar"><Link to="/" style={{ color: "black" }}>Dashboard</Link></nav>
                <nav className="navbar"><Link to="/signup" style={{ color: "white" }}>Signup</Link></nav>
            </span>

            <div className="main_div">
                <form>
                    <label htmlFor="firstname">Firstname</label>
                    <input name="firstname"
                        type="text"
                        placeholder="Enter your firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}></input>
                    <br />
                    <label htmlFor="lastname">Lastname</label>
                    <input name="lastname"
                        type="text"
                        placeholder="Enter your lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}></input>
                    <br />
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
                    <button onClick={setData}>Register</button>
                    <br /><br />
                    <Link to="/" style={{ color: "white" }}>Login</Link>
                </form>
            </div>
        </>
    )
}

export default Signup;