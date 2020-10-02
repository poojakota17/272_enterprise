import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ReactComponent as TwitterLogo } from './twitter_logo.svg';
import { ReactComponent as Bin } from './bin.svg';

export default class Tweet extends React.Component {
  render() {
    return (
      <Col key={this.props.id} className="p-2">
        <Card className="single_tweet">
          <Card.Body>
            <Row>
              <Col xs="auto"className="mr-auto"><TwitterLogo /></Col>
              <Col xs="auto"><Bin /></Col>
            </Row>
            <Card.Text>{this.props.value}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
