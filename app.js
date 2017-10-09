const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const stackerRouter = require('./routers/stackr.router');

// connect to mongodb
const mongoUrl = process.env.MONGODB_ADDRESS || 'localhost';
const mongoPort = process.env.MONGODB_PORT || 27017;
const mongoName = process.env.MONGODB_NAME || 'dumper';
mongoose.connect(`mongodb://${mongoUrl}:${mongoPort}/${mongoName}`);

const app = express();

process.env.NODE_ENV === 'production' || app.use(morgan('dev'));
app.use('/api/v0/stacker', stackerRouter);

module.exports = app;
