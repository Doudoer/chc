
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StatCard({ label, value, color }) {
  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 220, textAlign: 'center', borderBottom: `4px solid ${color}` }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
      <Typography variant="h5" sx={{ color }}>{value}</Typography>
    </Paper>
  );
}

export default function AdminPanel({ onCrearDocumento }) {
  return (
    <Box sx={{ background: '#f6f8fa', minHeight: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#00bcd4', fontWeight: 700 }}>
            Confecciones App
          </Typography>
          <Button color="primary" variant="contained" sx={{ mr: 2, background: '#00bcd4' }}>INICIO</Button>
          <Button color="inherit" onClick={onCrearDocumento}>CREAR DOCUMENTO</Button>
          <Button color="inherit">DOCUMENTOS</Button>
          <Button color="inherit">INVENTARIO</Button>
          <Button color="inherit">CLIENTES</Button>
          <Typography variant="body2" sx={{ ml: 4, color: '#888' }}>
            Usuario ID: 022215202505053263274
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 500, mb: 2, mt: 2 }}>
          Resumen del Sistema
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Productos en Catálogo" value={1} color="#ffa726" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Clientes Registrados" value={1} color="#66bb6a" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Cotizaciones Pendientes" value={1} color="#ef5350" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Total Ventas (NDE) Ref." value={"$0.00"} color="#00bcd4" />
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ color: '#00bcd4', fontWeight: 400, mb: 2 }}>
          Historial de Documentos
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
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
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: '#888' }}>
                  No hay documentos registrados.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
