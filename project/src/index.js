import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Routes } from './routes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { ProvideAuth } from "./corp-auth.js";
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
//import awsconfig from './aws-exports';

let awsconfig = {
    Auth: {
        identityPoolId: process.env.REACT_APP_COGNITO_ID_POOL,
        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_COGNITO_REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT,
        oauth: {
            domain: process.env.REACT_APP_COGNITO_DOMAIN,
            scope: ['email', 'openid'],
            redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT,
            redirectSignOut: process.env.REACT_APP_COGNITO_REDIRECT,
            responseType: process.env.REACT_APP_COGNITO_RESPONSE
        }

    }
}

if (isLocalhost) {
    awsconfig.Auth.oauth.redirectSignIn = 'http://localhost:3000/';
    awsconfig.Auth.oauth.redirectSignOut = 'http://localhost:3000/';
}

Amplify.configure(awsconfig);

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ProvideAuth>
                <Routes />
            </ProvideAuth>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default awsconfig;