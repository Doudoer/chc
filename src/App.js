

import React, { useState } from 'react';
import { useAuthAndData } from './hooks/useAuthAndData';
import { useFirebaseActions } from './hooks/useFirebaseActions';
import LoadingView from './components/LoadingView';
import CrudView from './components/CrudView';
import DocumentGeneratorView from './components/DocumentGeneratorView';
import DocumentosView from './components/DocumentosView';
import AdminPanel from './AdminPanel';
import Layout from './components/Layout';
import Login from './Login';

function App() {
  const [page, setPage] = useState('admin');
  const { userId, userEmail, isAuthReady, error, productos, clientes, documentos, logout, autoLogin, setAutoLogin } = useAuthAndData();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { addItem, updateItem, deleteItem, loading, actionError } = useFirebaseActions(userId);


  if (!autoLogin && !showLoginForm) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h2>Sesión cerrada</h2>
        <button style={{ padding: 12, fontSize: 18 }} onClick={() => setShowLoginForm(true)}>Iniciar sesión</button>
      </div>
    );
  }

  if (showLoginForm) {
    return <Login onLogin={() => { setShowLoginForm(false); setAutoLogin(true); }} />;
  }

  if (!isAuthReady) return <LoadingView loading={!isAuthReady} error={error} />;

  return (
    <Layout page={page} setPage={setPage} userId={userId} onLogout={logout}>
      {page === 'clientes' && (
        <CrudView
          title="Clientes"
          type="clientes"
          data={clientes}
          userEmail={userEmail}
          onAdd={item => {
            if (!item.fechaCreacion) item.fechaCreacion = new Date().toISOString();
            // Forzar teléfono como string
            if (item.telefono !== undefined && item.telefono !== null) item.telefono = String(item.telefono);
            addItem('clientes', item);
          }}
          onEdit={(id, item) => {
            if (!item.fechaCreacion) item.fechaCreacion = new Date().toISOString();
            if (item.telefono !== undefined && item.telefono !== null) item.telefono = String(item.telefono);
            id ? updateItem('clientes', id, item) : addItem('clientes', item);
          }}
          onDelete={id => deleteItem('clientes', id)}
          loading={loading}
          error={actionError}
        />
      )}
      {page === 'productos' && (
        <CrudView
          title="Productos"
          type="productos"
          data={productos}
          userEmail={userEmail}
          onAdd={item => {
            // Generar código aleatorio si no viene del formulario
            const codigo = item.codigo && item.codigo.length === 5 ? item.codigo : Math.floor(10000 + Math.random() * 90000).toString();
            const prod = {
              codigo,
              descripcion: item.descripcion || '',
              precioUnitario: Number(item.precioUnitario) || 0
            };
            addItem('productos', prod);
          }}
          onEdit={(id, item) => {
            const prod = {
              codigo: item.codigo || '',
              descripcion: item.descripcion || '',
              precioUnitario: Number(item.precioUnitario) || 0
            };
            id ? updateItem('productos', id, prod) : addItem('productos', prod);
          }}
          onDelete={id => deleteItem('productos', id)}
          loading={loading}
          error={actionError}
        />
      )}
      {page === 'documento' && (
        <DocumentGeneratorView
          clientes={clientes}
          productos={productos}
          documentos={documentos}
          userId={userId}
          appId={window.__firebase_appId || 'default'}
          onSave={doc => {
            // Buscar snapshot de cliente
            const cliente = clientes.find(c => c.id === doc.clienteId) || {};
            // Estructura de items
            const items = (doc.items || []).map(it => ({
              productId: it.id,
              codigo: it.codigo,
              descripcion: it.descripcion,
              cantidad: it.cantidad,
              precioUnitario: it.precioUnitario,
              lineTotal: Number(it.precioUnitario) * Number(it.cantidad)
            }));
            // Documento completo
            const documento = {
              tipo: doc.tipo,
              numero: doc.numero,
              fecha: doc.fecha,
              clienteId: doc.clienteId,
              clienteInfo: {
                nombreEmpresa: cliente.nombreEmpresa,
                rif: cliente.rif,
                direccion: cliente.direccion,
                telefono: cliente.telefono
              },
              estado: 'Pendiente',
              currency: doc.moneda === 'BS' ? 'VES' : 'USD',
              exchangeRate: doc.exchangeRate,
              ivaTasa: 0.16,
              subtotal: doc.subtotal,
              total: doc.total,
              usdTotal: doc.moneda === 'USD' ? doc.total : (doc.total / (doc.exchangeRate || 1)),
              items
            };
            addItem('documentos', documento);
          }}
          loading={loading}
          error={actionError}
        />
      )}
      {page === 'documentos' && (
        <DocumentosView documentos={documentos} userEmail={userEmail} onDelete={id => deleteItem('documentos', id)} />
      )}
      {page === 'admin' && (
        <AdminPanel
          onCrearDocumento={() => setPage('documento')}
          onClientes={() => setPage('clientes')}
          onProductos={() => setPage('productos')}
          resumen={{
            productos: productos.length,
            clientes: clientes.length,
            cotizaciones: documentos.filter(d => d.tipo === 'COTIZACIÓN').length,
            notasEntrega: documentos.filter(d => d.tipo === 'NOTA DE ENTREGA').length,
            ventas: documentos.filter(d => d.tipo === 'NOTA DE ENTREGA').reduce((acc, d) => acc + (d.totalMoneda || 0), 0)
          }}
          documentos={documentos}
        />
      )}
    </Layout>
  );
}

export default App;
