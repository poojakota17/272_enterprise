import time
import twitter

def lambda_handler(event, lambda_context):
    api = twitter.Api(consumer_key='KxDaC4VmwcEEU5l4ZFBPFVguk',
                      consumer_secret='wVNN2i8uDgbJ9RSWWTmx2rRtHBietZqwfw1cUlE281I7d9ZeYy',
                      access_token_key='922345700469260293-lzyjVW5x2yGRLQ2yWNHh5a3z1J9haRg',
                      access_token_secret='qmmVegxps38sdUnxRGW8zSkwpmEftuwYxxlVepE7sxksy')
    
    # Post the message on Twitter
    status=api.PostUpdate('Post from AWS SUCCESSFULLY 1 seconds')
    
    # Stop fot a second 
    time.sleep(1)

    # Delete the post
    api.DestroyStatus(status.id)