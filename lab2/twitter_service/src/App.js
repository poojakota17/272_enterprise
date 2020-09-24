import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react';
import logo from './mm_logo.svg';
import twitter_logo from './twitter_logo.svg';
import './App.css';

class SendTweet extends React.Component {
  render() {
    return (
      <Card id="sender" style={{ width: '80%' }}>
        <Card.Body>
          <Card.Title>Create new Tweet</Card.Title>
          <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          </Form>
          <Button variant="light" className="mt-auto">Send</Button>
        </Card.Body>
      </Card>
    );
  }
}

class Tweet extends React.Component {
  render() {
    return (
      <Card className="single_tweet">
        <Card.Body>
          <img src={twitter_logo} id="twitter-logo"/>
          <Card.Text>{this.props.value}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

class DisplayTweets extends React.Component {
  renderTweet(i) {
    return <Tweet value={i} />;
  }
  render() {
    return (
      <Row>
        <Col className="col-3">{this.renderTweet("Hello")}</Col>
        <Col className="col-3">{this.renderTweet("It is smth new")}</Col>
      </Row>
    );
  }
}

class Twitter_Campaign extends React.Component {
  render() {
    return (
        <div className="justify-content-center" id="campaign">
          <h1 className="pb-5">Twitter Ad Campaign Management</h1>
          <SendTweet />
          <h2 className="py-5">Current Tweets:</h2>
          <DisplayTweets />
        </div>
    );
  }
}

function App() {
  return (
    <Container fluid="true" id="main">
      <Row className="h-100 px-5 py-5">
        <Col bsPrefix="col-auto" className="align-self-center"><img src={logo} className="mm-logo"/></Col>
        <Col bsPrefix="col"><Twitter_Campaign /></Col>
      </Row>
    </Container>
  );
}

export default App;
