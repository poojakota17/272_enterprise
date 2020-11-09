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
const Jimp = require('jimp');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


async function textOverlay(x, y, text, filename) {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const image = await Jimp.read(`https://d3pxhns8yrguf5.cloudfront.net/${filename}`);
  var filename = `doge${Date.now()}.jpeg`;
  await image.print(font, x, y, text);
  buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  fs.writeFileSync(`/tmp/${filename}`, buffer, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  var data = fs.readFileSync(`/tmp/${filename}`);
  const params = {
    Bucket: 'REPLACE_ME',
    Key: `${filename}`, // File name you want to save as in S3
    Body: data,
  };

  return uploadobject(params)
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(err);
      console.log('error from S3')
      return err;

    })
}
async function uploadobject(params) {
  const result = await s3.upload(params).promise();
  return result;
}


app.post('/items', upload.none(), function (req, res) {

  if (req.body.positionx === "left" && req.body.positiony === "top") {
    alignmentX = 10;
    alignmentY = 10;
  }

  else if (req.body.positionx === "left" && req.body.positiony === "bottom") {
    alignmentX = 10;
    alignmentY = 450
  }
  else if (req.body.positionx === "left" && req.body.positiony === "middle") {
    alignmentX = 10;
    alignmentY = 280;
  }

  else if (req.body.positionx === "right" && req.body.positiony === "top") {
    alignmentX = 800;
    alignmentY = 10
  }

  else if (req.body.positionx === "right" && req.body.positiony === "bottom") {
    alignmentX = 800;
    alignmentY = 450;
  }


  else if (req.body.positionx === "right" && req.body.positiony === "middle") {
    alignmentX = 800;
    alignmentY = 280;
  }

  else if (req.body.positionx === "center" && req.body.positiony === "top") {
    alignmentX = 450;
    alignmentY = 10
  }
  else if (req.body.positionx === "center" && req.body.positiony === "bottom") {
    alignmentX = 450;
    alignmentY = 450
  }
  else if (req.body.positionx === "center" && req.body.positiony === "middle") {
    alignmentX = 450;
    alignmentY = 280
  }
  var text = req.body.text;
  var fname = req.body.pic;

  return textOverlay(alignmentX, alignmentY, text, fname)
    .then(image => {
      console.log(image.Key);
      res.json({ filename: image.Key });

    })
    .catch(err => {
      console.log(err);
      res.json({ err: err });
    });
});



app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
