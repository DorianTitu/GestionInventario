import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, getProductById } from '../services/inventoryService';
import '../styles/ProductForm.css';

function ProductForm({ productId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    material: '',
    color: '',
    precioVenta: '',
    proveedor: '',
    stockActual: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos del producto si es edición
  useEffect(() => {
    if (productId) {
      const product = getProductById(productId);
      if (product) {
        setFormData({
          id: product.id,
          nombre: product.nombre,
          material: product.material,
          color: product.color,
          precioVenta: product.precioVenta.toString(),
          proveedor: product.proveedor,
          stockActual: product.stockActual.toString()
        });
      }
    }
  }, [productId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = 'El ID es requerido';
    }
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.material.trim()) {
      newErrors.material = 'El material es requerido';
    }
    if (!formData.color.trim()) {
      newErrors.color = 'El color es requerido';
    }
    if (!formData.precioVenta || isNaN(formData.precioVenta) || parseFloat(formData.precioVenta) < 0) {
      newErrors.precioVenta = 'Precio válido requerido';
    }
    if (!formData.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es requerido';
    }
    if (!formData.stockActual || isNaN(formData.stockActual) || parseInt(formData.stockActual) < 0) {
      newErrors.stockActual = 'Stock válido requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (productId) {
        // Editar producto
        updateProduct(productId, formData);
      } else {
        // Crear nuevo producto
        addProduct(formData);
      }
      onSave();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{productId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <button onClick={onCancel} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-group">
            <label htmlFor="id">ID del Producto</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={productId !== null}
              placeholder="FIL-001"
              className={errors.id ? 'input-error' : ''}
            />
            {errors.id && <span className="field-error">{errors.id}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="PLA+ Negro"
              className={errors.nombre ? 'input-error' : ''}
            />
            {errors.nombre && <span className="field-error">{errors.nombre}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="material">Material</label>
              <select
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className={errors.material ? 'input-error' : ''}
              >
                <option value="">Seleccionar material</option>
                <option value="PLA">PLA</option>
                <option value="PLA+">PLA+</option>
                <option value="PETG">PETG</option>
                <option value="ABS">ABS</option>
                <option value="TPU">TPU</option>
              </select>
              {errors.material && <span className="field-error">{errors.material}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Negro"
                className={errors.color ? 'input-error' : ''}
              />
              {errors.color && <span className="field-error">{errors.color}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precioVenta">Precio Venta ($)</label>
              <input
                type="number"
                id="precioVenta"
                name="precioVenta"
                value={formData.precioVenta}
                onChange={handleChange}
                placeholder="22.00"
                step="0.01"
                min="0"
                className={errors.precioVenta ? 'input-error' : ''}
              />
              {errors.precioVenta && <span className="field-error">{errors.precioVenta}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="stockActual">Stock Actual</label>
              <input
                type="number"
                id="stockActual"
                name="stockActual"
                value={formData.stockActual}
                onChange={handleChange}
                placeholder="50"
                min="0"
                className={errors.stockActual ? 'input-error' : ''}
              />
              {errors.stockActual && <span className="field-error">{errors.stockActual}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="proveedor">Proveedor</label>
            <input
              type="text"
              id="proveedor"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              placeholder="eSUN"
              className={errors.proveedor ? 'input-error' : ''}
            />
            {errors.proveedor && <span className="field-error">{errors.proveedor}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
