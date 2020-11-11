/* const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
}; */


/* Amplify Params - DO NOT EDIT	const awsServerlessExpress = require('aws-serverless-express');
	ENV	const app = require('./app');
	REGION
	STORAGE_MEMES_BUCKETNAME
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const Jimp = require("jimp");
const s3 = new aws.S3();

exports.handler = async (event) => {

      var filename =  `${event.queryStringParameters.pic}.jpeg`;
      var newFilename = `${event.queryStringParameters.pic}_${Math.random().toString(36).substr(2, 9)}.jpeg`
      var positionx =  getPositionX(event.queryStringParameters.positionx);
      var positiony = getPositionY(event.queryStringParameters.positiony);
      var text = event.queryStringParameters.text;
      var font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
      console.log(positiony);
      console.log(filename);


      const image = await Jimp.read(`https://d3pxhns8yrguf5.cloudfront.net/${filename}`)
        .then((image) => {
          return image.print(font, 0,0,{text: text, alignmentX: positionx, alignmentY: positiony})
        })
        .then((image) => {
          return uploadToS3(image, newFilename, process.env.STORAGE_MEMES_BUCKETNAME);
        })
        .catch(err => {throw err;})
        .finally(() => {console.log("Uploaded successfully!")})
      console.log(image);

    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(newFilename)
    };
    return response;
};

async function uploadToS3(image, filename, bucket) {
  const result = await s3.upload({
    Bucket: bucket,
    Key: filename,
    Body: image,
  }).promise();
  return result;
}

function getPositionX (positionx) {
  if (positionx === 'RIGHT')
    return Jimp.HORIZONTAL_ALIGN_RIGHT;
  else if (positionx === 'CENTER')
    return Jimp.HORIZONTAL_ALIGN_CENTER;
  return Jimp.HORIZONTAL_ALIGN_LEFT;
}

function getPositionY (positiony) {
  if (positiony === 'BOTTOM')
    return Jimp.VERTICAL_ALIGN_BOTTOM;
  else if (positiony === 'MIDDLE')
    return Jimp.VERTICAL_ALIGN_MIDDLE;
  return Jimp.VERTICAL_ALIGN_TOP;
}

/*

const s3 = new aws.S3();
//lambda trigger handler for triggering event after object being uploaded into bucket
exports.handler = async (event, context) => {
  const key = event.Records[0].s3.object.key; // Uploaded object key
  const sanitizedKey = key.replace(/\+/g, ' ');
  const keyWithoutExtension = sanitizedKey.replace(/.[^.]+$/, '');
  const objectKey = keyWithoutExtension+'_mb.';

//read object using jimp to resize it accordingly
  const image = await Jimp.read(prefix+key)
                      .then((image) => {
                        console.log( "Before resizing" , image)
                        return image
                          .resize(256, 256) // resize
                          .quality(90) // set JPEG quality
                      })
                     .then((image) => {
                      return uploadToS3(image, objectKey+image.getExtension(), image.getExtension());
                      })
                      .catch(err => {
                        throw err;
                      })
                      .finally(() => {
                        console.info("Function ran successfully")
                      })
  console.log(image);
  return image
}
//upload file to s3 after resizing
async function uploadToS3(data, key, ContentType) {
  console.log("Inside uploadToS3: ", data, key, ContentType)
  const resp = await s3
    .putObject({
      Bucket: Bucket,
      Key: key,
      Body: data,
      ContentType: ContentType
    }).promise();
  console.log("Response from S3: ", resp);
  return resp
}
*/
