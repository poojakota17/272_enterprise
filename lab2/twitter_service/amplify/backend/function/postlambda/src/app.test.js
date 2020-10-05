const request = require('supertest');
const app = require('./app');
var assert = require('assert');

/**
 * Testing get  endpoint
 */
var tweet_id;
describe('Testing POST, DELETE and GET Endpoints', () => {
    var tweet_id;
    it('Should create a new tweet', function (done) {
      //const res = 
      request(app)
        .post('/post')
        .send({
          text: 'This is unit test'.concat(Math.random().toString(36).substring(7)),
        }) 
        .expect(200, function(err, res){ //expecting HTTP status code
          if (err) { return done(err); }
          tweet_id = res.body.tweet_id
          assert.match(res.body.body, /Success/) // expecting content value
          done()
        })
        
    });

    it('Should deny creating an existing tweet', function (done) {
      //const res = 
      request(app)
        .post('/post')
        .send({
          text: 'This is unit test'
        })
        .expect(200, done)  // expecting HTTP status code
        .expect('{"body":"Denied"}')  // expecting content value
    });
    
    it('Should delete an existing tweet', function (done) {
      //const res = 
      request(app)
        .post('/post/delete_post')
        .send({
          tweet_id: tweet_id
        })
        .expect(200, done)  // expecting HTTP status code
        .expect('{"body":"Successfully deleted tweet"}')  // expecting content value
    });
    
    it('Should get tweets from user timeline', function (done) {
      //const res = 
      request(app)
        .get('/post')
        .expect(200, function(err, res){
          assert.match(res.body.success, /succeed!/) // expecting content value
          done()
         })
    });

  })