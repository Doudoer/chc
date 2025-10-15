// DataForm.js
import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Alert, MenuItem, InputAdornment } from '@mui/material';

export default function DataForm({ open, onClose, onSave, initialData, type, error }) {
  const isCliente = type === 'clientes';
  const [form, setForm] = useState(initialData || {});
  const [rifPrefix, setRifPrefix] = useState('J-');

  // Reiniciar el formulario cada vez que se abre para nuevo registro
  useEffect(() => {
    setForm(initialData || {});
    setRifPrefix(initialData && initialData.rif && /^[VJG]-/.test(initialData.rif) ? initialData.rif[0] + '-' : 'J-');
  }, [open, initialData]);

  const fields = useMemo(() => isCliente
    ? [
        { name: 'nombreEmpresa', label: 'Nombre Empresa', required: true },
        { name: 'rif', label: 'RIF', required: true },
        { name: 'direccion', label: 'Dirección', required: false },
        { name: 'telefono', label: 'Teléfono', required: false },
        { name: 'fechaCreacion', label: 'Fecha de Creación', type: 'date', required: false, disabled: true },
      ]
    : [
        { name: 'codigo', label: 'Código', required: true, disabled: true },
        { name: 'descripcion', label: 'Descripción', required: true },
        { name: 'precioUnitario', label: 'Precio Unitario (USD)', type: 'number', required: true },
      ], [isCliente]);

  function handleChange(e) {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === 'number' ? Number(value) : value }));
  }

  function handleRifPrefixChange(e) {
    setRifPrefix(e.target.value);
  }

  function generarCodigo(productos) {
    // Genera un código de 5 dígitos único entre los productos existentes
    let nuevo;
    let intentos = 0;
    do {
      nuevo = Math.floor(10000 + Math.random() * 90000).toString();
      intentos++;
    } while (productos && productos.some(p => p.codigo === nuevo) && intentos < 1000);
    return nuevo;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Validar campos requeridos para clientes
    if (isCliente) {
      if (!form.nombreEmpresa || !form.rif) return;
      // Concatenar prefijo al RIF si no lo tiene
      let rif = form.rif.trim();
      if (!rif.startsWith(rifPrefix)) {
        rif = rifPrefix + rif.replace(/^[VJG]-?/, '');
      }
      onSave({ ...form, rif });
      return;
    }
    // Producto: generar código único solo si es nuevo
    if (!initialData) {
      // productos se debe pasar como prop o buscar de alguna forma, aquí se asume que no hay colisión
      onSave({ ...form, codigo: generarCodigo(window.productos || []) });
    } else {
      onSave(form);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{initialData ? 'Editar' : 'Nuevo'} {isCliente ? 'Cliente' : 'Producto'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} id="data-form">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {fields.map(f => {
              if (isCliente && f.name === 'rif') {
                return (
                  <Grid item xs={12} key={f.name}>
                    <TextField
                      select
                      label="Prefijo RIF"
                      value={rifPrefix}
                      onChange={handleRifPrefixChange}
                      sx={{ width: 110, mr: 1, verticalAlign: 'top' }}
                    >
                      <MenuItem value="V-">V-</MenuItem>
                      <MenuItem value="J-">J-</MenuItem>
                      <MenuItem value="G-">G-</MenuItem>
                    </TextField>
                    <TextField
                      label={f.label}
                      name={f.name}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      required={f.required}
                      type={f.type || 'text'}
                      sx={{ width: 'calc(100% - 120px)' }}
                    />
                  </Grid>
                );
              }
              // Mostrar campo código para productos, pero solo lectura
              if (!isCliente && f.name === 'codigo') {
                return (
                  <Grid item xs={12} key={f.name}>
                    <TextField
                      label={f.label}
                      name={f.name}
                      value={form[f.name] || ''}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      disabled
                    />
                  </Grid>
                );
              }
              return (
                <Grid item xs={12} key={f.name}>
                  <TextField
                    label={f.label}
                    name={f.name}
                    value={f.type === 'date' && form[f.name] ? form[f.name].slice(0,10) : (form[f.name] || '')}
                    onChange={handleChange}
                    required={f.required}
                    type={f.type || 'text'}
                    fullWidth
                    disabled={f.disabled}
                  />
                </Grid>
              );
            })}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit" form="data-form" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
