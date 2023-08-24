// routes/secureRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const admin = require('../firebaseSetup'); 

// Sample secure route
router.get('/secure', authMiddleware, async (req, res) => {
  // Access user info from req.user
  res.json({ message: `Welcome, ${req.user.username}! This is a secure route.` });
});

router.post('/send-notification', authMiddleware, async(req, res) => {
  const { deviceId, transactionType, refNo } = req.body;

  const title = "new approval"
  const body = refNo
  const token = deviceId

  if (!deviceId || !transactionType || !refNo) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  const response_ok = {
    "code": 201,
    "message": "Successfully sent message",
    "data": 
    {
      "device_id": deviceId,
      "transactionType": transactionType,
      "refNo": refNo,
    }
  }

  const response_error = {
    "code": 500,
    "message": "failed sent message",
    "data": 
    {
      "device_id": deviceId,
      "transactionType": transactionType,
      "refNo": refNo,
    }
  }

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    res.json(response_ok);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json(response_error);
  }
});

module.exports = router;
