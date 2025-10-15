import React from 'react';
import HeaderBar from './HeaderBar';

export default function Layout({ children, page, setPage, userId, onLogout }) {
  return (
    <>
      <HeaderBar
        onInicio={() => setPage('admin')}
        onCrearDocumento={() => setPage('documento')}
        onDocumentos={() => setPage('documentos')}
        onProductos={() => setPage('productos')}
        onClientes={() => setPage('clientes')}
        userId={userId}
        onLogout={onLogout}
      />
      {children}
    </>
  );
}
