import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {callAPI} from './utils.js'

export default class SearchUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {user_name:''};
  }

  mySubmitHandler = (event) => {
   event.preventDefault();
   var params = {"user_name": this.state.user_name};
   callAPI(params, 'POST', process.env.REACT_APP_TWITTER_LOOKUP_USER)
   .then((result) => {
    if (JSON.parse(result).statusCode === 400)
      alert("Hm... Looks like there is no user with name: " + this.state.user_name);
    else
      this.props.updateDisplay(this.state.user_name);
   }).catch(er => console.log(er));
 }

  myChangeHandler = (event) => {
   this.setState({user_name: event.target.value});
 }

  render() {
    return (
      <Card id="finder">
        <Card.Body>
          <Card.Title>Search User</Card.Title>
          <Form onSubmit={this.mySubmitHandler} role="form">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={2} type="text" onChange={this.myChangeHandler} />
            </Form.Group>
            <Button type="submit" variant="light" className="mt-auto">Search</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
