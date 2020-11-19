import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify  from 'aws-amplify';

let awsconfig = {
    Auth: {
        identityPoolId: "us-east-1:504e826a-2600-4c27-8192-0252f6a89474",
        region: "us-east-1",
        userPoolId:  "us-east-1_uOxhHwsNK",
        userPoolWebClientId:  "7r1tst69plm9qr9tpn556mchm",
      },
      aws_appsync_graphqlEndpoint:  "https://3gtltjbjevgxvirpt4levs4r4m.appsync-api.us-east-1.amazonaws.com/graphql",
      aws_appsync_region: "us-east-1",
      aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
}


Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
