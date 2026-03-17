import React, { useState } from 'react';
import '../styles/RestockModal.css';

function RestockModal({ product, onClose, onSave }) {
  const [units, setUnits] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUnits(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!units || parseInt(units) <= 0) {
      setError('Ingresa una cantidad válida mayor a 0');
      return;
    }

    onSave(parseInt(units));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content restock-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Recargar Stock</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="product-info">
            <p><strong>Producto:</strong> {product.nombre}</p>
            <p><strong>Stock Actual:</strong> <span className="stock-value">{product.stockActual}</span></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="units">Cantidad *</label>
              <input
                type="number"
                id="units"
                value={units}
                onChange={handleChange}
                placeholder="Ej: 50"
                min="1"
                autoFocus
                className={error ? 'input-error' : ''}
              />
              {error && <span className="error-text">{error}</span>}
            </div>

            {units && parseInt(units) > 0 && (
              <div className="preview-section">
                <p><strong>Nuevo Stock:</strong> <span className="new-stock">{product.stockActual + parseInt(units)}</span></p>
              </div>
            )}

            <div className="modal-footer">
              <button type="button" className="btn btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RestockModal;
