import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from 'react-bootstrap/Container'
import Amplify from 'aws-amplify';


Amplify.configure({API: {
        endpoints: [
            {
              "name": process.env.REACT_APP_EPNAME,
              "endpoint": process.env.REACT_APP_ENDPOINT,
              "region": process.env.REACT_APP_REGION
            }
        ]
    },});

ReactDOM.render(
  <React.StrictMode>
    <Container fluid="sm" id="index">
      <App />
    </ Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
