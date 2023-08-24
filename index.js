const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const secureRoutes = require('./routes/secureRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
// Mount routes
app.use('/auth', authRoutes);
app.use('/api', secureRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});