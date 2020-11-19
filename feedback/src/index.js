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
        identityPoolId: process.env.REACT_APP_COGNITO_ID_POOL,
        region:  process.env.REACT_APP_COGNITO_REGION,
        userPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID,
        userPoolWebClientId:  process.env.REACT_APP_COGNITO_WEB_CLIENT,
        oauth: {
            domain: process.env.REACT_APP_COGNITO_DOMAIN,
            scope: ['email', 'openid'],
            redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT,
            redirectSignOut: process.env.REACT_APP_COGNITO_REDIRECT,
            responseType: process.env.REACT_APP_COGNITO_RESPONSE
        }
      },

      aws_appsync_graphqlEndpoint:  process.env.REACT_APP_APPSYNC_GQL_ENDPOINT,
      aws_appsync_region: process.env.REACT_APP_APPSYNC_REGION,
      aws_appsync_authenticationType: process.env.REACT_APP_APPSYNC_AUTHTYPE
}
if (isLocalhost) {
  awsconfig.Auth.oauth.redirectSignIn = 'http://localhost:3000/';
  awsconfig.Auth.oauth.redirectSignOut = 'http://localhost:3000/';
}

Amplify.configure(awsconfig);


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
