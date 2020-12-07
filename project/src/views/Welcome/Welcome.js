import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Welcome.css';
import Logo from '../../logo_transparent.png';
import { ReactComponent as AdminButton} from '../../components/Assets/admin.svg';

import { SignIn } from '../../components/SignIn';
import { FederatedAuth } from '../../components/FederatedAuth';
const Welcome = props => {
  const [userLogin, setUserLogin] = useState(true);
  return (
    <>
      <Row className="welcome_page">
        <Col xs={"auto"}>
        <img src={Logo} className="welcome_logo" alt="clear logo"/>
        </Col>
        <Col xs={4} className="pt-4">
              <SignIn show={!userLogin}/>
              <FederatedAuth show={userLogin}/>
        </Col>
      </Row>
      <Button variant="admin" onClick={() => setUserLogin(!userLogin)}><AdminButton /></Button>
    </>
  );
}

export default Welcome;
