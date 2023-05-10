import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
  },
}
}));


export const GoogleLogin = (props) => {

    const cookies = new Cookies();
    const classes = useStyles();
    const navigate = useNavigate();

    console.log (props);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://127.0.0.1:5000/api/lockshop/glogin').then(response => {
            // Set cookie with expiry time 30 minutes
            cookies.set('jwt_token', response.data.result.token, { path: '/', expires: new Date(Date.now()+30*60*1000)});
            ((response.data.result.message).slice(-5) == "True}") ?
            navigate("/update"):
            window.location.reload();
        }).catch(error => {
            console.log('Error in Login : ', error)
            alert('Login Failed! Incorrect email or password.')
        })
    }

    return (
        <>
        {/* <form className={classes.root} noValidate autoComplete="off"> */}
        <div className={classes.root} 
              style={{ display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'center', 
               justifyContent: 'center',
               height:'75vh'
              }}>
        <Button variant="contained" color="primary" style={{ marginTop:'10px', width:'200px'}} onClick={handleSubmit}>
          Log In
        </Button>
        {/* <span>
        <Button variant="contained" color="secondary" style={{ marginTop:'30px', marginLeft:'30px', width:'200px'}} onClick={handleRegisterClick}>Register Here</Button>
        </span> */}
        </div>
        </>
    )
}