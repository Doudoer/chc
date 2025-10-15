// Archivo principal de la app React para gestión de confecciones usando Supabase en vez de Firebase.
// Aquí irá el nuevo código adaptado a Supabase.



import React, { useState } from 'react';
import { useAuthAndData } from './hooksSupabase';
import { useSupabaseActions } from './supabaseActions';
import ProductosCrud from './ProductosCrud';
import ClientesCrud from './ClientesCrud';
import DocumentosCrud from './DocumentosCrud';

export default function App() {
  const { user, isAuthReady, error, productos, clientes, documentos } = useAuthAndData();
  const { loading, actionError, performAction } = useSupabaseActions();
  const [view, setView] = useState('DASHBOARD');

  if (!isAuthReady) {
    return <div>Cargando autenticación...</div>;
  }

  return (
    <div>
      <h1>Confecciones App (Supabase)</h1>
      <div>
        <button onClick={() => setView('DASHBOARD')}>Inicio</button>
        <button onClick={() => setView('CLIENTES')}>Clientes</button>
        <button onClick={() => setView('PRODUCTOS')}>Productos</button>
        <button onClick={() => setView('DOCUMENTOS')}>Documentos</button>
      </div>
      <div>
        Usuario: {user?.id}
      </div>
      {error && <div style={{color:'red'}}>{error}</div>}
      {actionError && <div style={{color:'red'}}>{actionError}</div>}
      {view === 'PRODUCTOS' ? (
        <ProductosCrud productos={productos} performAction={performAction} loading={loading} />
      ) : view === 'CLIENTES' ? (
        <ClientesCrud clientes={clientes} performAction={performAction} loading={loading} />
      ) : view === 'DOCUMENTOS' ? (
        <DocumentosCrud documentos={documentos} performAction={performAction} loading={loading} clientes={clientes} />
      ) : (
        <>
          <pre>Productos: {JSON.stringify(productos, null, 2)}</pre>
          <pre>Clientes: {JSON.stringify(clientes, null, 2)}</pre>
          <pre>Documentos: {JSON.stringify(documentos, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
