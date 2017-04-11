var express = require('express');
var cors    = require('cors');

var app = express();
app.use(cors());

const port = process.env.port || 3001;

app.get('/', function(req, res) {
    res.status(200).json({server: 'pdflegal', status: 'ok'});
});

app.get('/add', function(req, res) {
  console.log('adding file');
  setTimeout(function() {
    if (Math.random() > 0.8 ) {
      console.log('error adding file');
      res.status(401).json({status: 'error'});
    } else {
      console.log('added');
      res.status(200).json({status: 'ok'});
    }
  }, 1000);
});

const checkStatus = (jobId) => {
  const rand = Math.random();
  let status;
  if (rand < 0.7) {
    status = 'processing';
  } else if( rand > 0.7 && rand < 0.9 ) {
    status = 'processed';
  } else {
    status = 'error';
  }

  return new Promise((resolve, reject) => {
    setInterval(()=>{
      resolve(status)
    }, 1000)
  });
}

app.get('/status', function(req, res) {
  console.log('checking status');
  checkStatus()
    .then(status => res.status(200).json({status: status}))
});

app.listen(port, () => console.log(`server listening on port ${port}`) );
