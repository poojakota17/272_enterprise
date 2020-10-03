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

// var Twitter = require('twitter');
// var client = new Twitter({
//     consumer_key: 'xTfQCKX6vtwDgLvFXUzGNDkNo',
//     consumer_secret: '9t83NmjFcQKJz8ZiIJjQTNQa6cM9HTR0xktl5aXXeE5wXawqNw',
//     access_token_key: '1306322901788811264-zIo9mNB0YJALZjNtwqdaG4Ki1GuJ0I',
//     access_token_secret:'xqsMHwpXxpCoa0a1T6YukmWlt2QYprpKyuMRVvZjkb6bA'
//   });

app.get('/post', function(req, res) {
  // Add your code here
  console.log('/post/GET', req)
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/post/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/post', function(req, res) {
  // Add your code here
  // client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
  //   if (!error) {
  //     console.log(tweet);
  //   }
  // });
  console.log('/post/POST', req.body)
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/post/*', function(req, res) {
  // Add your code here
  console.log('/post/*/POST', req)
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
