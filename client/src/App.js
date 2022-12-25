import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';

const App = () => {

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