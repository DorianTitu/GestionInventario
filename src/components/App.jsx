import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, searchProducts, updateStock, recordSale, recordRestock, getProductById } from '../services/inventoryService';
import ProductForm from './ProductForm';
import InventoryTable from './InventoryTable';
import StockModal from './StockModal';
import SaleModal from './SaleModal';
import RestockModal from './RestockModal';
import TransactionHistory from './TransactionHistory';
import '../styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStockId, setEditingStockId] = useState(null);
  const [sellingProductId, setSellingProductId] = useState(null);
  const [restockingProductId, setRestockingProductId] = useState(null);
  const [historyProductId, setHistoryProductId] = useState(null);

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

  const handleEditStock = (id) => {
    setEditingStockId(id);
  };

  const handleStockSave = (id, newStock) => {
    try {
      updateStock(id, newStock);
      loadProducts();
      setEditingStockId(null);
    } catch (error) {
      alert('Error al actualizar stock: ' + error.message);
    }
  };

  const handleSellClick = (id) => {
    setSellingProductId(id);
  };

  const handleSaleSave = (saleData) => {
    try {
      recordSale(sellingProductId, saleData);
      loadProducts();
      setSellingProductId(null);
      alert('¡Venta registrada exitosamente!');
    } catch (error) {
      alert('Error al registrar venta: ' + error.message);
    }
  };

  const handleRestockClick = (id) => {
    setRestockingProductId(id);
  };

  const handleRestockSave = (units) => {
    try {
      recordRestock(restockingProductId, units);
      loadProducts();
      setRestockingProductId(null);
      alert('¡Inventario recargado exitosamente!');
    } catch (error) {
      alert('Error al recargar inventario: ' + error.message);
    }
  };

  const handleViewHistory = (id) => {
    setHistoryProductId(id);
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

      {editingStockId && (
        <StockModal
          productId={editingStockId}
          onSave={handleStockSave}
          onCancel={() => setEditingStockId(null)}
        />
      )}

      {sellingProductId && (
        <SaleModal
          product={getProductById(sellingProductId)}
          onSave={handleSaleSave}
          onClose={() => setSellingProductId(null)}
        />
      )}

      {restockingProductId && (
        <RestockModal
          product={getProductById(restockingProductId)}
          onSave={handleRestockSave}
          onClose={() => setRestockingProductId(null)}
        />
      )}

      {historyProductId && (
        <TransactionHistory
          productId={historyProductId}
          productName={getProductById(historyProductId)?.nombre}
          onClose={() => setHistoryProductId(null)}
        />
      )}

      <InventoryTable
        products={filteredProducts}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onEditStock={handleEditStock}
        onSell={handleSellClick}
        onRestock={handleRestockClick}
        onViewHistory={handleViewHistory}
      />
    </div>
  );
}

export default App;
