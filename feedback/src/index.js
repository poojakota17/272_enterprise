import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

let awsconfig = {
    Auth: {
        identityPoolId: "us-east-1:504e826a-2600-4c27-8192-0252f6a89474",
        region: "us-east-1",
        userPoolId:  "us-east-1_uOxhHwsN",
        userPoolWebClientId: "7r1tst69plm9qr9tpn556mchm",
        oauth: {
            domain:"techcorp.auth.us-east-1.amazoncognito.com",
            scope: ['email', 'openid'],
            redirectSignIn: "https://master.d2q6atm0r278z3.amplifyapp.com/",
            redirectSignOut: "https://master.d2q6atm0r278z3.amplifyapp.com/",
            responseType: "code"
        }
      },

      aws_appsync_graphqlEndpoint:  "https://3gtltjbjevgxvirpt4levs4r4m.appsync-api.us-east-1.amazonaws.com/graphql",
      aws_appsync_region: "us-east-1",
      aws_appsync_authenticationType:"AMAZON_COGNITO_USER_POOLS"
}
if (isLocalhost) {
  awsconfig.Auth.oauth.redirectSignIn = 'http://localhost:3001/';
  awsconfig.Auth.oauth.redirectSignOut = 'http://localhost:3001/';
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
