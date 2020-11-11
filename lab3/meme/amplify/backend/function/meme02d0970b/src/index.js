
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
      var newFilename = `${event.queryStringParameters.pic}${Math.random().toString(36).substr(2, 12)}.jpeg`
      var positionx =  getPositionX(event.queryStringParameters.positionx);
      var positiony = getPositionY(event.queryStringParameters.positiony);
      var text = event.queryStringParameters.text;
      var font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
      console.log(positiony);
      console.log(filename);


      const image = await Jimp.read(`${process.env.CF_DOWNLOAD}${filename}`)
        .then((image) => {
          console.log("read");
          return image.print(font, 0,0,{text: text, alignmentX: positionx, alignmentY: positiony}).resize(Jimp.AUTO, 500).quality(90)
        })
        .then((image) => {
          console.log("write")
          return image.getBufferAsync(Jimp.MIME_JPEG);
        })
        .then((image) => {
          console.log("burrered")
          return uploadToS3(image, newFilename, process.env.STORAGE_MEMES_BUCKETNAME);
        })
        .catch((err) => {console.log(err);
        throw err;})
        .finally(() => {console.log("Uploaded successfully!")})
      console.log(image);

    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(`${process.env.CF_UPLOADED}${newFilename}`)
    };
    return response;
};

async function uploadToS3(image, filename, bucket) {
  const result = await s3.putObject({
    Bucket: bucket,
    Key: filename,
    Body: image,
    ContentType: 'image/jpeg'
  }).promise();
  return result;
}

function getPositionX (positionx) {
  if (positionx == 'RIGHT')
    return Jimp.HORIZONTAL_ALIGN_RIGHT;
  else if (positionx == 'CENTER')
    return Jimp.HORIZONTAL_ALIGN_CENTER;
  return Jimp.HORIZONTAL_ALIGN_LEFT;
}

function getPositionY (positiony) {
  if (positiony == 'BOTTOM')
    return Jimp.VERTICAL_ALIGN_BOTTOM;
  else if (positiony == 'MIDDLE')
    return Jimp.VERTICAL_ALIGN_MIDDLE;
  return Jimp.VERTICAL_ALIGN_TOP;
}
