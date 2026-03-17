import React, { useState } from 'react';
import '../styles/SaleModal.css';

function SaleModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientCedula: '',
    units: 1,
    discount: 0
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'units' || name === 'discount' ? parseInt(value) || 0 : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre del cliente es requerido';
    }
    
    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'El teléfono es requerido';
    }
    
    if (!formData.clientCedula.trim()) {
      newErrors.clientCedula = 'La cédula es requerida';
    }
    
    if (formData.units <= 0) {
      newErrors.units = 'Las unidades deben ser mayores a 0';
    }
    
    if (formData.units > product.stockActual) {
      newErrors.units = `Stock insuficiente. Disponible: ${product.stockActual}`;
    }
    
    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'El descuento debe estar entre 0 y 100';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave({
      ...formData,
      unitPrice: product.precioVenta
    });
  };

  const totalPrice = formData.units * product.precioVenta * (1 - formData.discount / 100);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content sale-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Vender</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="product-info">
            <p><strong>Producto:</strong> {product.nombre}</p>
            <p><strong>Precio:</strong> ${product.precioVenta.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stockActual}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="clientName">Nombre del Cliente *</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                className={errors.clientName ? 'input-error' : ''}
              />
              {errors.clientName && <span className="error-text">{errors.clientName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="clientPhone">Teléfono *</label>
              <input
                type="tel"
                id="clientPhone"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                placeholder="Ej: 3001234567"
                className={errors.clientPhone ? 'input-error' : ''}
              />
              {errors.clientPhone && <span className="error-text">{errors.clientPhone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="clientCedula">Cédula *</label>
              <input
                type="text"
                id="clientCedula"
                name="clientCedula"
                value={formData.clientCedula}
                onChange={handleChange}
                placeholder="Ej: 1234567890"
                className={errors.clientCedula ? 'input-error' : ''}
              />
              {errors.clientCedula && <span className="error-text">{errors.clientCedula}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="units">Unidades *</label>
                <input
                  type="number"
                  id="units"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  min="1"
                  className={errors.units ? 'input-error' : ''}
                />
                {errors.units && <span className="error-text">{errors.units}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="discount">Descuento (%) </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className={errors.discount ? 'input-error' : ''}
                />
                {errors.discount && <span className="error-text">{errors.discount}</span>}
              </div>
            </div>

            <div className="total-section">
              <p><strong>Total:</strong> <span className="total-amount">${totalPrice.toFixed(2)}</span></p>
            </div>

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

export default SaleModal;
