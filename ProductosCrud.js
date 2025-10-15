import React, { useState } from 'react';

export default function ProductosCrud({ productos, performAction, loading }) {
  const [form, setForm] = useState({ codigo: '', descripcion: '', precioUnitario: 0, stock: 0 });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await performAction('productos', 'update', form, editId);
      setEditId(null);
    } else {
      await performAction('productos', 'add', form);
    }
    setForm({ codigo: '', descripcion: '', precioUnitario: 0, stock: 0 });
  };

  const handleEdit = prod => {
    setForm({
      codigo: prod.codigo,
      descripcion: prod.descripcion,
      precioUnitario: prod.precioUnitario,
      stock: prod.stock
    });
    setEditId(prod.id);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar producto?')) {
      await performAction('productos', 'delete', null, id);
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      <form onSubmit={handleSubmit}>
        <input name="codigo" value={form.codigo} onChange={handleChange} placeholder="Código" required />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required />
        <input name="precioUnitario" type="number" value={form.precioUnitario} onChange={handleChange} placeholder="Precio Unitario" required />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" required />
        <button type="submit" disabled={loading}>{editId ? 'Guardar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ codigo: '', descripcion: '', precioUnitario: 0, stock: 0 }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Código</th><th>Descripción</th><th>Precio Unitario</th><th>Stock</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.codigo}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.precioUnitario}</td>
              <td>{prod.stock}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>Editar</button>
                <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && <tr><td colSpan="5">Sin productos</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
