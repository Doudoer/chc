// scriptFirestoreAdmin.cjs
// Ejecuta: node scriptFirestoreAdmin.cjs
// Requiere archivo de credenciales de servicio (serviceAccountKey.json)
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const appId = 'default';
const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2';

async function poblarEjemplo() {
  // CLIENTES
  const clienteRef = await db.collection(`artifacts/${appId}/users/${userId}/clientes`).add({
    nombreEmpresa: 'Confecciones El León, C.A.',
    rif: 'J-12345678-0',
    direccion: 'Av. Principal, Torre Zeta, Ofic. 4A',
    telefono: '0414-1234567',
    fechaCreacion: new Date().toISOString()
  });
  const clienteId = clienteRef.id;

  await db.collection(`artifacts/${appId}/users/${userId}/clientes`).add({
    nombreEmpresa: 'Textiles Andinos, S.A.',
    rif: 'J-87654321-1',
    direccion: 'Calle 10, Galpón 2',
    telefono: '0412-9876543',
    fechaCreacion: new Date().toISOString()
  });

  // PRODUCTOS
  const productoRef = await db.collection(`artifacts/${appId}/users/${userId}/productos`).add({
    codigo: 'CM-ALG-001',
    descripcion: 'Camisa Algodón Sencilla, Corte Regular',
    precioUnitario: 12.5,
    stock: 150
  });
  const productoId = productoRef.id;

  await db.collection(`artifacts/${appId}/users/${userId}/productos`).add({
    codigo: 'PT-JNS-002',
    descripcion: 'Pantalón Jeans Azul Oscuro',
    precioUnitario: 18.0,
    stock: 80
  });

  // DOCUMENTO DE EJEMPLO
  await db.collection(`artifacts/${appId}/users/${userId}/documentos`).add({
    tipo: 'COTIZACIÓN',
    numero: 'CT-2025-0001',
    fecha: '2025-10-14',
    clienteId: clienteId,
    clienteInfo: {
      nombreEmpresa: 'Confecciones El León, C.A.',
      rif: 'J-12345678-0',
      direccion: 'Av. Principal, Torre Zeta, Ofic. 4A',
      telefono: '0414-1234567'
    },
    estado: 'Pendiente',
    currency: 'USD',
    exchangeRate: 40.5,
    ivaTasa: 0.16,
    subtotal: 125.0,
    total: 145.0,
    usdTotal: 145.0,
    items: [
      {
        productId: productoId,
        codigo: 'CM-ALG-001',
        descripcion: 'Camisa Algodón Sencilla, Corte Regular',
        cantidad: 10,
        precioUnitario: 12.5,
        lineTotal: 125.0
      }
    ]
  });

  console.log('Datos de ejemplo cargados con Admin SDK.');
  process.exit(0);
}

poblarEjemplo();
