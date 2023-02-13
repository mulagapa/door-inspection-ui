import React, {useState} from "react";
import axios from "axios";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Login } from "./LoginForm";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }, card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    centerConetent:{height:'100%',display: 'flex', alignItems: 'center', justifyContent: 'center' },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  },
}));


export const Register = () => {

    const [email, setEmail] = useState('');
    const cookies = new Cookies();
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
          alert ("Passwords Don't match retry");
          return;
        }
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
          
          cookies.remove("jwt_token")
          window.location.reload();
        } catch (err) {
          console.error("error occured in register", err);
        }
  };

    return (<div style={{ height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{
      message === ''?
      <div>
        <Card styles={{ width:'500px'}} className={classes.card} >
        <CardContent>
          <Typography variant="h6" style={{marginTop:'100px'}}>
            Register User
          </Typography>
              <TextField
                id="email"
                label="email*"
                value={email}
                variant="filled"
                className={classes.textField}
                onChange={(event) => setEmail(event.target.value)}
              /><br/>
              <TextField
                id="password"
                label="Password*"
                type="password"
                variant="filled"
                value={password}
                className={classes.textField}
                onChange={(event) => setPassword(event.target.value)}
              /><br/>
              
              <TextField
                id="confirmPassword"
                label="Confirm Password*"
                type="password"
                variant="filled"
                value={confirmPassword}
                className={classes.textField}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    </div>:
        <Typography variant="h5" gutterBottom>
                  {message + " Redirecting to Login"}
        </Typography>
    }</div>
    );
}