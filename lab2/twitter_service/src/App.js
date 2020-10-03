import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react';
import { ReactComponent as Logo } from './mm_logo.svg';
import './App.css';
import Tweet from './singleTweet.js'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

var API_GATEWAY_ENDPOINT = awsconfig.aws_cloud_logic_custom[0].endpoint+"/post"

class SendTweet extends React.Component {
  constructor(props){
    super(props);
    this.state = {text:'', result: ''};
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI = (params, method, url) => {
              // instantiate a headers object
              var myHeaders = new Headers();
              // add content type header to object
              myHeaders.append("Content-Type", "application/json");
              // using built in JSON utility package turn object to string and store in a variable
              var raw = JSON.stringify(params);
              // create a JSON object with parameters for API call and store in a variable
              var requestOptions = {
                  method: method,
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
              };
              // make API call with parameters and use promises to get response
              fetch(url, requestOptions)
              .then(response => response.text())
              .then(response => alert(response))
              .then(result => alert(JSON.parse(result).body))
              //.then(result => this.setState({ "result": JSON.parse(result).body }))
              .catch(error => console.log('error', error));
          }

  mySubmitHandler = (event) => {
   event.preventDefault();
   var params = {"text": this.state.text};
   this.callAPI(params, 'POST', API_GATEWAY_ENDPOINT);
 }

  myChangeHandler = (event) => {
   this.setState({text: event.target.value});
 }

  render() {
    return (
      <Card id="sender" style={{ width: '60%' }}>
        <Card.Body>
          <Card.Title>Create a new Tweet</Card.Title>
          <Form onSubmit={this.mySubmitHandler} role="form">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={2} type="text" onChange={this.myChangeHandler} />
            </Form.Group>
            <Button type="submit" variant="light" className="mt-auto">Send</Button>
          </Form>
        </Card.Body>
        <Card.Title>{this.state.result}</Card.Title>
      </Card>
    );
  }
}

class DisplayTweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {tweets: []};
  }
  renderTweet(id, text) {
    return <Tweet key={id} value={text} />;
  }

  componentDidMount() {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    // create a JSON object with parameters for API call and store in a variable
    var raw = JSON.stringify({"user": "twitterapi"});
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    // make API call with parameters and use promises to get response
    fetch(API_GATEWAY_ENDPOINT, requestOptions)
    .then(response => response.text())
    .then(response => alert(response))
    .then(result => alert(JSON.parse(result).body))
    .then((result) => {this.setState({"tweets": JSON.parse(JSON.parse(result).body)})})
    .catch(error => console.log('error', error));
  }

  render() {
    return (
      <Row xs={1} md={3}>
      {this.state.tweets.map((element, index) => this.renderTweet(index, element))}
      </Row>
    );
  }
}

class TwitterCampaign extends React.Component {
  render() {
    return (
        <div className="justify-content-center" id="campaign">
          <h1>Custom Twitter Page</h1>
          <p className="pb-5">No more sponsored tweets!</p>
          <SendTweet />
          <h2 className="py-5">Current Tweets:</h2>
          <DisplayTweets />
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
