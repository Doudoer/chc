import React, { useState } from 'react';
import {
  Box, Paper, Typography, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

export default function ClientesCrud({ clientes, performAction, loading }) {
  const [form, setForm] = useState({ nombreEmpresa: '', rif: '', direccion: '', telefono: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await performAction('clientes', 'update', form, editId);
      setEditId(null);
    } else {
      await performAction('clientes', 'add', form);
    }
    setForm({ nombreEmpresa: '', rif: '', direccion: '', telefono: '' });
  };

  const handleEdit = cli => {
    setForm({
      nombreEmpresa: cli.nombreEmpresa,
      rif: cli.rif,
      direccion: cli.direccion,
      telefono: cli.telefono
    });
    setEditId(cli.id);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar cliente?')) {
      await performAction('clientes', 'delete', null, id);
    }
  };

  const handleClear = () => {
    setEditId(null);
    setForm({ nombreEmpresa: '', rif: '', direccion: '', telefono: '' });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ color: '#06b6d4', fontWeight: 'bold', mb: 3 }}>Gestión de Clientes</Typography>
      <Paper sx={{ p: 3, mb: 3, borderTop: '4px solid #06b6d4', boxShadow: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#222' }}>Añadir Nuevo Cliente</Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField name="nombreEmpresa" label="Nombre de la Empresa *" value={form.nombreEmpresa} onChange={handleChange} required fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField name="rif" label="RIF / C.I. *" value={form.rif} onChange={handleChange} required fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField name="direccion" label="Dirección" value={form.direccion} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField name="telefono" label="Teléfono" value={form.telefono} onChange={handleChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={12} md={8} display="flex" justifyContent="flex-end" alignItems="center">
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
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>RIF</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Dirección</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Teléfono</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map(cli => (
              <TableRow key={cli.id}>
                <TableCell>{cli.nombreEmpresa}</TableCell>
                <TableCell>{cli.rif}</TableCell>
                <TableCell>{cli.direccion}</TableCell>
                <TableCell>{cli.telefono}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleEdit(cli)}>Editar</Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(cli.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
            {clientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay datos de clientes registrados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
