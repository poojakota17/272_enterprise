import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as TwitterLogo } from './twitter_logo.svg';
import { ReactComponent as Bin } from './bin.svg';
import Button from 'react-bootstrap/Button';

export default class Tweet extends React.Component {
  handleClick() {
    alert("hello");
  }
  render() {
    const deletable = this.props.deletable;
    let bin = '';
    if (deletable) {
     bin = <Col xs="auto"><Bin onClick={this.handleClick} className="bin"/></Col>;
    }

    console.log(this.props.value)
    return (
      <Col key={this.props.id} className="p-2">
        <Card className="single_tweet">
          <Card.Body>
            <Row>
              <Col xs="auto"><TwitterLogo /></Col>
              <Col xs="auto"className="mr-auto">{this.props.value.created_at}</Col>
              {bin}
            </Row>
            <Card.Text>{this.props.value.text}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
