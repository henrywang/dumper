const mongoose = require('mongoose');

const mongoUrl = process.env.dburl || 'localhost';
const mongoPort = process.env.dbport || 27017;
const mongoName = process.env.dbname || 'dumper';

mongoose.connect(`mongodb://${mongoUrl}:${mongoPort}/${mongoName}`);
