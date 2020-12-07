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
  let firstName = (props.userAttr) ? props.userAttr["given_name"] : 'Friend'
  let lastName = (props.userAttr) ? props.userAttr["family_name"] : ''

  return (
    <>
      < NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']}/>
      <Container>
        <Row className="mt-4">
          <h1 className="display-4">Welcome, {firstName} {lastName} </h1>
        </Row>
          Here will be our app
      </Container>
    </>
  )
}


export default Home;
