const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE RIDE (NO AUTH)
router.post('/create', async (req, res) => {
    console.log('Received create ride request:', req.body); // Debug log
    try {
        const { from, to, date, time, price } = req.body;

        const ride = new Ride({
            from,
            to,
            date,
            time,
            price
        });

        await ride.save();
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        console.error('Error creating ride:', error); // Debug log
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET ALL RIDES
router.get('/', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch rides' });
    }
});

// BOOK A RIDE
router.post('/:id/book', authMiddleware, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        const newBooking = new Booking({
            ride: ride._id,
            passenger: req.userId
        });

        await newBooking.save();
        res.status(201).json({ message: 'Ride booked successfully', booking: newBooking });
    } catch (error) {
        console.error('Error booking ride:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
