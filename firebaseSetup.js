const admin = require('firebase-admin');
const serviceAccount = require('./fungsitama-saas-firebase-adminsdk-y4umz-4a4c94feb1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;