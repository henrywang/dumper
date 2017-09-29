const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const stacker = require('./controllers/stacker');

// connect to mongodb
const mongoUrl = process.env.MONGODB_ADDRESS || 'localhost';
const mongoPort = process.env.MONGODB_PORT || 27017;
const mongoName = process.env.MONGODB_NAME || 'dumper';
mongoose.connect(`mongodb://${mongoUrl}:${mongoPort}/${mongoName}`);

const app = express();

process.env.NODE_ENV === 'production' || app.use(morgan('dev'));
app.use('/api/v0/stacker', stacker);

module.exports = app;
