import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';

let awsconfig = {
    Auth: {
        identityPoolId: process.env.REACT_APP_COGNITO_ID_POOL,
        region:  process.env.REACT_APP_COGNITO_REGION,
        userPoolId:  process.env.REACT_APP_COGNITO_USER_POOL_ID,
        userPoolWebClientId:  process.env.REACT_APP_COGNITO_WEB_CLIENT,
      },
      aws_appsync_graphqlEndpoint:  process.env.REACT_APP_APPSYNC_GQL_ENDPOINT,
      aws_appsync_region: process.env.REACT_APP_APPSYNC_REGION,
      aws_appsync_authenticationType: process.env.REACT_APP_APPSYNC_AUTHTYPE
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
