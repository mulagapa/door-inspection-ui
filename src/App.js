import React from 'react';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import localization from './localization/en-US.json';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Building from './components/Buildings';
import Format from './components/Format';
import { Register } from './components/RegisterForm';
import { Login } from './components/LoginForm';


function App() {
  window.bundle = localization;
  return (
    <>
      <Header />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            {/* <Route path="/buildings"  element = {<Building/>} /> */}
            <Route path="/form"  element = {<Format/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/register" element = {<Register/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
