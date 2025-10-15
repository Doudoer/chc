import React from 'react';
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

export default function DocumentosCrud({ documentos, clientes = [] }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ color: '#06b6d4', fontWeight: 'bold', mb: 3 }}>Historial de Documentos</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#e0f7fa' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Número</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Moneda</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#06b6d4' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">No hay documentos registrados.</TableCell>
              </TableRow>
            )}
            {documentos.map(doc => {
              const cliente = clientes.find(c => c.id === doc.clienteId);
              return (
                <TableRow key={doc.id}>
                  <TableCell>{doc.numero}</TableCell>
                  <TableCell>{doc.tipo}</TableCell>
                  <TableCell>{cliente ? `${cliente.nombreEmpresa} (${cliente.rif})` : doc.clienteId}</TableCell>
                  <TableCell>{doc.fecha}</TableCell>
                  <TableCell>{doc.total}</TableCell>
                  <TableCell>{doc.moneda || ''}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
