const express = require('express');
const app = express();
const cron = require('node-cron');
require('dotenv').config();
var Twit = require('twit');
const axios = require('axios').default;

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



// cron.schedule('*/10 * * * * *', function() {
//     T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//         console.log(data)
//       })
//     console.log('running a task every 1/2 minute');
//   });

app.get('/', (req, res) => {
    axios.get('https://www.officeapi.dev/api/quotes/random')
    .then(function (response) {
        const data = response.data["data"];
        const quote = data.content;
        const author = data.character;
        const text = `"${quote}" ~ ${author.firstname} ${author.lastname}\n\n(via-autotweet)`
        T.post('statuses/update', { status: text }, function(err, data, response) {
            console.log(data)
          })
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
 
  res.send("Hello!");
    
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
})

// .then(data => {
//     const quote = data.quote;
//   console.log(quote);
//   const text = `"${quote}" ~ Kanye West\n\n(via-autotweet)`
//   T.post('statuses/update', { status: text }, function(err, data, response) {
//       console.log(data)
//     })
    
// })
// .catch(err => console.log(err))