import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import uscLogo from '../common/uscLogo.json';
import '../Header.css'
import Cookies from 'universal-cookie';
import { Logout } from './Logout';
import { UpdateUserPassword } from './UpdateUser';

const Header = () => {

  const cookies = new Cookies();
  var parseJwt = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  return (
    <>
      <Navbar expand="lg" className='usc-header'>
        {/* <Container> */}
        <Navbar.Brand href="./">
          <img
            alt=""
            src={uscLogo.logoURL}
            width="200"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {
          (cookies.get('jwt_token')) ?
            <Navbar.Brand href="./form">
              {/* {window.bundle.common.appTitle} */}
              Edit
            </Navbar.Brand>
            : <></>
        }

        {
          (cookies.get('jwt_token'))?(<>
          <Navbar.Brand onClick={Logout} href="./">Logout</Navbar.Brand>
          <Navbar.Brand href="./update">Update</Navbar.Brand>
          </>
          ):
          <Navbar.Brand href="./login">
            Login
          </Navbar.Brand>
        }
        {
          (cookies.get('jwt_token') &&(
            parseJwt(cookies.get('jwt_token')).email === 'mulagapa@usc.edu' || parseJwt(cookies.get('jwt_token')).email === 'komma@usc.edu' || 
            parseJwt(cookies.get('jwt_token')).email === 'vibhavsh@usc.edu')) ?
            <Navbar.Brand href="./register">
              Register
            </Navbar.Brand>:
            <></>
        }

        {/* </Container> */}
      </Navbar>
    </>


  );
}

export default Header;