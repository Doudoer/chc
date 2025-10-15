
import React, { useState } from 'react';
import { Typography, Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import DocumentPrintModal from './components/DocumentPrintModal';
// import HeaderBar from './components/HeaderBar';

function StatCard({ label, value, color }) {
  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 220, textAlign: 'center', borderBottom: `4px solid ${color}` }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
      <Typography variant="h5" sx={{ color }}>{value}</Typography>
    </Paper>
  );
}


export default function AdminPanel({ onCrearDocumento, onClientes, onProductos, resumen, documentos }) {
  const [modalDoc, setModalDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleView = doc => {
    setModalDoc(doc);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  return (
    <Box sx={{ background: '#f6f8fa', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 400, mb: 2, mt: 4 }}>
          Resumen del Sistema
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderBottom: '6px solid #ffb300', minHeight: 160 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Productos en Catálogo</Typography>
              <Typography variant="h3" sx={{ color: '#ffb300', fontWeight: 700 }}>{resumen.productos}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderBottom: '6px solid #009688', minHeight: 160 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Clientes Registrados</Typography>
              <Typography variant="h3" sx={{ color: '#009688', fontWeight: 700 }}>{resumen.clientes}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderBottom: '6px solid #e53935', minHeight: 160 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Cotizaciones Pendientes</Typography>
              <Typography variant="h3" sx={{ color: '#e53935', fontWeight: 700 }}>{resumen.cotizaciones}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderBottom: '6px solid #1976d2', minHeight: 160 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Notas de Entrega</Typography>
              <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 700 }}>{resumen.notasEntrega}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderBottom: '6px solid #00bcd4', minHeight: 160 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Total Ventas (NDE) Ref.</Typography>
              <Typography variant="h3" sx={{ color: '#00bcd4', fontWeight: 700 }}>
                {typeof resumen.ventas === 'number' ? resumen.ventas.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) : '$0.00'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* Historial de Documentos oculto por requerimiento */}
      </Container>
    </Box>
  );
}
