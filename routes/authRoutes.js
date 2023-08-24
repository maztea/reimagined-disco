// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

router.post('/signin', (req, res) => {
  // Validate user credentials (this part depends on your authentication strategy)
  const user = {
    id: 1,
    username: 'exampleUser'
    // Add other user-related data as needed
  };

  // Create and sign the JWT
  jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.status(500).json({ message: 'Error creating token.' });
    } else {
      res.json({ token });
    }
  });
});

module.exports = router;
