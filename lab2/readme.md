1. Apply for Tweeter API access
2. Create account on AWS
3. Set permissions for the group access
4. Create git repository


5. Web:
5a. check if npm is installed
`npm -v`
5b. create react app locally
`npx create-react-app twitter_service`
5c. deploy to AWS Amplify

6. Create Lambda function
  simple get_post_function looks like:
  ```
  exports.handler = async (event) => {
    // TODO implement
    let name = JSON.stringify( ["One", "Two", "Tree"]);
    const response = {
        statusCode: 200,
        body: name,
    };
    return response;
};
  ```

  simple post_new_post function looks like:
  ```
  exports.handler = async (event) => {
    // TODO implement
    let name = JSON.stringify(`This message brought to you by Lambda: ${event.text}`);
    const response = {
        statusCode: 200,
        body: name,
    };
    return response;
};
  ```
7. Create AWS gateway


in .env file define urls for twitter:
```
REACT_APP_TWITTER_POST_URL=post_twitter
REACT_APP_TWITTER_GET_URL=get_twitters
```


Source
[Build React App on AWS](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-one/?e=gs2020&p=build-a-react-app-intro)
[Create Lambda function](https://aws.amazon.com/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/module-two/)
