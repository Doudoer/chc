// creaNuevoUsuario.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = 'user@chc.com';
const password = '067800';

admin.auth().createUser({
  email,
  password,
  emailVerified: false,
  disabled: false,
})
  .then(userRecord => {
    console.log('Usuario creado:', userRecord.uid);
    process.exit(0);
  })
  .catch(error => {
    if (error.code === 'auth/email-already-exists') {
      console.log('El usuario ya existe.');
    } else {
      console.error('Error al crear usuario:', error);
    }
    process.exit(1);
  });
