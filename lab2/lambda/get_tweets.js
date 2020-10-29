
/* response from lambda looks like:
Response:
{
  "statusCode": 200,
  "body": "[{\"id_str\":\"1301576820740050953\",\"created_at\":\"Sep 4 20\",\"text\":\"Tweet consumption status bar added to the new developer portal experience\\n\\nYou can now check your usage towards the… https://t.co/YoMnhCaZFf\",\"favorite_count\":49,\"user_name\":\"Twitter API\",\"user_screen_name\":\"TwitterAPI\"},{\"id_str\":\"1296121766914469889\",\"created_at\":\"Aug 3 20\",\"text\":\"Hide replies available in v2 Twitter API\\n\\nToday, we’re launching the new hide replies endpoint /into the v2 Twitter… https://t.co/Jdd8yRpbyb\",\"favorite_count\":76,\"user_name\":\"Twitter API\",\"user_screen_name\":\"TwitterAPI\"}]"
}
*/
const moment = require ('moment')
const http = require('https')

exports.handler = async (event) => {
    return httprequest(event.user, event.count).then((data) => {

        const response = {
            statusCode: 200,
            body: JSON.stringify(get_tweets(data)),
        };
    return response;
    });
};

function get_tweets(data) {
  var result = [];
  var d = new Date();
  var year_now = d.getFullYear();
  var created;
  data.forEach((item, i) => {
      var date = Date.parse(item.created_at);
      if (new Date(date).getFullYear() == year_now)
        created = moment(date).format("MMM DD");
      else
        created = moment(date).format("MMM DD YY");
    result.push({
      id_str: item.id_str,
      created_at: created,
      text: item.text,
      favorite_count: item.favorite_count,
      user_name: item.user.name,
      user_screen_name:item.user.screen_name
      })
  });
  return result
}

function httprequest(user_name, count) {
     return new Promise((resolve, reject) => {
        const options = {
            host: 'api.twitter.com',
            path: '/1.1/statuses/user_timeline.json?screen_name='+ user_name +'&count='+ count + '&exclude_replies=true',
            port: 443,
            method: 'GET',
            headers: {'Authorization': process.env.TWITTER_BEARER}
        };
        const req = http.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}
