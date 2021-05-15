const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');
// modules you want to include
var teamsRoute = require('./routes/teams.route');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

// headers and content type
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // Allow headers access
  res.header('access-control-expose-headers', ',Authorization,Content-Length,Content-Disposition');
  next();
});

console.log('loading routes ....');

teamsRoute(app, fs, multer);

// start server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Server listening on port ' + port));

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Error handling middle-ware

app.use(function (err, req, res, next) {
  console.log('Error happens', err.stack);
});

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  console.error('clientErrorHandler');
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.error('errorHandler');
  res.status(500);
  res.render('error', { error: err });
}
