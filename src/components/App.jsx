import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, searchProducts } from '../services/inventoryService';
import ProductForm from './ProductForm';
import InventoryTable from './InventoryTable';
import '../styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cargar productos al montar
  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrar productos cuando cambia la búsqueda
  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredProducts(searchProducts(searchQuery));
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const loadProducts = () => {
    const data = getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  const handleAddClick = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleProductSaved = () => {
    loadProducts();
    handleCloseForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este producto?')) {
      try {
        deleteProduct(id);
        loadProducts();
      } catch (error) {
        alert('Error al eliminar: ' + error.message);
      }
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(products, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', 'inventario.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Inventario</h1>
        <p>Gestión de productos y stock</p>
      </header>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre, ID, color o material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="result-count">
            {filteredProducts.length} de {products.length}
          </span>
        </div>

        <div className="action-buttons">
          <button onClick={handleAddClick} className="btn btn-primary">
            Agregar
          </button>
          <button onClick={handleExport} className="btn btn-secondary">
            Exportar
          </button>
        </div>
      </div>

      {showForm && (
        <ProductForm
          productId={editingId}
          onSave={handleProductSaved}
          onCancel={handleCloseForm}
        />
      )}

      <InventoryTable
        products={filteredProducts}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
