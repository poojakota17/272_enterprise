1. Apply for Tweeter API access
2. Create account on AWS
4. Create git repository for Amplify to access the code
5. Web:
  * Check if npm is installed
`npm -v`
  * . Create react app locally
`npx create-react-app twitter_service`
  *  Push it to git
  *  Deploy new AWS Amplify app and connect it to the git repository from step 5c

6. Backend
  *  Create Lambda functions per each operation (post tweet/delete tweet/display tweet/search user)
  *  Per each Lambda function add layers (if extra libraries are used)
    Node.js Lambda functions = 'twitter', 'moment' \
    Python Lambda functions = 'twitter', 'json'
  * Set env.variables with api tokens/secrets for TwitterAPI
```
TWITTER_ACCESS_SECRET=some_secret
TWITTER_ACCESS_TOKEN=some_token
...
```
  * Create AWS Gateway APIs endpoints for each functions

7. Add Gateway endpoints in AWS Amplify console as env.variables (for updated/newly added env variables to be accessible the app should be redeployed)
```
REACT_APP_TWITTER_DELETE_TWEET=https://some_url.amazonaws.com/
REACT_APP_TWITTER_GET_TWEETS=https://some_url.amazonaws.com/
...
```
<br />
Now you can:
 * create Tweet on behalf of authorized_user
 * delete authorized_user's Tweet
 * search for Tweets of other users by providing their screen_name

Source
[Build React App on AWS](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-one/?e=gs2020&p=build-a-react-app-intro) \
[Create Lambda function](https://aws.amazon.com/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/module-two/) \
[Get Twitter API keys](https://developer.twitter.com/en/docs/twitter-ads-api/getting-started) \
[NPM for Node js](https://www.npmjs.com/)  \
[Mocha framefork for unit tests](https://mochajs.org/) \
[React JS](https://reactjs.org/tutorial/tutorial.html) \
[Add Layer to Lambda](https://medium.com/appgambit/part-1-getting-started-with-aws-lambda-layers-1677a6b006) \
[Bootstrap](https://getbootstrap.com/)
