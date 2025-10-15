
import React, { useState, useMemo } from 'react';
import {
  Box, Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider
} from '@mui/material';

export default function GeneradorDocumento({ clientes, productos, onGuardar, loading }) {
  const [tipo, setTipo] = useState('COTIZACION');
  const [clienteId, setClienteId] = useState('');
  const [moneda, setMoneda] = useState('USD');
  const [tasa, setTasa] = useState('');
  const [items, setItems] = useState([]);
  const [fecha] = useState(new Date().toLocaleDateString('es-VE'));

  // Cálculos
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + (i.cantidad * i.precioUnitario), 0), [items]);
  const iva = useMemo(() => subtotal * 0.16, [subtotal]);
  const total = useMemo(() => subtotal + iva, [subtotal, iva]);

  // Handlers
  const handleAddItem = (id) => {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    setItems([...items, { ...prod, cantidad: 1 }]);
  };
  const handleItemChange = (idx, field, value) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const handleRemoveItem = idx => setItems(items.filter((_, i) => i !== idx));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: '#06b6d4', mb: 3, fontWeight: 'bold' }}>Generador de Cotización</Typography>
      <Paper sx={{ p: 3, mb: 3, borderTop: '4px solid #06b6d4', boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de Documento</InputLabel>
              <Select value={tipo} label="Tipo de Documento" onChange={e => setTipo(e.target.value)}>
                <MenuItem value="COTIZACION">COTIZACIÓN</MenuItem>
                <MenuItem value="NOTA_DE_ENTREGA">NOTA DE ENTREGA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Cliente</InputLabel>
              <Select value={clienteId} label="Cliente" onChange={e => setClienteId(e.target.value)}>
                <MenuItem value=""><em>Seleccione un Cliente</em></MenuItem>
                {clientes.map(c => (
                  <MenuItem key={c.id} value={c.id}>{c.nombreEmpresa} ({c.rif})</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Moneda de Cobro</InputLabel>
              <Select value={moneda} label="Moneda de Cobro" onChange={e => setMoneda(e.target.value)}>
                <MenuItem value="USD">Dólares (USD)</MenuItem>
                <MenuItem value="VES">Bolívares (Bs)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Tasa BCV (Bs por $1)" value={tasa} onChange={e => setTasa(e.target.value)} disabled={moneda === 'USD'} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Fecha" value={fecha} disabled fullWidth size="small" />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 3, mb: 3, borderTop: '4px solid #06b6d4', boxShadow: 1 }}>
        <Typography variant="h5" sx={{ color: '#06b6d4', mb: 2, fontWeight: 'bold' }}>Artículos</Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Añadir Producto</InputLabel>
          <Select value="" label="Añadir Producto" onChange={e => handleAddItem(e.target.value)}>
            <MenuItem value="" disabled><em>Seleccione un producto para añadir</em></MenuItem>
            {productos.map(p => (
              <MenuItem key={p.id} value={p.id}>{p.codigo} - {p.descripcion} (${parseFloat(p.precioUnitario || 0).toFixed(2)})</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#e0f7fa' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Código</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Descripción</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Cant.</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Precio Unitario ({moneda})</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Total Línea ({moneda})</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell align="right">
                    <TextField type="number" value={item.cantidad} onChange={e => handleItemChange(idx, 'cantidad', parseInt(e.target.value) || 0)} size="small" sx={{ width: 60 }} />
                  </TableCell>
                  <TableCell align="right">
                    <TextField type="number" value={item.precioUnitario} onChange={e => handleItemChange(idx, 'precioUnitario', parseFloat(e.target.value) || 0)} size="small" sx={{ width: 100 }} />
                  </TableCell>
                  <TableCell align="right">{(item.cantidad * item.precioUnitario).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Button color="error" variant="outlined" size="small" onClick={() => handleRemoveItem(idx)} sx={{ minWidth: 0, px: 1 }}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">Añada productos de su inventario.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, bgcolor: '#f9fafb', boxShadow: 0, border: '1px solid #e0e0e0' }}>
              <Typography variant="body2" color="textSecondary">Cálculo en USD ($)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></Box>
              <Box display="flex" justifyContent="space-between"><span>IVA (16%):</span><span>${iva.toFixed(2)}</span></Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between" fontWeight="bold" color="#06b6d4">
                <span>Total:</span><span>${total.toFixed(2)}</span>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" disabled={loading || !clienteId || items.length === 0} sx={{ fontWeight: 'bold', px: 4, py: 1, fontSize: 16 }} onClick={() => onGuardar && onGuardar({ tipo, clienteId, moneda, tasa, items, subtotal, iva, total, fecha })}>
            + GUARDAR COTIZACIÓN
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
