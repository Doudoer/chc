// verificaFirestoreAdmin.cjs
// Ejecuta: node verificaFirestoreAdmin.cjs
// Verifica la existencia de colecciones usando el Admin SDK (sin restricciones de reglas)

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const appId = 'default'; // Cambia si usas otro appId
const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2'; // UID real del usuario

async function verificarColecciones() {
  for (const col of ['clientes', 'productos', 'documentos']) {
    try {
      const snap = await db.collection(`artifacts/${appId}/users/${userId}/${col}`).get();
      if (snap.empty) {
        console.log(`${col}: NO EXISTE o VACÍA`);
      } else {
        console.log(`${col}: OK (${snap.size} documentos)`);
      }
    } catch (e) {
      console.error(`${col}: ERROR`, e.message);
    }
  }
  process.exit(0);
}

verificarColecciones();
