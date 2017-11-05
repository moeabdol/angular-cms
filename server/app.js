const express    = require('express');
const bodyParser = require('body-parser');
// const path       = require('path');

const config    = require('./config/config');

const app = express();

require('./config/mongoose');

app.use(bodyParser.json());

app.listen(config.port, err => {
  if (err) console.log(err);
  console.log('Connected to server on port', config.port);
});
