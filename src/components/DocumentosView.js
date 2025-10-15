import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Dialog } from '@mui/material';
import DocumentPrintModal from './DocumentPrintModal';

export default function DocumentosView({ documentos, onDelete, userEmail }) {
  const [modalDoc, setModalDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleView = doc => {
    setModalDoc(doc);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  return (
    <Box sx={{ background: '#f6f8fa', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 400, mb: 2, mt: 4 }}>
          Historial de Documentos
        </Typography>
        <Table component={Paper} sx={{ mb: 4 }}>
          <TableHead>
            <TableRow sx={{ background: '#e0f7fa' }}>
              <TableCell>Número</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos && documentos.length > 0 ? (
              documentos.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell sx={{ fontWeight: 700 }}>{doc.numero}</TableCell>
                  <TableCell>
                    <Chip
                      label={doc.tipo === 'COTIZACIÓN' ? 'COT' : 'NDE'}
                      size="small"
                      sx={{
                        background: doc.tipo === 'COTIZACIÓN' ? '#fff9e1' : '#e1f7ff',
                        color: '#444',
                        fontWeight: 700,
                        fontSize: 14
                      }}
                    />
                  </TableCell>
                  <TableCell>{doc.clienteInfo?.nombreEmpresa || doc.clienteNombre || doc.clienteId}</TableCell>
                  <TableCell>{doc.fecha}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {doc.currency === 'VES' || doc.moneda === 'VES' || doc.moneda === 'BS'
                      ? `Bs${((doc.total || 0) * (doc.exchangeRate || doc.tasa || 1)).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                      : `$${(doc.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={doc.currency || doc.moneda}
                      size="small"
                      sx={{
                        background: '#ffe6c1',
                        color: '#b26a00',
                        fontWeight: 700,
                        fontSize: 14
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" sx={{ color: '#00bcd4', fontWeight: 700, mr: 1, minWidth: 0, p: 0 }} onClick={() => handleView(doc)}>VER</Button>
                    <Button size="small" sx={{ color: '#e53935', fontWeight: 700, minWidth: 0, p: 0 }} onClick={() => setDeleteId(doc.id)}>ELIMINAR</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: '#888' }}>
                  No hay documentos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DocumentPrintModal open={modalOpen} onClose={handleClose} doc={modalDoc} />
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <Box sx={{ p: 3 }}>
            <Typography>¿Seguro que deseas eliminar este documento?</Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setDeleteId(null)} sx={{ mr: 2 }}>Cancelar</Button>
              <Button color="error" variant="contained" onClick={() => { onDelete(deleteId); setDeleteId(null); }}>Eliminar</Button>
            </Box>
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}
