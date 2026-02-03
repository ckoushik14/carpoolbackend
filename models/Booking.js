const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  ride: mongoose.Schema.Types.ObjectId,
  passenger: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Booking", bookingSchema);
