//jshit esversion: 8

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
console.log(app)
app.use(bodyParser.urlencoded({
 extended: true
}));

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

app.post("/", (req, res) => {
 const crypto = req.body.crypto;
 const fiat = req.body.fiat;

 const baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
 const finalURL = baseURL + crypto + fiat;
 request(finalURL, (error, response, body) => {
  const data = JSON.parse(body);
  const price = data.last;

  const currentDate = data.display_timestamp;
  res.write("<p>The current date is " + currentDate + "</p>");
  res.write('<h1>The current price of' + crypto + " is" + price + fiat + "</h1>");

  res.send("<h1>The current price of bitcoin is " + price + "</h1>");
  res.send();
 });
});



app.listen(3000, () => {
 console.log('3000');
});