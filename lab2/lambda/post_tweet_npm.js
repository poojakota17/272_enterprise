const Twitter = require ('twitter-lite');

handler = async function(event) {
  const promise = new Promise(function(resolve, reject) {
    var client = new Twitter({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_SECRET
    });

     client
      .post('statuses/update', {
          status: "hello",
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
            statusCode: 200,
            body: "Denied",
        };
        resolve(response);
      });
})
  return promise
}
handler()
