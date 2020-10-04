import twitter
import json

def lambda_handler(event, lambda_context):
    api = twitter.Api(consumer_key='KxDaC4VmwcEEU5l4ZFBPFVguk',
                      consumer_secret='wVNN2i8uDgbJ9RSWWTmx2rRtHBietZqwfw1cUlE281I7d9ZeYy',
                      access_token_key='922345700469260293-lzyjVW5x2yGRLQ2yWNHh5a3z1J9haRg',
                      access_token_secret='qmmVegxps38sdUnxRGW8zSkwpmEftuwYxxlVepE7sxksy')
    if event['act'] == 'add':
      status=api.PostUpdate(event['msg'])
      return { 'statusCode': 200, 'body': json.dumps('Tweet ID: ' + str(status.id) + ' The message: ' + event['msg']) }
    if event['act'] == 'list':
      status_list = api.GetUserTimeline()
      content=''
      for i in range(len(status_list)):
        content += 'id:' + str(status_list[i].id) + ', message:' + status_list[i].text + ' '
      return { 'statusCode': 200, 'body': json.dumps(content) }
    if event['act'] == 'search':
      status_list = api.GetUserTimeline()
      content=''
      for i in range(len(status_list)):
        if(event['msg'] in status_list[i].text):
          content += 'id:' + str(status_list[i].id) + ', message:' + status_list[i].text + ' '
      return { 'statusCode': 200, 'body': json.dumps(content) }
    if event['act'] == 'del':
      status_list = api.GetUserTimeline()
      for i in range(len(status_list)):
        if(event['msg'] == str(status_list[i].id)):
          content = status_list[i].text
          api.DestroyStatus(status_list[i].id)
      return { 'statusCode': 200, 'body': json.dumps('Delete the message: ' + content) }
    