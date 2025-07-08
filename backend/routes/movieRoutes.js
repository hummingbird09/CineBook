// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get a single movie by ID
// @route   GET /api/movies/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Add a new movie
// @route   POST /api/movies
// @access  Public (for now, later might be Admin only)
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // Keep this log for verification
  try {
    const { title, genre, description, imageUrl, duration, rating, director, cast, showtimes } = req.body;
    let { ticketPrice } = req.body; // Declare ticketPrice with let

    // Explicitly convert ticketPrice to a Number, even if it seems like one
    // This handles cases where it might be a string "12.5" or some other type
    ticketPrice = Number(ticketPrice);

    // Check if after conversion, it's still NaN or null/undefined, and if it's required
    if (isNaN(ticketPrice) || ticketPrice === null || ticketPrice === undefined) {
      // If it's required and not a valid number, throw an error manually
      // This should ideally be caught by Mongoose, but we're adding a safeguard
      return res.status(400).json({ message: 'ticketPrice must be a valid number.' });
    }


    const movie = new Movie({
      title,
      genre,
      description,
      imageUrl,
      duration,
      rating,
      director,
      cast,
      showtimes,
      ticketPrice, // Use the potentially converted ticketPrice
    });

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A movie with this title already exists.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;