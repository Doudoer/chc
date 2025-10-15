// serverToken.js
// Servidor Express para servir el token personalizado en http://localhost:3001/custom-token

const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());

const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2';

app.get('/custom-token', async (req, res) => {
  try {
    const token = await admin.auth().createCustomToken(userId);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor de token personalizado escuchando en http://localhost:3001/custom-token');
});
