// creaUsuario.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2';

admin.auth().getUser(userId)
  .then(user => {
    console.log('El usuario ya existe:', user.uid);
    process.exit(0);
  })
  .catch(async err => {
    if (err.code === 'auth/user-not-found') {
      await admin.auth().createUser({ uid: userId });
      console.log('Usuario creado:', userId);
    } else {
      console.error('Error:', err);
    }
    process.exit(0);
  });
