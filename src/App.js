// Archivo principal de la app React para gestión de confecciones usando Supabase en vez de Firebase.
// Aquí irá el nuevo código adaptado a Supabase.

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Paper, Card, CardContent, Box } from '@mui/material';
import { useAuthAndData } from './hooksSupabase';
import { useSupabaseActions } from './supabaseActions';
import ProductosCrud from './ProductosCrud';
import ClientesCrud from './ClientesCrud';
import DocumentosCrud from './DocumentosCrud';
import GeneradorDocumento from './GeneradorDocumento';

export default function App() {
  const { user, isAuthReady, error, productos, clientes, documentos } = useAuthAndData();
  const { loading, actionError, performAction } = useSupabaseActions();
  const [view, setView] = useState('DASHBOARD');

  if (!isAuthReady) {
    return <div>Cargando autenticación...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#06b6d4', fontWeight: 'bold' }}>
            Confecciones App
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={view === 'DASHBOARD' ? 'contained' : 'text'}
              color={view === 'DASHBOARD' ? 'primary' : 'inherit'}
              onClick={() => setView('DASHBOARD')}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 2.5,
                boxShadow: view === 'DASHBOARD' ? 2 : 0,
                transition: 'all 0.2s',
                bgcolor: view === 'DASHBOARD' ? '#06b6d4' : 'transparent',
                color: view === 'DASHBOARD' ? '#fff' : '#06b6d4',
                '&:hover': {
                  bgcolor: view === 'DASHBOARD' ? '#039cb7' : '#e0f7fa',
                  color: '#06b6d4',
                },
              }}
            >INICIO</Button>
            <Button
              variant={view === 'GENERATOR' ? 'contained' : 'text'}
              color={view === 'GENERATOR' ? 'primary' : 'inherit'}
              onClick={() => setView('GENERATOR')}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 2.5,
                boxShadow: view === 'GENERATOR' ? 2 : 0,
                transition: 'all 0.2s',
                bgcolor: view === 'GENERATOR' ? '#06b6d4' : 'transparent',
                color: view === 'GENERATOR' ? '#fff' : '#06b6d4',
                '&:hover': {
                  bgcolor: view === 'GENERATOR' ? '#039cb7' : '#e0f7fa',
                  color: '#06b6d4',
                },
              }}
            >CREAR DOCUMENTO</Button>
            <Button
              variant={view === 'DOCUMENTOS' ? 'contained' : 'text'}
              color={view === 'DOCUMENTOS' ? 'primary' : 'inherit'}
              onClick={() => setView('DOCUMENTOS')}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 2.5,
                boxShadow: view === 'DOCUMENTOS' ? 2 : 0,
                transition: 'all 0.2s',
                bgcolor: view === 'DOCUMENTOS' ? '#06b6d4' : 'transparent',
                color: view === 'DOCUMENTOS' ? '#fff' : '#06b6d4',
                '&:hover': {
                  bgcolor: view === 'DOCUMENTOS' ? '#039cb7' : '#e0f7fa',
                  color: '#06b6d4',
                },
              }}
            >DOCUMENTOS</Button>
            <Button
              variant={view === 'PRODUCTOS' ? 'contained' : 'text'}
              color={view === 'PRODUCTOS' ? 'primary' : 'inherit'}
              onClick={() => setView('PRODUCTOS')}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 2.5,
                boxShadow: view === 'PRODUCTOS' ? 2 : 0,
                transition: 'all 0.2s',
                bgcolor: view === 'PRODUCTOS' ? '#06b6d4' : 'transparent',
                color: view === 'PRODUCTOS' ? '#fff' : '#06b6d4',
                '&:hover': {
                  bgcolor: view === 'PRODUCTOS' ? '#039cb7' : '#e0f7fa',
                  color: '#06b6d4',
                },
              }}
            >INVENTARIO</Button>
            <Button
              variant={view === 'CLIENTES' ? 'contained' : 'text'}
              color={view === 'CLIENTES' ? 'primary' : 'inherit'}
              onClick={() => setView('CLIENTES')}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 2.5,
                boxShadow: view === 'CLIENTES' ? 2 : 0,
                transition: 'all 0.2s',
                bgcolor: view === 'CLIENTES' ? '#06b6d4' : 'transparent',
                color: view === 'CLIENTES' ? '#fff' : '#06b6d4',
                '&:hover': {
                  bgcolor: view === 'CLIENTES' ? '#039cb7' : '#e0f7fa',
                  color: '#06b6d4',
                },
              }}
            >CLIENTES</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ fontWeight: 500, borderRadius: 2, px: 2, py: 0.5, textTransform: 'none' }}
              onClick={() => {
                if (window.confirm('¿Seguro que deseas cerrar sesión?')) {
                  if (window.supabase) {
                    window.supabase.auth.signOut();
                  } else if (window.location) {
                    window.location.reload();
                  }
                }
              }}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {error && <Box sx={{ color: 'red', p: 2 }}>{error}</Box>}
      {actionError && <Box sx={{ color: 'red', p: 2 }}>{actionError}</Box>}
      {view === 'PRODUCTOS' ? (
        <ProductosCrud productos={productos} performAction={performAction} loading={loading} />
      ) : view === 'CLIENTES' ? (
        <ClientesCrud clientes={clientes} performAction={performAction} loading={loading} />
      ) : view === 'DOCUMENTOS' ? (
        <DocumentosCrud documentos={documentos} performAction={performAction} loading={loading} clientes={clientes} />
      ) : view === 'GENERATOR' ? (
        <GeneradorDocumento
          clientes={clientes}
          productos={productos}
          loading={loading}
          onGuardar={(doc) => performAction('crearDocumento', doc)}
        />
      ) : (
        // ...existing code...
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#06b6d4', mb: 4 }}>
            Resumen del Sistema
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderBottom: '4px solid #f59e0b' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary">Productos en Catálogo</Typography>
                  <Typography variant="h4" sx={{ color: '#f59e0b', textAlign: 'center' }}>{productos.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderBottom: '4px solid #10b981' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary">Clientes Registrados</Typography>
                  <Typography variant="h4" sx={{ color: '#10b981', textAlign: 'center' }}>{clientes.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderBottom: '4px solid #ef4444' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary">Cotizaciones Pendientes</Typography>
                  <Typography variant="h4" sx={{ color: '#ef4444', textAlign: 'center' }}>{documentos.filter(d => d.tipo === 'COTIZACION').length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderBottom: '4px solid #06b6d4' }}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary">Total Ventas (NDE) Ref.</Typography>
                  <Typography variant="h4" sx={{ color: '#06b6d4', textAlign: 'center' }}>
                    ${documentos.filter(d => d.tipo === 'NOTA_DE_ENTREGA').reduce((sum, d) => sum + (parseFloat(d.total || 0)), 0).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="h4" gutterBottom sx={{ color: '#06b6d4', mb: 2 }}>
            Historial de Documentos
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', background: '#e0f7fa' }}>
              <Box component="thead">
                <Box component="tr">
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Número</Box>
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Tipo</Box>
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Cliente</Box>
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Fecha</Box>
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Total</Box>
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Moneda</Box>
                  <Box component="th" sx={{ p: 1, fontWeight: 'bold' }}>Acciones</Box>
                </Box>
              </Box>
              <Box component="tbody" sx={{ background: '#fff' }}>
                {documentos.length === 0 && (
                  <Box component="tr">
                    <Box component="td" colSpan={7} sx={{ textAlign: 'center', p: 2 }}>
                      No hay documentos registrados.
                    </Box>
                  </Box>
                )}
                {documentos.map(doc => {
                  const cliente = clientes.find(c => c.id === doc.clienteId);
                  return (
                    <Box component="tr" key={doc.id}>
                      <Box component="td" sx={{ p: 1 }}>{doc.numero}</Box>
                      <Box component="td" sx={{ p: 1 }}>{doc.tipo}</Box>
                      <Box component="td" sx={{ p: 1 }}>{cliente ? `${cliente.nombreEmpresa} (${cliente.rif})` : doc.clienteId}</Box>
                      <Box component="td" sx={{ p: 1 }}>{doc.fecha}</Box>
                      <Box component="td" sx={{ p: 1 }}>{doc.total}</Box>
                      <Box component="td" sx={{ p: 1 }}>{doc.moneda || ''}</Box>
                      <Box component="td" sx={{ p: 1 }}>-</Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Paper>
        </Box>
        // ...existing code...
      )}
    </Box>
  );
}
