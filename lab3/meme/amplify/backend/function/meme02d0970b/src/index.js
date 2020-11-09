/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_MEMES_BUCKETNAME
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*"
      },
        body: JSON.stringify(event),
    };
    return response;
};
