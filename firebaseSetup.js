const admin = require('firebase-admin');
const serviceAccount = require('PATH_TO_SERVICE_ACCOUNT_FILE');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;