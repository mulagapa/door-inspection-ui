import axios from "axios";
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { useEffect } from "react";
import { auth } from '../common/auth-util'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  }
}));


export const UpdateUserPassword = (props) => {

  const [email, setEmail] = useState('');
  const [current_password, setCurrentPassword] = useState('')
  const [new_password, setNewPassword] = useState('')
  const [confirm_new_password, setConfirmNewPassword] = useState('')
  const cookies = new Cookies();
  const classes = useStyles();
  const navigate = useNavigate();
  const cookie = new Cookies();

  console.log(props);
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (new_password !== confirm_new_password) {
      console.error("Passwords do not match");
      alert("Passwords Don't match. Please Retry");
      return;
    }
    console.log(email);
    console.log(current_password);
    console.log(new_password);
    console.log(confirm_new_password);
    axios.put('http://127.0.0.1:5000/api/lockshop/update', {
      "authorization": {
        "email": email, "current_password": current_password,
        "new_password": new_password
      }
    }).then(response => {
      navigate("/form");
      window.location.reload();
    }).catch(error => {
      console.log('Error in Update Password : ', error)
      alert('Update password failed! Incorrect Password')
    })
  }

  useEffect(() => {
    setEmail(auth.getEmail())
  }, [])

  const handleForgotClick = (e) => {
    //navigate("/forgot");
    console.log("Forgot is not implemented yet!!");
    alert("Forgot is not implemented yet!!");
  }

  return (
    <>
      {/* <form className={classes.root} noValidate autoComplete="off"> */}
      <div className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '75vh'
        }}>
        <TextField
          id="password"
          label="Password *"
          type="password"
          value={current_password}
          variant="filled"
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
        <TextField
          id="newpassword"
          label="New Password *"
          type="password"
          value={new_password}
          variant="filled"
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <TextField
          id="confirmnewpassword"
          label="Confirm New Password *"
          type="password"
          value={confirm_new_password}
          variant="filled"
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />

        {/* </form> */}
        <Button variant="contained" color="primary" style={{ marginTop: '10px', width: '200px' }} onClick={handleUpdatePassword}>
          Update Password
        </Button>
        <span>
          <Button variant="contained" color="secondary" style={{ marginTop: '30px', width: '200px' }} onClick={handleForgotClick}>Forgot Password?</Button>
        </span>
      </div>
    </>
  )
}