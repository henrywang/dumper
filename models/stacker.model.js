const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IpSchema = new Schema({
  vmName: String,
  ip: String,
});
IpSchema.index({ vmName: 1 }, { unique: true });

const StackerModel = mongoose.model('Stacker', IpSchema);

module.exports = StackerModel;
