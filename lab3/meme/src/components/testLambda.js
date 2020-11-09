import React from 'react';
import Button from 'react-bootstrap/Button';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);


export default function TestLambda(props) {
  console.log(props)
  function handleSubmit() {
    const apiName = 'updatememe';
    const path = '/newmeme';
    const myInit = {
  'queryStringParameters': {
    'order': 'byPrice'
  }
  };
    console.log("you clicked me");

  API
    .get(apiName, path, myInit)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response);
   });
  }

  return (
    <Button onClick={handleSubmit}>press me</Button>);
}
