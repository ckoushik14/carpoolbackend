const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  from: String,
  to: String,
  date: String,
  time: String,
  price: Number
});

module.exports = mongoose.model('Ride', rideSchema);
