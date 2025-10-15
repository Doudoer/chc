// Script para cargar productos masivos a Firestore
// Usa firebase-admin y serviceAccountKey.json

const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const uid = 'GCzGtPWctQhkxMW5aOswznnyQay2'; // UID real del usuario
const productos = [
  { desc: 'BRAGA SUP, TELA DRILL 70/30, AZUL  MARINO', precio: 23 },
  { desc: 'BRAGA SUP, TELA DRILL 70/30, COLOR AZUL REY', precio: 23 },
  { desc: 'BRAGA SUP, TELA DRILL 70/30, COLOR AZUL MARINO', precio: 23 },
  { desc: 'BRAGA OBRERO,  MANGA CORTA TELA DRILL 70/30 AZUL MARINO', precio: 22 },
  { desc: 'BRAGA SUP, TELA IGNIFUGA, COLOR ROJO', precio: 55 },
  { desc: 'BRAGA SUP, TELA IGNIFUGA  AZUL REY', precio: 53 },
  { desc: 'BRAGA SUP, TELA DRILL 70/30, COLOR AZUL REY CON BORDADO REQUERIDO', precio: 38 },
  { desc: 'BRAGA SUP, TELA DRILL 70/30, COLOR AZUL MARINO', precio: 18 },
  { desc: 'BRAGA OBRERO, TELA DRILL 70/30, COLOR AZUL REY', precio: 16 },
  { desc: 'BRAGA OBRERO, TELA DRILL 70/30, COLOR AZUL REY', precio: 16 },
  { desc: 'BRAGA SUP, TELA IGNIFUGA, COLOR NARANJA, CON CINTA REFLECTIVA', precio: 53 },
  { desc: 'BRAGA SUP, TELA IGNIFUGA, 100/', precio: 53 },
  { desc: 'BRAGA SUP, TELA IGNIFUGA', precio: 50 },
  { desc: 'BRAGA SUP, TELA IGNIFUGA, COLOR GRIS CON LOGO', precio: 53 },
  { desc: 'BRAGA SUP, TELA DRILL 70/30, AZUL MARINO  CON GRIS', precio: 32 },
  { desc: 'BRAGA OBRERO, TELA DRILL 70/30, COLOR GRIS', precio: 15 },
  { desc: 'BRAGA SUP, TELA DRILL 70/30, COLOR GRIS, CON LOGO', precio: 19 },
  { desc: 'BRAGA OBRERO, COLOR NARANJA CON AZUL MARINO 100/ ALGODÓN', precio: 20 },
  { desc: 'BOTAS SAGA, MODELO 2021, TALLAS 36-44', precio: 35 },
  { desc: 'BOTAS SAGA, MODELO 2021, TALLAS 45-46', precio: 36 },
  { desc: 'BRAGA SUP,  100% ALGODÓN', precio: 25 },
  { desc: 'BRAGA SUP, ALGODÓN AZUL MARINO', precio: 25 },
  { desc: 'BORDADO EN LA ESPALDA Y PARTE PECTORAL', precio: 6 },
  { desc: 'BORDADO FRANELA', precio: 2 },
  { desc: 'BRAGA RESIST FLAMA, COLOR ROJO, BANDA NARANJA, TALLA (30-60)', precio: 45 },
  { desc: 'BRAGA RESIST FLAMA, COLOR ROJO, BANDA VERDE MANZANA, TALLA (30-60)', precio: 45 },
  { desc: 'BRAGA RESIST FLAMA, COLOR AZUL PANTONE CLASSIC BLUE, TALLA (30-60)', precio: 53 },
  { desc: 'BRAGA RESIST FLAMA, TIPO BOMBERO, COLOR AZUL, TALLA (30-60)', precio: 83 },
  { desc: 'FRANELA COLOR BLANCO CON ESTAMPADO', precio: 10 },
  { desc: 'BOTA DE SEGURIDAD SUPERVISOR SAGA 4050', precio: 32.5 },
  { desc: 'BOTA MEDIA CAÑA 3043', precio: 34 },
  // ...continúa con el resto de productos...
];

function generarCodigoUnico(idx) {
  // PRD-XXXXXX
  return 'PRD-' + Math.random().toString(36).substr(2, 6).toUpperCase() + '-' + idx;
}

async function cargarProductos() {
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];
    const codigo = generarCodigoUnico(i);
    await db.collection('artifacts').doc('default')
      .collection('users').doc(uid)
      .collection('productos').add({
        codigo,
        descripcion: p.desc,
        precioUnitario: p.precio,
        stock: 0
      });
    console.log(`Producto agregado: ${codigo} - ${p.desc}`);
  }
  console.log('Carga masiva finalizada.');
}

cargarProductos();
