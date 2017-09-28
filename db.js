const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_ADDRESS || 'localhost';
const mongoPort = process.env.MONGODB_PORT || 27017;
const mongoName = process.env.MONGODB_NAME || 'dumper';

mongoose.connect(`mongodb://${mongoUrl}:${mongoPort}/${mongoName}`);
