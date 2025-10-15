// verificaFirestore.js
// Ejecuta: node verificaFirestore.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBQEVlZLZzcyQ2qJvbtBeRN7hsV7S2KR58',
  authDomain: 'gestion-chc.firebaseapp.com',
  projectId: 'gestion-chc',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appId = 'default'; // Cambia si usas otro appId
const userId = 'GCzGtPWctQhkxMW5aOswznnyQay2'; // UID real del usuario

async function verificarColecciones() {
  for (const col of ['clientes', 'productos', 'documentos']) {
    try {
      const snap = await getDocs(collection(db, `artifacts/${appId}/users/${userId}/${col}`));
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
