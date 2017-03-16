var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('pdflegal api');
});

app.get('/add', (req, res) => {
  res.send('add file');
});

app.get('/status', (req, res) => {
  res.send('status');
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
