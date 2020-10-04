import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css';
import DisplayTweets from './components/displayTweets.js';
import SendTweet from './components/sendTweet.js';
import { ReactComponent as Logo } from './mm_logo.svg';

class TwitterCampaign extends React.Component {
  render() {
    return (
        <div className="justify-content-center" id="campaign">
          <h1>Custom Twitter Page</h1>
          <p className="pb-5">No more sponsored tweets!</p>
          <SendTweet />
          <h2 className="py-5">Current Tweets:</h2>
          <DisplayTweets deletable={true} user={"anazi_sjsu"} count={6}/>
        </div>
    );
  }
}

function App() {
  return (
    <Container fluid id="main">
      <Row className="h-100 px-5 py-5">
        <Col sm="auto" className="align-self-center"><Logo className="mm-logo" /></Col>
        <Col ><TwitterCampaign /></Col>
      </Row>
    </Container>
  );
}

export default App;
