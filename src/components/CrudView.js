// CrudView.js
import React, { useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Button, IconButton, Box, Dialog, DialogTitle, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataForm from './DataForm';

export default function CrudView({ title, type, data, onAdd, onEdit, onDelete, loading, error, userEmail }) {
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  const isCliente = type === 'clientes';
  const columns = isCliente
    ? [
        { key: 'nombreEmpresa', label: 'Nombre Empresa' },
        { key: 'rif', label: 'RIF' },
        { key: 'direccion', label: 'Dirección' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'fechaCreacion', label: 'Fecha de Creación' },
      ]
    : [
        { key: 'codigo', label: 'Código' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'precioUnitario', label: 'Precio' },
      ];

  // Filtrado en tiempo real
  const filteredData = data.filter(row => {
    if (!search) return true;
    const texto = search.toLowerCase();
    if (type === 'clientes') {
      return (
        (row.nombreEmpresa || '').toLowerCase().includes(texto) ||
        (row.rif || '').toLowerCase().includes(texto) ||
        (row.direccion || '').toLowerCase().includes(texto) ||
        (row.telefono || '').toLowerCase().includes(texto)
      );
    } else {
      return (
        (row.codigo || '').toString().toLowerCase().includes(texto) ||
        (row.descripcion || '').toLowerCase().includes(texto)
      );
    }
  });

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <Button variant="contained" onClick={() => setEditItem({})}>Nuevo</Button>
      </Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="text"
          placeholder={type === 'clientes' ? 'Buscar cliente...' : 'Buscar producto...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #ccc', minWidth: 220 }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#e0f7fa' }}>
              {columns.map(col => (
                <TableCell key={col.key} sx={{ fontWeight: 700 }}>{col.label}</TableCell>
              ))}
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map(row => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns.map(col =>
                    <TableCell key={col.key} sx={{ fontWeight: col.key === 'codigo' ? 700 : 400 }}>
                      {col.key === 'codigo' ? <b>{row[col.key]}</b>
                        : col.key === 'precioUnitario' ? (typeof row[col.key] === 'number' ? row[col.key].toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) : '')
                        : (col.key === 'fechaCreacion' && row[col.key] ? (row[col.key].slice(0,10)) : row[col.key] || '')}
                    </TableCell>
                  )}
                  <TableCell sx={{ textAlign: 'right', minWidth: 120 }}>
                    <Button size="small" sx={{ color: '#00bcd4', fontWeight: 700, mr: 1, minWidth: 0, p: 0 }} onClick={() => setEditItem(row)}>EDITAR</Button>
                    <Button size="small" sx={{ color: '#e53935', fontWeight: 700, minWidth: 0, p: 0 }} onClick={() => setDeleteId(row.id)}>ELIMINAR</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" sx={{ color: '#888' }}>No hay datos.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Formulario de edición/creación */}
      {editItem !== null && (
        <DataForm
          open={true}
          onClose={() => setEditItem(null)}
          onSave={item => {
            if (editItem && editItem.id) {
              onEdit(editItem.id, item);
            } else {
              onAdd(item);
            }
            setEditItem(null);
          }}
          initialData={editItem}
          type={type}
          error={error}
        />
      )}
      {/* Modal de confirmación para eliminar */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <Box sx={{ p: 3 }}>
          <Typography>¿Seguro que deseas eliminar este {type === 'clientes' ? 'cliente' : 'producto'}?</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setDeleteId(null)} sx={{ mr: 2 }}>Cancelar</Button>
            <Button color="error" variant="contained" onClick={() => { onDelete(deleteId); setDeleteId(null); }}>Eliminar</Button>
          </Box>
        </Box>
      </Dialog>
    </Paper>
  );
}
