/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

var Twitter = require('twitter-lite');
const client = new Twitter({
  consumer_key: '<REPLACE_THIS>',
  consumer_secret: '<REPLACE_THIS>',
  access_token_key: '<REPLACE_THIS>',
  access_token_secret:'<REPLACE_THIS>'
});
var twitterhandle = '<REPLACE_THIS>'

async function postTweet(text) {
  const tweet = await client.post("statuses/update", {
    status: text
  });
  return tweet
}
async function getTimeline(twitterhandle) {
  const timeline = await client.get('statuses/user_timeline', {
    screen_name: twitterhandle,
    count: 5
  });
  let tweetarr = []
  timeline.forEach(tweet => {
    tweetarr.push({
      key: tweet.id_str,
      value: tweet.text
    })
  });
  return tweetarr;
}

app.get('/post', function(req, res) {
  // Add your code here

  let date_ob = new Date();
  console.log('START GETTING tweet', date_ob.getHours(), ":", date_ob.getMinutes(), ":", date_ob.getSeconds());
  return getTimeline(twitterhandle).then(
    result => {
      console.log('API reponse', result)
      res.json({ success: 'get call succeed!', url: req.url, tweets: result });
      date_ob = new Date();
      console.log('END GETTING tweet', date_ob.getHours(), ":", date_ob.getMinutes(), ":", date_ob.getSeconds());
    }
  )
  .catch(error => console.log(error))
});

app.get('/post/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/post', function (req, res) {
  // Add your code here
  
  let date_ob = new Date();
  console.log('POSTING tweet', date_ob.getHours(), ":", date_ob.getMinutes(), ":", date_ob.getSeconds());
  console.log('/post/POST', req.body);
  return postTweet(req.body.text)
    .then(
      result => {
        console.log('API reponse', result)
        res.json({ success: 'post call succeed!', url: req.url, body: req.body.text, tweet_id: result.id_str });
        date_ob = new Date();
        console.log('END POSTING tweet', date_ob.getHours(), ":", date_ob.getMinutes(), ":", date_ob.getSeconds());
      }
    )
    .catch(error => console.log(error));
});

app.post('/post/*', function(req, res) {
  // Add your code here
  console.log('/post/*/POST', req);
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/post', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/post/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/post', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/post/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app 
