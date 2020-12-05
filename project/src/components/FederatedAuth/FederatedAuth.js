import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../../corp-auth.js";

const FederatedAuth = (props) => {

  let auth = useAuth();

  async function federatedSignIn() {
    await auth.federated();
  }


  return props.show ? (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Welcome</Card.Title>
        <Card.Text>
          In order to proceed please click to authenticate
        </Card.Text>
        <Button variant="green" onClick={federatedSignIn}>Federated Sign In</Button>
      </Card.Body>
    </Card>
  ) : '';
};

export default FederatedAuth;
