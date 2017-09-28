const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const stacker = require('./controllers/stacker');

const app = express();

process.env.NODE_ENV === 'production' || app.use(morgan('dev'));
app.use('/api/v0/stacker', stacker);

module.exports = app;
