// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Not authorized, token failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
