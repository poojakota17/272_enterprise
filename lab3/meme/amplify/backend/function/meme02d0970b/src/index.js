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


exports.handler = async (event) => {
    // TODO implement
    const response = {	exports.handler = (event, context) => {
        statusCode: 200,	  console.log(`EVENT: ${JSON.stringify(event)}`);
    //  Uncomment below to enable CORS requests	  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
      headers: {
          "Access-Control-Allow-Origin": "*"
      },
        body: JSON.stringify(event.queryStringParameters),
    };
    return response;
};
