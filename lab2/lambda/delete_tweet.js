const Twitter = require ('twitter-lite');

exports.handler = async function(event) {
  const promise = new Promise(function(resolve, reject) {
    var client = new Twitter({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_SECRET
    });
    //https://api.twitter.com/1.1/statuses/destroy/1312880414063652900.json
    const id = event.tweet_id;
     client
      .post('statuses/destroy', {
      id,
    })
      .then(results => {
        const response = {
            statusCode: 200,
            body: "Success",
        };
        resolve(response);
      })
      .catch(error => {
        const response = {
            statusCode: 400,
            body: error,
        };
        resolve(response);
      });
})
  return promise
}
