import React from 'react';
import './Guest.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../logo_transparent.png';
import { FederatedAuth } from '../../components/FederatedAuth';

const Guest = props => {

  return (
    <Row className="welcome_page">
      <Col xs={"auto"}>
        <img src={Logo} className="logo" alt="clear logo"/>
      </Col>
      <Col xs={4}>
        <FederatedAuth/>
      </Col>
    </Row>
  );
}

export default Guest;
