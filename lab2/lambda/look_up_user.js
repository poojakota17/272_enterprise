const Twitter = require ('twitter-lite');

export.handler = async function(event) {
  const promise = new Promise(function(resolve, reject) {
    var client = new Twitter({
      bearer_token: process.env.TWITTER_BEARER
    });

    //https://api.twitter.com/1.1/statuses/destroy/1312880414063652900.json
    client.post('users/lookup', {
      screen_name: event.user_name,
    })
      .then(results => {
        const response = {
            statusCode: 200,
            body: results,
        };
        console.log(response)
        resolve(response);
      })
      .catch(error => {
        const response = {
            statusCode: 400,
            body: error,
        };
        console.log(response.body)
        resolve(response);
      });
})
  return promise
}
