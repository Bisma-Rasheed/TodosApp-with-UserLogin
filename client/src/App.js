import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Signup, addEmployees } from "./store/reducers/UserReducer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
//import Login from '../src/pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import { registerUser } from "./store/reducers/UserReducer";

const App = () => {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(registerUser());
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

/*
const App = () => {

  const dispatch = useDispatch();
  const users = useSelector((state)=>state.userSlice.users);
  const [name, setName] = useState('');
  const [ename, setEName] = useState('');

  const addUser = (e) => {
    e.preventDefault();
    dispatch(Signup(name));
    setName('');
    //console.log(users);
  }

  const addEmployee = (e) => {
    e.preventDefault();
    dispatch(addEmployees(ename));
    setEName('');
  }
  return(
    <>
      <input type="text" 
      placeholder="Enter your name" 
      value={name} onChange={(e)=>setName(e.target.value)}/>
      <button onClick={addUser}>Add User</button>

      <input type="text" 
      placeholder="Enter your ename" 
      value={ename} onChange={(e)=>setEName(e.target.value)}/>
      <button onClick={addEmployee}>Add Employee</button>
    </>
  )
} 
*/ 