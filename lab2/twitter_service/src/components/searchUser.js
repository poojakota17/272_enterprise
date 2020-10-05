import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {callAPI} from './utils.js'

export default class SearchUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {user_name:'', result: ''};
  }
/*
  mySubmitHandler = (event) => {
   event.preventDefault();
   var params = {"text": this.state.text};
   callAPI(params, 'POST', process.env.REACT_APP_TWITTER_POST_URL)
   .then((result) => {
     this.setState({"result": JSON.parse(result).body});
     this.props.updateDisplay()
   });
 }
*/
  myChangeHandler = (event) => {
   this.setState({user_name: event.target.value});
 }

  render() {
    return (
      <Card id="sender">
        <Card.Body>
          <Card.Title>Search User</Card.Title>
          <Form onSubmit={this.mySubmitHandler} role="form">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={1} type="text" onChange={this.myChangeHandler} />
            </Form.Group>
            <Button type="submit" variant="light" className="mt-auto">Send</Button>
          </Form>
        </Card.Body>
        <Card.Title>{this.state.result}</Card.Title>
      </Card>
    );
  }
}
