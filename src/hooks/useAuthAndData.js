// useAuthAndData.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, auth, getCollectionPath } from '../firebaseGlobal';

export function useAuthAndData() {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState(null);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [autoLogin, setAutoLogin] = useState(true);

  useEffect(() => {
    if (!autoLogin) return;
    let unsubscribes = [];
    let authUnsub;
    setIsAuthReady(false);
    setError(null);

    // UID real fijo
    const realUid = 'GCzGtPWctQhkxMW5aOswznnyQay2';

    // Función para obtener el token personalizado desde el backend local
    async function fetchCustomToken() {
      try {
        const res = await fetch('http://localhost:3001/custom-token');
        if (!res.ok) throw new Error('No se pudo obtener el token');
        const { token } = await res.json();
        return token;
      } catch (err) {
        setError('Error obteniendo token: ' + err.message);
        return null;
      }
    }

    authUnsub = onAuthStateChanged(auth, async (user) => {
      if (user && user.uid === realUid) {
        setUserId(user.uid);
        setUserEmail(user.email || null);
        // Suscribirse a colecciones
        const colNames = ['productos', 'clientes', 'documentos'];
        unsubscribes = colNames.map((col) => {
          const q = query(collection(db, getCollectionPath(user.uid, col)));
          return onSnapshot(q, (snap) => {
            const arr = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (col === 'productos') setProductos(arr);
            if (col === 'clientes') setClientes(arr);
            if (col === 'documentos') setDocumentos(arr);
          });
        });
        setIsAuthReady(true);
      } else {
        // Siempre forzar login con token personalizado
        try {
          const token = await fetchCustomToken();
          if (token) {
            await signInWithCustomToken(auth, token);
          }
        } catch (err) {
          setError('Error de autenticación: ' + err.message);
        }
      }
    }, (err) => setError('Error de autenticación: ' + err.message));

    return () => {
      unsubscribes.forEach(unsub => unsub && unsub());
      if (authUnsub) authUnsub();
    };
  }, [autoLogin]);

  // Función para cerrar sesión y detener login automático
  const logout = async () => {
    await signOut(auth);
    setUserId(null);
    setIsAuthReady(false);
    setProductos([]);
    setClientes([]);
    setDocumentos([]);
    setAutoLogin(false);
  };

  return { userId, userEmail, isAuthReady, error, productos, clientes, documentos, logout, autoLogin, setAutoLogin };
}
