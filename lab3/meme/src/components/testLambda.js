import React from 'react';
import Button from 'react-bootstrap/Button';


export default function TestLambda(props) {
  console.log(props)
  function handleSubmit() {
    console.log("you clicked me");
  }

  return (
    <Button onClick={handleSubmit}>press me</Button>);
}
