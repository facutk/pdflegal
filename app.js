var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('pdflegal api');
});

app.get('/add', (req, res) => {
  res.send('file added');
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
