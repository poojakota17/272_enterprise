import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Welcome.css';
import Logo from '../../logo_transparent.png';

import { SignIn } from '../../components/SignIn';
import { SignUp } from '../../components/SignUp';
import { FederatedAuth } from '../../components/FederatedAuth';
const Welcome = props => {

  return (
    <Row className="welcome_page">
    <Col xs={"auto"}>
    <img src={Logo} className="logo" alt="clear logo"/>
    </Col>
    <Col xs={4}>
      <Tabs defaultActiveKey="signin" transition={false} className="nav-fill rounded" id="uncontrolled-tab-example">
        <Tab eventKey="signin" title="Sign In">
          <SignIn/>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUp/>
        </Tab>
        <Tab eventKey="federated" title="Federated">
          <FederatedAuth/>
        </Tab>
      </Tabs>
    </Col>
    </Row>
  );
}

export default Welcome;
