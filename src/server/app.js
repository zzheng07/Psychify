const express = require('express');
const path = require('path');
const api = require('./api');
const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above

app.get('/api/disorders', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  api.listDisorders().then(rows => {
    console.log(rows);
    res.json(rows);
  }).catch(err => {
    console.log(err);
    // should return user friendly error message here.
    // future change is needed here;
    res.json(err);
  });
});

app.get('/api/searchDisorderName/:disorder', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  var disorder = req.params.disorder;

  api.queryName(disorder).then(rows => {
    console.log(rows);
    res.json(rows);
  }).catch(err => {
    console.log(err);
    // should return user friendly error message here.
    // future change is needed here;
    res.json(err);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;