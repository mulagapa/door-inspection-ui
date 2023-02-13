import axios from "axios";
import React, {useState} from "react";
import Cookies from 'universal-cookie';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
  },
}
}));


export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const cookies = new Cookies();
    const classes = useStyles();
    const navigate = useNavigate();

    console.log (props);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        axios.post('http://127.0.0.1:5000/api/lockshop/login', {
            "authorization": {"email": email ,"password" : password}
        }).then(response => {
            // Set cookie with expiry time 30 minutes
            cookies.set('jwt_token', response.data.result.token, { path: '/', expires: new Date(Date.now()+30*60*1000)});
            // console.log("jwt cookie is :", cookies.get('jwt_token'))
            ((response.data.result.message).slice(-5) == "True}") ?
            navigate("/update"):
            navigate("/form");
            window.location.reload();
        }).catch(error => {
            console.log('Error in Login : ', error)
            alert('Login Failed! Incorrect email or password.')
        })
    }

    const handleRegisterClick = (e) => {
        navigate("/register");
    } 

    const handleForgotClick = (e) => {
        //navigate("/forgot");
        console.log ("Forgot is not implemented yet!!");
        alert("Forgot is not implemented yet!!");
    }

    return (
        <>
        {/* <form className={classes.root} noValidate autoComplete="off"> */}
        <div className={classes.root} 
              style={{ display: 'flex', 
               flexDirection: 'column', 
               flexDirection: 'column', 
               alignItems: 'center', 
               justifyContent: 'center',
               height:'75vh'
              }}>
          <TextField
            id="email"
            label="email *"
            value={email}
            variant="filled"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="Password *"
            type="password"
            value={password}
            variant="filled"
            onChange={(event) => setPassword(event.target.value)}
          />
        {/* </form> */}
        <Button variant="contained" color="primary" style={{ marginTop:'10px', width:'200px'}} onClick={handleSubmit}>
          Log In
        </Button>
        <span>
        <Button variant="contained" color="secondary" style={{ marginTop:'30px', width:'200px'}} onClick={handleForgotClick}>Forgot Password?</Button>
        <Button variant="contained" color="secondary" style={{ marginTop:'30px', marginLeft:'30px', width:'200px'}} onClick={handleRegisterClick}>Register Here</Button>
        </span>
        </div>
        </>
    )
}