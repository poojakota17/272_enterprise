import React from 'react';
import Tweet from './singleTweet.js';
import Row from 'react-bootstrap/Row';
import {callAPI} from './utils.js'

export default class DisplayTweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: [],
      deletable: this.props.deletable,
      user: this.props.user
    };
  }

  renderTweet(id, text, deletable) {
    return <Tweet key={id} value={text} deletable={deletable} />;
  }

  componentDidMount() {
    callAPI({"user": this.state.user},'POST', process.env.REACT_APP_TWITTER_GET_TWEETS)
    .then(result => this.setState({"tweets": JSON.parse(JSON.parse(result).body)}))
  }

  render() {
    return (
      <Row xs={1} md={3}>
      {this.state.tweets.map((element, index) => this.renderTweet(index, element, this.state.deletable))}
      </Row>
    );
  }
}
