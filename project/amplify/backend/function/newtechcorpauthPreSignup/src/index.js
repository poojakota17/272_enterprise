/*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/

exports.handler = (event, context, callback) => {
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;

  // Return to Amazon Cognito
  callback(null, event);
};
