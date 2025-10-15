import React, { useState } from 'react';

export default function ClientesCrud({ clientes, performAction, loading }) {
  const [form, setForm] = useState({ nombreEmpresa: '', rif: '', direccion: '', telefono: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await performAction('clientes', 'update', form, editId);
      setEditId(null);
    } else {
      await performAction('clientes', 'add', form);
    }
    setForm({ nombreEmpresa: '', rif: '', direccion: '', telefono: '' });
  };

  const handleEdit = cli => {
    setForm({
      nombreEmpresa: cli.nombreEmpresa,
      rif: cli.rif,
      direccion: cli.direccion,
      telefono: cli.telefono
    });
    setEditId(cli.id);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar cliente?')) {
      await performAction('clientes', 'delete', null, id);
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreEmpresa" value={form.nombreEmpresa} onChange={handleChange} placeholder="Nombre Empresa" required />
        <input name="rif" value={form.rif} onChange={handleChange} placeholder="RIF / C.I." required />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
        <button type="submit" disabled={loading}>{editId ? 'Guardar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombreEmpresa: '', rif: '', direccion: '', telefono: '' }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Nombre Empresa</th><th>RIF</th><th>Dirección</th><th>Teléfono</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cli => (
            <tr key={cli.id}>
              <td>{cli.nombreEmpresa}</td>
              <td>{cli.rif}</td>
              <td>{cli.direccion}</td>
              <td>{cli.telefono}</td>
              <td>
                <button onClick={() => handleEdit(cli)}>Editar</button>
                <button onClick={() => handleDelete(cli.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && <tr><td colSpan="5">Sin clientes</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
