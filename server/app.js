const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
// const path       = require('path');

const config      = require('./config/config');
const pageRoutes = require('./routes/pages');

const app = express();

require('./config/mongoose');

// Configure body-parser middleware
app.use(bodyParser.json());

// Configure cors middleware
app.use(cors());

// Configure routes
app.use('/pages', pageRoutes);

app.listen(config.port, err => {
  if (err) console.log(err);
  console.log('Connected to server on port', config.port);
});
