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
      user: this.props.user,
      count: this.props.count,
      error: null,
      last_update: this.props.update
    };
  }

  renderTweet(id, text, deletable) {
    return <Tweet key={id} value={text} deletable={deletable} updateDisplay={this.updateDisplay}/>;
  }

  updateDisplay = () => {
    this.getTweets()
  }

  getTweets () {
    callAPI({"user": this.state.user, "count": this.state.count},'POST', process.env.REACT_APP_TWITTER_GET_TWEETS)
    .then(result => this.setState({
      tweets: JSON.parse(JSON.parse(result).body),
      error: null
    }))
    .catch(er => this.setState({error: "Smth went wrong"}))
  }

  componentDidMount() {
    this.getTweets()
  }

  render() {
    var result;
    if (this.state.error != null)
      result = this.state.error
    else
      result = this.state.tweets.map((element, index) => this.renderTweet(index, element, this.state.deletable))
    return (
      <Row xs={1} md={3}>
      {result}
      </Row>
    );
  }
}
