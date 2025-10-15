// Script para eliminar el campo 'stock' de todos los productos del usuario en Firestore
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const uid = 'GCzGtPWctQhkxMW5aOswznnyQay2';

async function eliminarStock() {
  const productosRef = db.collection('artifacts').doc('default')
    .collection('users').doc(uid)
    .collection('productos');
  const snapshot = await productosRef.get();
  let count = 0;
  for (const doc of snapshot.docs) {
    await doc.ref.update({ stock: admin.firestore.FieldValue.delete() });
    count++;
  }
  console.log(`Stock eliminado de ${count} productos.`);
}

eliminarStock();
