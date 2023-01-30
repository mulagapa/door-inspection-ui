import axios from "axios";
import React, {useState} from "react";
import Cookies from 'universal-cookie';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Redirect } from 'react-router';

export const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        axios.post('http://127.0.0.1:5000/api/lockshop/login', {
            "autherization": {"username": username ,"password" : password}
        }).then(response => {
            // Set cookie with expiry time 30 minutes
            cookies.set('jwt_token', response.data.result.token, { path: '/', expires: new Date(Date.now()+30*60*1000)});
            console.log("jwt cookie is :", cookies.get('jwt_token'))
            navigate("/");
            window.location.reload();
        }).catch(error => {
            console.log('Error in Login : ', error)
            alert('Login Failed! Incorrect username or password.')
        })
    }

    return (
        <>
            <div class="container">
            <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label for="username">Username</label><br/>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username"/><br/>
                    <label for="password">Password</label><br/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password"/><br/><br/>
                    <button type="submit">Log In</button>
                </form><br />
                Already Registered?<a href="./Register">Register here</a><br/>
                <a href="./">Forgot Username/Password</a>
            </div>
        </>
    )
}