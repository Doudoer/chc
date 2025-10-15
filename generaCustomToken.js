// generaCustomToken.js
// Ejecuta: node generaCustomToken.js
// Genera un token personalizado para el UID real usando el Admin SDK

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2'; // UID real

admin.auth().createCustomToken(userId)
  .then(token => {
    console.log('TOKEN PERSONALIZADO:');
    console.log(token);
  })
  .catch(error => {
    console.error('Error generando token:', error);
  });
