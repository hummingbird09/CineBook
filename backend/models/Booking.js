// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Movie model
    ref: 'Movie', // The name of the referenced model
    required: true,
  },
  showtime: {
    type: String, // The selected showtime, e.g., "07:00 PM"
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
    min: [1, 'At least one ticket is required'],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price cannot be negative'],
  },
  user: {
    // For now, we'll just store a placeholder user ID or name.
    // Later, this will be a reference to a User model once we implement authentication.
    type: String, // Placeholder for user ID/name
    default: 'GuestUser', // Default for now
  },
  bookingDate: {
    type: Date,
    default: Date.now, 
  },
  // We could add seat numbers, payment status, etc., later
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
