import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css';
import DisplayTweets from './components/displayTweets.js';
import SendTweet from './components/sendTweet.js';
import { ReactComponent as Logo } from './mm_logo.svg';

class TwitterCampaign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      last_update: Date.now(),
      user: "anazi_sjsu",
      deletable: true
    };
  }

  updateDisplay = () => {
    this.setState({last_update: Date.now()})
  }
  render() {
    console.log(this.state.last_update)
    return (
        <div className="justify-content-center" id="campaign">
          <h1>Custom Twitter Page</h1>
          <p className="pb-5">No more sponsored tweets!</p>
          <SendTweet updateDisplay={this.updateDisplay} />
          <h2 className="py-5">Current Tweets:</h2>
          <DisplayTweets deletable={this.state.deletable} user={this.state.user} count={6} key={this.state.last_update} update={this.state.last_update}/>
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
