      // models/Movie.js

        const mongoose = require('mongoose');

        const movieSchema = new mongoose.Schema({
          title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
          },
          genre: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            required: true,
          },
          imageUrl: {
            type: String,
            default: 'https://placehold.co/400x600/000000/FFFFFF?text=No+Image',
          },
          duration: {
            type: String,
            required: true,
            trim: true,
          },
          rating: {
            type: String,
            required: true,
            trim: true,
          },
          director: {
            type: String,
            required: true,
            trim: true,
          },
          cast: {
            type: [String],
            required: true,
          },
          showtimes: {
            type: [String],
            required: true,
          },
          ticketPrice: { // <--- THIS MUST BE HERE AND CORRECT
            type: Number,
            required: true, // This makes sure it cannot be empty
            //min: 0,
          },
        }, {
          timestamps: true,
        });

        const Movie = mongoose.model('Movie', movieSchema);

        module.exports = Movie;