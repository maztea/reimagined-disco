// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Replace with your actual secret key

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token'); // Assuming token is sent in the 'x-auth-token' header
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
