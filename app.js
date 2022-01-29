const express = require('express');
const app = express();
const cron = require('node-cron');
require('dotenv').config();
var Twit = require('twit');

const bodyParser = require('body-parser');

app.use(bodyParser.json())
.use(bodyParser.urlencoded({
        extended: true
}));

var T = new Twit({
    consumer_key:         process.env.API_KEY,
    consumer_secret:      process.env.API_SECRET_KEY,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  })



cron.schedule('*/10 * * * * *', function() {
    T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
        console.log(data)
      })
    console.log('running a task every 1/2 minute');
  });

app.listen(3000, () => {
    console.log("server is running");
})