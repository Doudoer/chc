import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Paper } from '@mui/material';

export default function DocumentModal({ open, onClose, doc }) {
  if (!doc) return null;
  const cliente = doc.clienteInfo || {};
  const items = doc.items || [];
  const isCot = doc.tipo === 'COTIZACIÓN';
  const moneda = doc.currency === 'VES' || doc.moneda === 'VES' || doc.moneda === 'BS' ? 'VES' : 'USD';
  const tasa = doc.exchangeRate || 1;
  const usdTotal = doc.usdTotal || (doc.total && doc.exchangeRate ? doc.total / doc.exchangeRate : undefined);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: '#00bcd4', fontSize: 24 }}>
        {isCot ? 'Cotización' : 'Nota de Entrega'} No. {doc.numero}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Cliente:</Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>{cliente.nombreEmpresa || doc.clienteNombre} (RIF: {cliente.rif || '-'})</Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>Dirección: {cliente.direccion || '-'}</Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Fecha: {doc.fecha} | Moneda: {moneda === 'VES' ? 'Bolívares' : 'Dólares'}{moneda === 'VES' && doc.exchangeRate ? ` (Tasa: Bs. ${Number(doc.exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 4 })} por $1)` : ''}
          </Typography>
        </Box>
        <Table component={Paper} sx={{ mb: 2 }}>
          <TableHead>
            <TableRow sx={{ background: '#e0f7fa' }}>
              <TableCell>Cód.</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Cant.</TableCell>
              <TableCell>Precio Unit. ({moneda})</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Línea ({moneda})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(it => (
              <TableRow key={it.productId || it.id}>
                <TableCell>{it.codigo}</TableCell>
                <TableCell>{it.descripcion}</TableCell>
                <TableCell>{it.cantidad}</TableCell>
                <TableCell>{moneda === 'VES' ? `Bs${Number(it.precioUnitario).toLocaleString('es-VE', { minimumFractionDigits: 2 })}` : `$${Number(it.precioUnitario).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  {moneda === 'VES'
                    ? `Bs${(Number(it.precioUnitario) * Number(it.cantidad)).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                    : `$${(Number(it.precioUnitario) * Number(it.cantidad)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Box sx={{ minWidth: 250 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <span>Subtotal:</span>
              <span>{moneda === 'VES' ? `Bs${Number(doc.subtotal).toLocaleString('es-VE', { minimumFractionDigits: 2 })}` : `$${Number(doc.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <span>IVA (16%):</span>
              <span>{moneda === 'VES' ? `Bs${Number(doc.subtotal * 0.16).toLocaleString('es-VE', { minimumFractionDigits: 2 })}` : `$${Number(doc.subtotal * 0.16).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#00bcd4', fontSize: 20 }}>
              <span>Total ({moneda}):</span>
              <span>{moneda === 'VES' ? `Bs${Number(doc.total).toLocaleString('es-VE', { minimumFractionDigits: 2 })}` : `$${Number(doc.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</span>
            </Box>
            {usdTotal && moneda === 'VES' && (
              <Box sx={{ textAlign: 'right', color: '#888', fontSize: 13, mt: 1 }}>
                Total Referencia USD: ${usdTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => window.print()}>IMPRIMIR</Button>
        <Button variant="outlined" onClick={onClose}>CERRAR</Button>
      </DialogActions>
    </Dialog>
  );
}
