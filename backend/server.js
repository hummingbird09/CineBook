// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// General log to see what the body looks like after parsing (can remove later)
app.use((req, res, next) => {
  // console.log('Incoming request URL:', req.originalUrl);
  // console.log('Incoming request method:', req.method);
  // console.log('Incoming request body (after express.json):', req.body);
  next(); // Pass control to the next middleware/route handler
});


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Movie Booking Backend API is running and connected to MongoDB!');
});

// Use Movie Routes
app.use('/api/movies', movieRoutes);
// Use Booking Routes
app.use('/api/bookings', bookingRoutes);
// Use User Routes
app.use('/api/users', userRoutes); // Add this line

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
