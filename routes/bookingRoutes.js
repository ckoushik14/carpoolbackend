const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ passenger: req.userId });
  res.json(bookings);
});

module.exports = router;
