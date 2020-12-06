import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/nav_logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { ReactComponent as AdminButton} from '../../components/Assets/admin.svg';
import {
  useHistory
} from "react-router-dom";

import { useAuth } from "../../corp-auth.js";
import './NavBar.css';

const NavBar = (props) => {
  let history = useHistory();
  let auth = useAuth();
  const [groups, setGroups] = useState(props.groups)

  const adminLink = (groups && groups.includes('Admin')) ?  <Nav.Link href="/admin" ><AdminButton/></Nav.Link> :''
  const managerLink = (groups && groups.includes('Manager')) ?  <Nav.Link href="/manager" >Manager</Nav.Link> :''
  async function handleClick() {
    auth.logout(() => history.push("/"))
  }
  return (
    <Navbar variant="corp" collapseOnSelect expand="md" sticky="top">
      <Navbar.Brand href="/Home">
        <img src={Logo} className="navlogo" alt="clear logo"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/getdetails" >MyProfile</Nav.Link>
        <Nav.Link href="/feedback" >Feedback-Portal</Nav.Link>
        {managerLink}
        {adminLink}
        <Button variant="navbutton" onClick={handleClick} href="/">Log Out</Button>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
