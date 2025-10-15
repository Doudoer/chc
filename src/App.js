

import React, { useState } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';
import CrearDocumento from './CrearDocumento';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('admin');

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  // Pasar setPage a los paneles para navegación
  if (page === 'crear') {
    return <CrearDocumento onBack={() => setPage('admin')} />;
  }
  return <AdminPanel onCrearDocumento={() => setPage('crear')} />;
}

export default App;
