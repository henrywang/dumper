const mongoose = require('mongoose');

const IpSchema = new mongoose.Schema(
  {
    vmName: String,
    ip: String
  }
)
IpSchema.index({vmName: 1}, {unique: true});
mongoose.model('Stacker', IpSchema);

module.exports = mongoose.model('Stacker');
