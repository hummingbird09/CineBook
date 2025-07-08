// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (requires authentication)
router.post('/', protect, async (req, res) => {
  try {
    const { movieId, showtime, numberOfTickets } = req.body;
    const userId = req.user._id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const totalPrice = movie.ticketPrice * numberOfTickets;

    const booking = new Booking({
      movie: movieId,
      showtime,
      numberOfTickets,
      totalPrice,
      user: userId,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);

  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all bookings for the authenticated user
// @route   GET /api/bookings/mybookings
// @access  Private (requires authentication)
router.get('/mybookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('movie');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get a single booking by ID (only if it belongs to the user)
// @route   GET /api/bookings/:id
// @access  Private (requires authentication)
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('movie');

    if (booking) {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this booking' });
      }
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a booking by ID
// @route   DELETE /api/bookings/:id
// @access  Private (requires authentication)
router.delete('/:id', protect, async (req, res) => { // Add 'protect' here
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the booking belongs to the authenticated user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne(); // Use deleteOne() for Mongoose 6+
    res.json({ message: 'Booking removed' });

  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc    Get all bookings (for testing/admin purposes - can be protected later)
// @route   GET /api/bookings
// @access  Public (for now, will be private after auth)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('movie');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
