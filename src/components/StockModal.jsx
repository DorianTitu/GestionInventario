import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/inventoryService';
import '../styles/StockModal.css';

function StockModal({ productId, onSave, onCancel }) {
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = getProducts();
    const found = products.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      setStock(found.stockActual.toString());
    }
  }, [productId]);

  const handleChange = (e) => {
    setStock(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stock || isNaN(stock) || parseInt(stock) < 0) {
      setError('Ingresa una cantidad válida');
      return;
    }

    onSave(productId, parseInt(stock));
  };

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="stock-modal">
        <div className="stock-modal-header">
          <h3>Actualizar Stock</h3>
          <button onClick={onCancel} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="stock-form">
          <div className="product-info">
            <p className="product-id">{product.id}</p>
            <p className="product-name">{product.nombre}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="stock">Stock Actual</label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={handleChange}
              min="0"
              className={error ? 'input-error' : ''}
              autoFocus
            />
          </div>

          <div className="stock-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-save"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockModal;
