const express = require('express');
const stacker = require('./controllers/stacker');

const app = express();

app.use('/api/v0/stacker', stacker);

module.exports = app;
