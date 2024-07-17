import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from './Component/Home';
import About from './Component/About';
import Signin from './Component/Signin';
import Signup from './Component/Signup';
import Contact from './Component/Contact';
import Logout from './Component/Logout';
import Admin from './Component/Admin';
import Inquiry from "./Component/Inquiry";
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/inquiry" element={<Inquiry/>} />
      </Routes>
    </>
  );
}

export default App;
