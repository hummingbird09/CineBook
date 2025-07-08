// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating authentication tokens

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    trim: true,
    lowercase: true, // Stores emails in lowercase
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  // You can add more fields like role, profile picture, etc.
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Middleware to hash password before saving the user
userSchema.pre('save', async function (next) {
  // Only hash if the password has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10); // 10 rounds of salting
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a JWT token for the user
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id }, // Payload: user ID
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
