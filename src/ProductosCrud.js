import React, { useState } from 'react';
import {
  Box, Paper, Typography, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

export default function ProductosCrud({ productos, performAction, loading }) {
  const [form, setForm] = useState({ codigo: '', descripcion: '', precioUnitario: '', stock: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      ...form,
      precioUnitario: parseFloat(form.precioUnitario) || 0,
      stock: parseInt(form.stock) || 0
    };
    if (editId) {
      await performAction('productos', 'update', data, editId);
      setEditId(null);
    } else {
      await performAction('productos', 'add', data);
    }
    setForm({ codigo: '', descripcion: '', precioUnitario: '', stock: '' });
  };

  const handleEdit = prod => {
    setForm({
      codigo: prod.codigo,
      descripcion: prod.descripcion,
      precioUnitario: prod.precioUnitario,
      stock: prod.stock
    });
    setEditId(prod.id);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar producto?')) {
      await performAction('productos', 'delete', null, id);
    }
  };

  const handleClear = () => {
    setEditId(null);
    setForm({ codigo: '', descripcion: '', precioUnitario: '', stock: '' });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ color: '#06b6d4', fontWeight: 'bold', mb: 3 }}>Gestión de Productos</Typography>
      <Paper sx={{ p: 3, mb: 3, borderTop: '4px solid #06b6d4', boxShadow: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#222' }}>Añadir Nuevo Producto</Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField name="codigo" label="Código *" value={form.codigo} onChange={handleChange} required fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField name="descripcion" label="Descripción *" value={form.descripcion} onChange={handleChange} required fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField name="precioUnitario" label="Precio Unitario (USD) *" value={form.precioUnitario} onChange={handleChange} required fullWidth size="small" type="number" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField name="stock" label="Stock *" value={form.stock} onChange={handleChange} required fullWidth size="small" type="number" />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="center" sx={{ mt: 2 }}>
              <Button variant="outlined" color="primary" onClick={handleClear} sx={{ mr: 2, minWidth: 110 }}>LIMPIAR</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ minWidth: 110 }}>{editId ? 'GUARDAR' : 'AÑADIR'}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#e0f7fa' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Código</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Precio (USD)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map(prod => (
              <TableRow key={prod.id}>
                <TableCell>{prod.codigo}</TableCell>
                <TableCell>{prod.descripcion}</TableCell>
                <TableCell>{prod.precioUnitario}</TableCell>
                <TableCell>{prod.stock}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleEdit(prod)}>Editar</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(prod.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
            {productos.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay datos de productos registrados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
