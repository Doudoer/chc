// LoadingView.js
import React from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

export default function LoadingView({ loading, error }) {
  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">Cargando...</Typography>
    </Box>
  );
}
