import React from 'react';
import { AppBar, Toolbar, Typography, Button, Chip } from '@mui/material';

export default function HeaderBar({ onInicio, onCrearDocumento, onDocumentos, onProductos, onClientes, userId, userEmail, onLogout }) {
  let rol = '';
  if (userEmail === 'douglasvillalobos4@gmail.com') rol = 'Administrador';
  else if (userEmail === 'user@chc.com') rol = 'Operador';
  else if (userEmail) rol = 'Usuario';
  return (
    <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, color: '#00bcd4', fontWeight: 700 }}>
          Confecciones App
        </Typography>
        {rol && (
          <Chip label={rol} color={rol === 'Administrador' ? 'success' : rol === 'Operador' ? 'default' : 'info'} sx={{ mr: 2, fontWeight: 700 }} />
        )}
        <Button color="primary" variant="contained" sx={{ mr: 2, background: '#00bcd4' }} onClick={onInicio}>INICIO</Button>
        <Button color="inherit" onClick={onCrearDocumento}>CREAR DOCUMENTO</Button>
        <Button color="inherit" onClick={onDocumentos}>DOCUMENTOS</Button>
        <Button color="inherit" onClick={onProductos}>INVENTARIO</Button>
        <Button color="inherit" onClick={onClientes}>CLIENTES</Button>
        <Button color="error" variant="outlined" sx={{ ml: 2 }} onClick={onLogout} className="print-hide">
          CERRAR SESIÓN
        </Button>
      </Toolbar>
    </AppBar>
  );
}
