import React, {  useRef, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const FederatedAuth = (props) => {

  async function federatedSignIn() {
    await Auth.federatedSignIn({provider: 'okta'}).then((result) => console.log(result)).catch((err) => console.log(err));
  }

  async function cognitoSignIn() {
    await Auth.signIn('m.jack@techcorp.com', 'Abcd@123')
  }

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Welcome</Card.Title>
        <Card.Text>
          In order to proceed please click to authenticate
        </Card.Text>
        <Button variant="green" onClick={federatedSignIn}>Federated Sign In</Button>
        <Button variant="warning" onClick={cognitoSignIn}>Cognito Sign In</Button>
      </Card.Body>
    </Card>
  );
};

export default FederatedAuth;
