import React from 'react';
import '../styles/InventoryTable.css';

function InventoryTable({ products, onEdit, onEditStock, onDelete, onSell, onRestock, onViewHistory }) {
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
                <button 
                  onClick={() => onEditStock(product.id)}
                  className={`stock-badge ${product.stockActual <= 10 ? 'low' : 'normal'}`}
                  title="Click para editar stock"
                >
                  {product.stockActual}
                </button>
              </td>
              <td className="actions-cell">
                <div className="actions-group">
                  <button
                    onClick={() => onSell(product.id)}
                    className="btn btn-sell"
                    title="Vender producto"
                  >
                    Vender
                  </button>
                  <button
                    onClick={() => onRestock(product.id)}
                    className="btn btn-restock"
                    title="Recargar inventario"
                  >
                    Recargar
                  </button>
                  <button
                    onClick={() => onViewHistory(product.id)}
                    className="btn btn-history"
                    title="Ver historial"
                  >
                    Historial
                  </button>
                </div>
                <div className="actions-group secondary">
                  <button
                    onClick={() => onEdit(product.id)}
                    className="btn btn-edit"
                    title="Editar producto"
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
