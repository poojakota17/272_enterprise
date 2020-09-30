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
              .then(result => this.setState({"result": JSON.parse(result).body}))
              .catch(error => console.log('error', error));
          }

  mySubmitHandler = (event) => {
   event.preventDefault();
   var params = {"text": this.state.text};
   this.callAPI(params, 'POST', process.env.REACT_APP_TWITTER_POST_URL);
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

class Tweet extends React.Component {
  render() {
    return (
      <Card className="single_tweet">
        <Card.Body>
          <img alt="twitter_logo" src={twitter_logo} id="twitter-logo"/>
          <Card.Text>{this.props.value}</Card.Text>
        </Card.Body>
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
    return <Col key={id} className="col-3"><Tweet value={text} /></Col>;
  }

  componentDidMount() {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    // make API call with parameters and use promises to get response
    fetch(process.env.REACT_APP_TWITTER_GET_URL, requestOptions)
    .then(response => response.text())
    .then(result => this.setState({"tweets": JSON.parse(JSON.parse(result).body)}))
    .catch(error => console.log('error', error));
  }

  render() {
    return (
      <Row>
      {this.state.tweets.map((element, index) => this.renderTweet(index, element))}
      </Row>
    );
  }
}

class TwitterCampaign extends React.Component {
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
        <Col bsPrefix="col-auto" className="align-self-center"><img alt="mm_logo"  src={logo} className="mm-logo"/></Col>
        <Col bsPrefix="col"><TwitterCampaign /></Col>
      </Row>
    </Container>
  );
}

export default App;
