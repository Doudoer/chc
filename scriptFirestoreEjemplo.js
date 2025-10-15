// scriptFirestoreEjemplo.js
// Ejecuta este script una sola vez para poblar Firestore con datos de ejemplo
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQEVlZLZzcyQ2qJvbtBeRN7hsV7S2KR58",
  authDomain: "gestion-chc.firebaseapp.com",
  projectId: "gestion-chc",
  storageBucket: "gestion-chc.firebasestorage.app",
  messagingSenderId: "853356444197",
  appId: "1:853356444197:web:01ed88a7a4c2f17252ddcc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appId = 'default'; // Cambia si usas otro appId
const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2'; // UID real del usuario


async function poblarEjemplo() {
  // CLIENTES
  const clienteRef = await addDoc(collection(db, `artifacts/${appId}/users/${userId}/clientes`), {
    nombreEmpresa: 'Confecciones El León, C.A.',
    rif: 'J-12345678-0',
    direccion: 'Av. Principal, Torre Zeta, Ofic. 4A',
    telefono: '0414-1234567',
    fechaCreacion: new Date().toISOString()
  });
  const clienteId = clienteRef.id;

  await addDoc(collection(db, `artifacts/${appId}/users/${userId}/clientes`), {
    nombreEmpresa: 'Textiles Andinos, S.A.',
    rif: 'J-87654321-1',
    direccion: 'Calle 10, Galpón 2',
    telefono: '0412-9876543',
    fechaCreacion: new Date().toISOString()
  });

  // PRODUCTOS
  const productoRef = await addDoc(collection(db, `artifacts/${appId}/users/${userId}/productos`), {
    codigo: 'CM-ALG-001',
    descripcion: 'Camisa Algodón Sencilla, Corte Regular',
    precioUnitario: 12.5,
    stock: 150
  });
  const productoId = productoRef.id;

  await addDoc(collection(db, `artifacts/${appId}/users/${userId}/productos`), {
    codigo: 'PT-JNS-002',
    descripcion: 'Pantalón Jeans Azul Oscuro',
    precioUnitario: 18.0,
    stock: 80
  });

  // DOCUMENTO DE EJEMPLO
  await addDoc(collection(db, `artifacts/${appId}/users/${userId}/documentos`), {
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

  console.log('Datos de ejemplo cargados.');
}

poblarEjemplo();
