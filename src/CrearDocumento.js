
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Paper, Grid, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';

const tiposDocumento = [
  { value: 'COTIZACIÓN', label: 'COTIZACIÓN' },
  { value: 'NOTA DE ENTREGA', label: 'NOTA DE ENTREGA' },
];
const monedas = [
  { value: 'USD', label: 'Dólares (USD)' },
  { value: 'BS', label: 'Bolívares (Bs)' },
];

export default function CrearDocumento({ onBack }) {
  const [tipoDoc, setTipoDoc] = useState('COTIZACIÓN');
  const [cliente, setCliente] = useState('');

  const [moneda, setMoneda] = useState('USD');
  const clientes = [
    { value: '', label: 'Seleccione un Cliente', disabled: true },
    { value: 'asdasd', label: 'asdasd (aasdasd)' },
  ];

  return (
    <Box sx={{ background: '#f6f8fa', minHeight: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#00bcd4', fontWeight: 700 }}>
            Confecciones App
          </Typography>
          <Button color="inherit" onClick={onBack}>INICIO</Button>
          <Button color="primary" variant="contained" sx={{ mr: 2, background: '#00bcd4' }}>CREAR DOCUMENTO</Button>
          <Button color="inherit">DOCUMENTOS</Button>
          <Button color="inherit">INVENTARIO</Button>
          <Button color="inherit">CLIENTES</Button>
          <Typography variant="body2" sx={{ ml: 4, color: '#888' }}>
            Usuario ID: 022215202505053263274
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 500, mb: 2 }}>
          {`Generador de ${tipoDoc === 'COTIZACIÓN' ? 'Cotización' : 'Nota de Entrega'}`}
        </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Tipo de Documento"
              fullWidth
              value={tipoDoc}
              onChange={e => setTipoDoc(e.target.value)}
            >
              {tiposDocumento.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Cliente"
              fullWidth
              value={cliente}
              onChange={e => setCliente(e.target.value)}
              InputLabelProps={{ shrink: true }}
              SelectProps={{ displayEmpty: true }}
              sx={{ minWidth: 220 }}
            >
              {clientes.map(option => (
                <MenuItem key={option.value} value={option.value} disabled={option.disabled || false}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Moneda de Cobro"
              fullWidth
              value={moneda}
              onChange={e => setMoneda(e.target.value)}
              sx={{ minWidth: 220 }}
            >
              {monedas.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Tasa BCV (Bs por $1)" fullWidth sx={{ minWidth: 220 }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Fecha" fullWidth value={new Date().toLocaleDateString('en-CA')} InputLabelProps={{ shrink: true }} sx={{ minWidth: 220 }} />
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#888' }}>Documento en USD</Typography>
      </Paper>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#00bcd4', fontWeight: 400, mb: 2 }}>Artículos</Typography>
        <TextField label="Añadir Producto" fullWidth sx={{ mb: 2 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#e0f7fa' }}>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cant.</TableCell>
                <TableCell>Precio Unitario (USD)</TableCell>
                <TableCell>Total Línea (USD)</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: '#888' }}>
                  Añada productos de su inventario.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} sm={4} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#888' }}>Cálculo en USD ($)</Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <span>Subtotal:</span>
              <span>$0.00</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <span>IVA (16%):</span>
              <span>$0.00</span>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#00bcd4', fontSize: 20 }}>
              <span>Total:</span>
              <span>$0.00</span>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}