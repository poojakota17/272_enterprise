import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css';
import DisplayTweets from './components/displayTweets.js';
import SendTweet from './components/sendTweet.js';
import SearchUser from './components/searchUser.js';
import { ReactComponent as Logo } from './mm_logo.svg';

class TwitterCampaign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      last_update: Date.now(),
      user: "PoojaPrasannan6",
      authorized_user: "PoojaPrasannan6",
      twitter_link: "https://twitter.com/PoojaPrasannan6",
      deletable: true,
      count: 6,
      user_updated: false
    };
  }

  updateAfterSend = () => {
    if (this.state.user.toLowerCase() === this.state.authorized_user.toLowerCase())
      this.setState({ last_update: Date.now(), user_updated: false})
    else {
      this.setState({
        user: this.state.authorized_user,
        deletable: true,
        user_updated: true
      })
    }
  }

  updateAfterUserChange = (user) => {
    var deletable = (user.toLowerCase() === this.state.authorized_user.toLowerCase())
    this.setState({
      user: user,
      deletable: deletable,
      user_updated: true
    })
  }

  render() {
    var tweets;
    if (this.state.user_updated === true) {
      tweets = <DisplayTweets deletable={this.state.deletable}
        user={this.state.user}
        count={this.state.count}
        key={this.state.user}
        update={this.state.last_update}/>
    }
    else {
      tweets = <DisplayTweets deletable={this.state.deletable}
        user={this.state.user}
        count={this.state.count}
        key={this.state.last_update}
        update={this.state.last_update}/>
    }
    return (
        <div className="justify-content-center" id="campaign">
          <h1>Custom Twitter Page</h1>
          <p>No more sponsored tweets!</p>
          <div className="alert alert-warning" role="alert">
            This is a students project. Be mindful in posting tweets on our behalf.<br />
            Go to <a href={this.state.twitter_link} target="_blank" className="alert-link">Twitter</a> to check that it really works;)
          </div>
          < Row>
            <Col xs={12} md={6}><SendTweet updateDisplay={this.updateAfterSend} /></Col>
            <Col xs="auto" className="px-1"><h2> or </h2></Col>
            <Col xs={12} md="auto"><SearchUser updateDisplay={(e) => this.updateAfterUserChange(e)}/></Col>
          </Row>
          <h2 className="py-3">Current Tweets:</h2>
          {tweets}
        </div>
    );
  }
}

function App() {
  return (
    <Container fluid id="main">
      <Row className="h-100 px-5 py-5">
        <Col sm="auto" className="sticky-top"><Logo className="mm-logo" /></Col>
        <Col ><TwitterCampaign /></Col>
      </Row>
    </Container>
  );
}

export default App;
