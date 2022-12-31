import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Loginnew from "./pages/Loginnew";
import Signupnew from "./pages/Signupnew";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginnew />} />
        <Route path='/signup' element={<Signupnew />} />
        <Route path='/dashboard' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App; 