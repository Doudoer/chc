// firebaseGlobal.js
// Inicialización global de Firebase para apps embebidas (Canvas, widgets, etc)
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Lee la config de variables globales (ej: window.__firebase_config)
const firebaseConfig = window.__firebase_config || {
  apiKey: "AIzaSyBQEVlZLZzcyQ2qJvbtBeRN7hsV7S2KR58",
  authDomain: "gestion-chc.firebaseapp.com",
  projectId: "gestion-chc",
  storageBucket: "gestion-chc.firebasestorage.app",
  messagingSenderId: "853356444197",
  appId: "1:853356444197:web:01ed88a7a4c2f17252ddcc"
};
const initialAuthToken = window.__firebase_token || null;
const appId = window.__firebase_appId || 'default';

if (!firebaseConfig) throw new Error('No se encontró la configuración de Firebase en el entorno global');

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

// Ruta privada por usuario/app
export function getCollectionPath(userId, collectionName) {
  return `artifacts/${appId}/users/${userId}/${collectionName}`;
}

export { app, db, auth, initialAuthToken };
