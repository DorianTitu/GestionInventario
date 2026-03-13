import React from 'react';
import '../styles/InventoryTable.css';

function InventoryTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Material</th>
            <th>Color</th>
            <th>Precio Venta</th>
            <th>Proveedor</th>
            <th>Stock Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={product.stockActual <= 10 ? 'low-stock' : ''}>
              <td className="id-cell">{product.id}</td>
              <td className="nombre-cell">{product.nombre}</td>
              <td>{product.material}</td>
              <td>
                <div className="color-cell">
                  <span className="color-name">{product.color}</span>
                </div>
              </td>
              <td className="price-cell">${product.precioVenta.toFixed(2)}</td>
              <td>{product.proveedor}</td>
              <td className="stock-cell">
                <span className={`stock-badge ${product.stockActual <= 10 ? 'low' : 'normal'}`}>
                  {product.stockActual}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  onClick={() => onEdit(product.id)}
                  className="btn btn-edit"
                  title="Editar"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="btn btn-delete"
                  title="Eliminar"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
