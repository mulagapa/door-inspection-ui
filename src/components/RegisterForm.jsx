import React, {useState} from "react";
import axios from "axios";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPass) {
          console.error("Passwords do not match");
        } else {
          const newUser = { username, email, password };
          try {
            const config = {
              headers: {
                "Content-Type": "application/json"
              }
            };
            const body = JSON.stringify(newUser);
            const res = await axios.post(
              "http://127.0.0.1:5000/api/lockshop/register",
              body,
              config
            );
            const data = await res.json ();
            console.log ("Registration status", data);
          } catch (err) {
            console.error(err.response.data);
          }
        }
      };

    return (
        <>
            <div class="container">
                <h2>Reister User</h2>
                <form onSubmit={handleSubmit}>
                    <label for="username">Username</label><br/>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username"/><br/>
                    <label for="email">Email</label><br/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email"/><br/>
                    <label for="password">Password</label><br/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password"/><br/>
                    <label for="confirmPass">Confirm Password</label><br/>
                    <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="confirmPass" placeholder="******" id="confirmPass" name="confirmPass"/><br/><br/>
                    <button type="submit">Register User</button>
                </form><br/>
                Already have an account?<a href="./login">Log In</a><br/>
            </div>
        </>
    )
}