This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

https://nastya.d371pgyhkbridp.amplifyapp.com/

## Components of this Applications:

* < App >: creates basic view of the Page
  * < Logo > : renders group Logo saved in svg format
  * < TwitterCampaign >: main component that is dependent on user's input:
    * < SendTweet >: form to enter the tweet and by pressing the button request is sent to AWS Gateway. Updates sibling element <DisplayTweets>;
    * < SearchUser >: form to enter Twitter user name to retrieve his/her tweets. After button is pressed the request is sent to AWS Gateway. Updates sibling element <DisplayTweets>;
    * < DisplayTweets >: using props sent from parent component (TwitterCampaign) makes call to AWS Gateway and displays tweets
      * < Tweet >: display singe tweet by using props from parent component (DisplayTweets). Control the appearance of 'bin' button that allows sending request to AWS Gateway to delete current tweet
