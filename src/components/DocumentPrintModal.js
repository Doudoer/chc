
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';


// CSS para impresión y estilos visuales versión original (caja única, tabla clásica, totales simples)
const printHideStyle = `
  @media print {
    .print-hide { display: none !important; }
    #print-area { box-shadow: none !important; }
  }
`;

export default function DocumentPrintModal({ open, onClose, doc }) {
  if (!doc) return null;
  const cliente = doc.clienteInfo || {};
  // Determinar prefijo de RIF
  const rif = cliente.rif || doc.rif || '';
  const rifPrefix = typeof rif === 'string' ? rif.slice(0,2).toUpperCase() : '';
  const items = doc.items || [];
  const isCot = doc.tipo === 'COTIZACIÓN';
  const isNota = doc.tipo === 'NOTA DE ENTREGA';
  const moneda = doc.currency === 'VES' || doc.moneda === 'VES' || doc.moneda === 'BS' ? 'VES' : 'USD';
  const tasa = doc.exchangeRate || 1;
  const usdTotal = doc.usdTotal || (doc.total && doc.exchangeRate ? doc.total / doc.exchangeRate : undefined);
  // Mostrar observación solo si es Cotización o Nota de Entrega y moneda USD
  const showNoIvaObs = (isCot || isNota) && moneda === 'USD';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <style>{printHideStyle}</style>
      <DialogContent sx={{ p: 0 }}>
        <div id="print-area">
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <img src="/chc.png" alt="Logo" style={{ maxHeight: 90, marginBottom: 8 }} />
            <div style={{ fontSize: 28, color: '#1976d2', fontWeight: 700, marginBottom: 8 }}>
              {isCot ? 'Cotización' : 'Nota de Entrega'}
            </div>
          </div>
          <div style={{ border: '2px solid #222', margin: 16, marginTop: 0, padding: 8, display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
            <div>
              <div>Fecha: <b>{doc.fecha}</b></div>
              {rifPrefix === 'V-' ? (
                <div>Nombre y Apellido: <b>{cliente.nombre || cliente.nombreEmpresa || doc.clienteNombre}</b></div>
              ) : (
                <div>Nombre Empresa: <b>{cliente.nombreEmpresa || cliente.nombre || doc.clienteNombre}</b></div>
              )}
              <div>RIF: <b>{cliente.rif || '-'}</b></div>
              <div>Teléfono: <b>{cliente.telefono || '-'}</b></div>
              <div>Dirección: <b>{cliente.direccion || '-'}</b></div>
            </div>
            <div style={{ textAlign: 'right', minWidth: 180 }}>
              <div style={{ fontWeight: 700 }}>Nota N°: <span style={{ fontWeight: 400 }}>{doc.numero}</span></div>
            </div>
          </div>
          <table style={{ width: 'calc(100% - 32px)', margin: '0 16px', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead>
              <tr style={{ background: '#e0f7fa', border: '2px solid #222' }}>
                <th style={{ border: '2px solid #222', padding: 4 }}>CODIGO</th>
                <th style={{ border: '2px solid #222', padding: 4 }}>DESCRIPCIÓN</th>
                <th style={{ border: '2px solid #222', padding: 4 }}>CANT</th>
                <th style={{ border: '2px solid #222', padding: 4 }}>PRECIO UNITARIO</th>
                <th style={{ border: '2px solid #222', padding: 4 }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.productId || it.id}>
                  <td style={{ border: '2px solid #222', padding: 4, fontWeight: 700 }}>{it.codigo}</td>
                  <td style={{ border: '2px solid #222', padding: 4 }}>{it.descripcion}</td>
                  <td style={{ border: '2px solid #222', padding: 4 }}>{it.cantidad}</td>
                  <td style={{ border: '2px solid #222', padding: 4 }}>
                    {moneda === 'VES'
                      ? `Bs${(Number(it.precioUnitario) * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                      : `$${Number(it.precioUnitario).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </td>
                  <td style={{ border: '2px solid #222', padding: 4, fontWeight: 700 }}>
                    {moneda === 'VES'
                      ? `Bs${(Number(it.precioUnitario) * Number(it.cantidad) * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                      : `$${(Number(it.precioUnitario) * Number(it.cantidad)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ border: '2px solid #222', borderTop: 'none', margin: '0 16px', padding: 8, minHeight: 40, fontSize: 15 }}>
            <b>OBSERVACIONES:</b>
            <div style={{ minHeight: 24 }}>
              {showNoIvaObs ? 'Los precios no incluyen IVA' : ''}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 16px 0 16px' }}>
            <table style={{ fontSize: 16, minWidth: 250 }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'right', padding: 2 }}>SUB</td>
                  <td style={{ textAlign: 'right', padding: 2 }}>
                    {moneda === 'VES'
                      ? `Bs${(Number(doc.subtotal) * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                      : `$${Number(doc.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </td>
                </tr>
                {moneda === 'VES' && (
                  <tr>
                    <td style={{ textAlign: 'right', padding: 2 }}>IVA 16%</td>
                    <td style={{ textAlign: 'right', padding: 2 }}>
                      Bs{(Number(doc.subtotal) * 0.16 * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ textAlign: 'right', padding: 2, fontWeight: 700 }}>TOTAL</td>
                  <td style={{ textAlign: 'right', padding: 2, fontWeight: 700 }}>
                    {moneda === 'VES'
                      ? `Bs${(Number(doc.total) * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                      : `$${Number(doc.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ border: '2px solid #222', margin: '16px', marginTop: 8, padding: 8, fontSize: 13, textAlign: 'center' }}>
            Av 18 La limpia Sector Miranda la Florida casa 95A-78 - Maracaibo Edo. Zulia<br />
            Correo: confecciones.hermanos.cantos@hotmail.com | IG: @confeccioneshermanoscantos<br />
            Tlf: 0424-6550993 / 0424-6112097
          </div>
        </div>
      </DialogContent>
      <DialogActions className="print-hide">
        <Button variant="contained" color="primary" onClick={() => window.print()}>IMPRIMIR</Button>
        <Button variant="outlined" onClick={onClose}>CERRAR</Button>
      </DialogActions>
    </Dialog>
  );
}
