// DocumentGeneratorView.js
import React, { useState, useMemo } from 'react';
import { Paper, Typography, Grid, TextField, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Divider, Alert, FormControl, FormLabel, Autocomplete } from '@mui/material';

function generateDocumentNumber(documentos, tipo) {
  const year = new Date().getFullYear();
  const prefix = tipo === 'COTIZACIÓN' ? 'CT' : 'NDE';
  const filtered = documentos.filter(d => d.tipo === tipo && d.numero && d.numero.startsWith(prefix + '-' + year));
  const next = (filtered.length ? Math.max(...filtered.map(d => parseInt(d.numero.split('-')[2] || '0'))) : 0) + 1;
  return `${prefix}-${year}-${String(next).padStart(4, '0')}`;
}

export default function DocumentGeneratorView({ clientes, productos, documentos, onSave, loading, error, userId, appId = 'default' }) {
  const [tipo, setTipo] = useState('COTIZACIÓN');
  const [clienteId, setClienteId] = useState('');
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [moneda, setMoneda] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0,10));
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [iva, setIva] = useState(0.16);
  const [searchProd, setSearchProd] = useState('');

  const cliente = clientes.find(c => c.id === clienteId);
  const producto = productos.find(p => p.id === itemId);
  const numero = useMemo(() => generateDocumentNumber(documentos, tipo), [documentos, tipo]);

  const subtotal = useMemo(() => items.reduce((acc, it) => acc + (parseFloat(it.precioUnitario) * parseInt(it.cantidad)), 0), [items]);
  const ivaMonto = useMemo(() => subtotal * iva, [subtotal, iva]);
  const total = useMemo(() => subtotal + ivaMonto, [subtotal, ivaMonto]);
  const tasa = moneda === 'BS' ? parseFloat(exchangeRate) || 0 : 1;

  function addItem() {
    if (producto && !items.some(it => it.id === producto.id)) {
      setItems([
        ...items,
        {
          id: producto.id,
          codigo: producto.codigo,
          descripcion: producto.descripcion,
          precioUnitario: producto.precioUnitario,
          cantidad: 1
        }
      ]);
      setItemId('');
    }
  }
  function updateCantidad(id, cantidad) {
    setItems(items.map(it => it.id === id ? { ...it, cantidad: parseInt(cantidad) } : it));
  }
  function updatePrecio(id, precioUnitario) {
    setItems(items.map(it => it.id === id ? { ...it, precioUnitario: parseFloat(precioUnitario) } : it));
  }
  function removeItem(id) {
    setItems(items.filter(it => it.id !== id));
  }
  function handleSave() {
    if (!clienteId || items.length === 0) return;
    onSave({
      tipo,
      numero,
      clienteId,
      clienteNombre: cliente?.nombre,
      moneda,
      exchangeRate: tasa,
      fecha,
      items,
      subtotal,
      iva: ivaMonto,
      total,
      totalMoneda: total * tasa,
    });
  }

  const rutaDebug = `artifacts/${appId}/users/${userId}/documentos`;
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#00bcd4', fontWeight: 700 }}>Generador de Cotización</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#888' }}>UID actual: <b>{userId || '---'}</b></Typography>
        <Typography variant="body2" sx={{ color: '#888' }}>Ruta Firestore: <b>{rutaDebug}</b></Typography>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {clientes.length === 0 && <Alert severity="warning" sx={{ mb: 2 }}>No hay clientes registrados. Debes crear al menos uno para generar documentos.</Alert>}
      {productos.length === 0 && <Alert severity="warning" sx={{ mb: 2 }}>No hay productos registrados. Debes crear al menos uno para generar documentos.</Alert>}
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>Tipo de Documento</FormLabel>
            <TextField select value={tipo} onChange={e => setTipo(e.target.value)}>
              <MenuItem value="COTIZACIÓN">COTIZACIÓN</MenuItem>
              <MenuItem value="NOTA DE ENTREGA">NOTA DE ENTREGA</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>Cliente</FormLabel>
            <Autocomplete
              options={clientes}
              getOptionLabel={option => option.nombreEmpresa || option.nombre || ''}
              renderInput={params => (
                <TextField {...params} label="Buscar y seleccionar cliente" variant="outlined" />
              )}
              value={selectedCliente}
              onChange={(_, value) => {
                setSelectedCliente(value);
                setClienteId(value ? value.id : '');
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disabled={clientes.length === 0}
              sx={{ width: 600, minWidth: 400, maxWidth: '100%' }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>Moneda de Cobro</FormLabel>
            <TextField select value={moneda} onChange={e => setMoneda(e.target.value)}>
              <MenuItem value="USD">Dólares (USD)</MenuItem>
              <MenuItem value="BS">Bolívares (Bs)</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>Tasa BCV (Bs por $1)</FormLabel>
            <TextField value={exchangeRate} onChange={e => setExchangeRate(e.target.value)} disabled={moneda !== 'BS'} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>Fecha</FormLabel>
            <TextField value={fecha} onChange={e => setFecha(e.target.value)} type="date" InputLabelProps={{ shrink: true }} />
          </FormControl>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Artículos</Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Autocomplete
            options={productos}
            getOptionLabel={option => `${option.descripcion} (${option.codigo})`}
            renderInput={params => (
              <TextField {...params} label="Buscar y añadir producto" variant="outlined" />
            )}
            value={selectedProduct}
            onChange={(_, value) => {
              setSelectedProduct(value);
              setItemId(value ? value.id : '');
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disabled={productos.length === 0}
            sx={{ width: 400, background: '#fafbfc', borderRadius: 2 }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={addItem} disabled={!itemId || productos.length === 0}>Añadir</Button>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Cant.</TableCell>
            <TableCell>Precio Unitario (USD)</TableCell>
            <TableCell>Total Línea ({moneda})</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(it => (
            <TableRow key={it.id}>
              <TableCell>{it.descripcion}</TableCell>
              <TableCell>
                <TextField type="number" size="small" value={it.cantidad} onChange={e => updateCantidad(it.id, e.target.value)} sx={{ width: 70 }} />
              </TableCell>
              <TableCell>
                <TextField type="number" size="small" value={it.precioUnitario} onChange={e => updatePrecio(it.id, e.target.value)} sx={{ width: 100 }} />
              </TableCell>
              <TableCell>{((it.precioUnitario * it.cantidad) * tasa).toFixed(2)}</TableCell>
              <TableCell><Button color="error" onClick={() => removeItem(it.id)}>Eliminar</Button></TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">Añada productos de su inventario.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Paper sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="subtitle2" sx={{ color: '#888' }}>Cálculo en {moneda === 'USD' ? 'USD ($)' : 'Bs'}</Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <span>Subtotal:</span>
            <span>{(subtotal * tasa).toFixed(2)}</span>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <span>IVA (16%):</span>
            <span>{(ivaMonto * tasa).toFixed(2)}</span>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#00bcd4', fontSize: 20 }}>
            <span>Total:</span>
            <span>{(total * tasa).toFixed(2)}</span>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleSave} disabled={!clienteId || items.length === 0 || (moneda === 'BS' && !exchangeRate) || loading || clientes.length === 0 || productos.length === 0}>
          Guardar Documento
        </Button>
      </Box>
    </Paper>
  );
}
