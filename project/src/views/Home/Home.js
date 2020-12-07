import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useAuth } from "../../corp-auth.js";
import { NavBar } from '../../components/NavBar';

import { Button, Row, Col, Container } from 'react-bootstrap';

const Home = props => {
  let history = useHistory();
  let auth = useAuth();
console.log(props.userAttr["given_name"])
  return (
    <>
      < NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']}/>
      <Container>
      <Row className="mt-4">
        <h1 className="display-4">Hello, {props.userAttr["given_name"]} {props.userAttr["family_name"]} </h1>
      </Row>
      Here will be our app
      </Container>
    </>
  )
}


export default Home;
