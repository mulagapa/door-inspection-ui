import axios from "axios";
import React, {useState} from "react";

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        axios.post('http://127.0.0.1:5000/api/lockshop/login', {
            "autherization": {"username": username ,"password" : password}
        }).then(response => {
            console.log("JWT Token", response.data.result.token)
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