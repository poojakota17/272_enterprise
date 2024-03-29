import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as TwitterLogo } from './twitter_logo.svg';
import { ReactComponent as Bin } from './bin.svg';
import {callAPI} from './utils.js'

export default class Tweet extends React.Component {
  handleClick(id) {
    var params = {"tweet_id": id};
    callAPI(params, 'POST', process.env.REACT_APP_TWITTER_DELETE_TWEET)
    .then((result) => {
      console.log(result);
      this.props.updateDisplay();
    });
  }
  render() {
    const deletable = this.props.deletable;
    let bin = '';
    if (deletable) {
     bin = <Col xs="auto"><Bin onClick={() => this.handleClick(this.props.value.id_str)} className="bin"/></Col>;
    }

    return (
      <Col key={this.props.id} className="p-2">
        <Card className="single_tweet">
          <Card.Body>
            <Row>
              <Col xs="auto" className="pr-0"><TwitterLogo/></Col>
              <Col xs="auto" className="px-1">@{this.props.value.user_screen_name}</Col>
              <Col xs="auto" className="px-1"><span>·</span></Col>
              <Col xs="auto"className="pl-0 mr-auto">{this.props.value.created_at}</Col>
              {bin}
            </Row>
            <Card.Text>{this.props.value.text}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
