const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./firebaseSetup'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// POST /api/notification
app.post('/api/notification', async (req, res) => {
  const { device_id, transaction_type, refno } = req.body;

  const title = "new approval"
  const body = refno
  const token = device_id

  if (!device_id || !transaction_type || !refno) {
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
      "device_id": device_id,
      "transaction_type": transaction_type,
      "refno": refno,
    }
  }

  const response_error = {
    "code": 500,
    "message": "failed sent message",
    "data": 
    {
      "device_id": device_id,
      "transaction_type": transaction_type,
      "refno": refno,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});