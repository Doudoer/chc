import React, { useState } from 'react';


// Recibe también la lista de clientes para mostrar nombres
export default function DocumentosCrud({ documentos, performAction, loading, clientes = [] }) {
  const [form, setForm] = useState({ tipo: '', numero: '', fecha: '', clienteId: '', total: 0 });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await performAction('documentos', 'update', form, editId);
      setEditId(null);
    } else {
      await performAction('documentos', 'add', form);
    }
    setForm({ tipo: '', numero: '', fecha: '', clienteId: '', total: 0 });
  };

  const handleEdit = doc => {
    setForm({
      tipo: doc.tipo,
      numero: doc.numero,
      fecha: doc.fecha,
      clienteId: doc.clienteId,
      total: doc.total
    });
    setEditId(doc.id);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar documento?')) {
      await performAction('documentos', 'delete', null, id);
    }
  };

  return (
    <div>
      <h2>Documentos</h2>
      <form onSubmit={handleSubmit}>
        <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo (COTIZACION/NDE)" required />
        <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" required />
        <input name="fecha" value={form.fecha} onChange={handleChange} placeholder="Fecha (YYYY-MM-DD)" required />
        <select name="clienteId" value={form.clienteId} onChange={handleChange} required>
          <option value="">Seleccione cliente</option>
          {clientes.map(cli => (
            <option key={cli.id} value={cli.id}>{cli.nombreEmpresa} ({cli.rif})</option>
          ))}
        </select>
        <input name="total" type="number" value={form.total} onChange={handleChange} placeholder="Total" required />
        <button type="submit" disabled={loading}>{editId ? 'Guardar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ tipo: '', numero: '', fecha: '', clienteId: '', total: 0 }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Tipo</th><th>Número</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map(doc => {
            const cliente = clientes.find(c => c.id === doc.clienteId);
            return (
              <tr key={doc.id}>
                <td>{doc.tipo}</td>
                <td>{doc.numero}</td>
                <td>{doc.fecha}</td>
                <td>{cliente ? `${cliente.nombreEmpresa} (${cliente.rif})` : doc.clienteId}</td>
                <td>{doc.total}</td>
                <td>
                  <button onClick={() => handleEdit(doc)}>Editar</button>
                  <button onClick={() => handleDelete(doc.id)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
          {documentos.length === 0 && <tr><td colSpan="6">Sin documentos</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
