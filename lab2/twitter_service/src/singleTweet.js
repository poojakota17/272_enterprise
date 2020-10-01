import React from 'react';
import Card from 'react-bootstrap/Card';
import twitter_logo from './twitter_logo.svg';

export default class Tweet extends React.Component {
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
