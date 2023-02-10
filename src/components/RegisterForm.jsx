import React, {useState} from "react";
import axios from "axios";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Login } from "./LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const Register = () => {
    const [email, setEmail] = useState('');
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles ();
    const navigate = useNavigate();
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
          console.error("Passwords do not match");
        } else {
          const newUser = { email, password };
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
            console.log (res.data);
            setMessage(res.data.result.message);
            await sleep (3000);
            //const data = await res.json ();
            if (res.data.code === 200) {
              console.log ("success registeration");
            } else {
              console.log ("Fail registeration");
            }

           navigate("/login");
          
          } catch (err) {
            console.error("error occured in register", err);
          }
        }
      };

    return (<>{
      message ==''?
      <div style={{margin:"100px"}}>
        <form className={classes.root}  noValidate autoComplete="off">
            <div>
              <TextField
                id="email"
                label="email"
                value={email}
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              />
              </div>
              <div>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
        
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Register
            </Button>
      </form>
    </div>:
        <Typography variant="h5" gutterBottom>
                  {message + " Redirecting to Login"}
        </Typography>
    }</>
    );
}