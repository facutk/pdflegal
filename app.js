var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('pdflegal');
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
