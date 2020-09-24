import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  return (
    <Container className="p-3 m-3 bg-light" id="main">
      <Row className="h-100 align-items-center">
        <Col>Here will be our super awesome app!</Col>
      </Row>
    </Container>
  );
}

export default App;
