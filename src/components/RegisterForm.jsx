import React, {useState} from "react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(confirmPass);
    }

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