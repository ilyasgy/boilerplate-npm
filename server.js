'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.use(function(req, res, next) {
  res.status(404).type('txt').send('Not found');
});

app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500).type('txt').send(err.message || 'SERVER ERROR');
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});
