// Script para actualizar los códigos de todos los productos a un número aleatorio de 5 dígitos
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const uid = 'GCzGtPWctQhkxMW5aOswznnyQay2';

function generarCodigoNumerico(existentes) {
  let codigo;
  do {
    codigo = Math.floor(10000 + Math.random() * 90000).toString();
  } while (existentes.has(codigo));
  existentes.add(codigo);
  return codigo;
}

async function actualizarCodigos() {
  const productosRef = db.collection('artifacts').doc('default')
    .collection('users').doc(uid)
    .collection('productos');
  const snapshot = await productosRef.get();
  const usados = new Set();
  let count = 0;
  for (const doc of snapshot.docs) {
    const nuevoCodigo = generarCodigoNumerico(usados);
    await doc.ref.update({ codigo: nuevoCodigo });
    count++;
    console.log(`Producto ${doc.id} actualizado a código: ${nuevoCodigo}`);
  }
  console.log(`Códigos actualizados para ${count} productos.`);
}

actualizarCodigos();
