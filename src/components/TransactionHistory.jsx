import React, { useState, useEffect } from 'react';
import { getProductTransactionHistory } from '../services/inventoryService';
import '../styles/TransactionHistory.css';

function TransactionHistory({ productId, productName, onClose }) {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all', 'sale', 'restock'

  useEffect(() => {
    loadTransactions();
  }, [productId]);

  const loadTransactions = () => {
    const history = getProductTransactionHistory(productId);
    setTransactions(history);
  };

  const filteredTransactions = transactions.filter(t => 
    filterType === 'all' ? true : t.type === filterType
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content transaction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Historial</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="product-info">
            <p><strong>Producto:</strong> {productName}</p>
          </div>

          <div className="filter-section">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                Todo ({transactions.length})
              </button>
              <button
                className={`filter-btn ${filterType === 'sale' ? 'active' : ''}`}
                onClick={() => setFilterType('sale')}
              >
                Ventas ({transactions.filter(t => t.type === 'sale').length})
              </button>
              <button
                className={`filter-btn ${filterType === 'restock' ? 'active' : ''}`}
                onClick={() => setFilterType('restock')}
              >
                Recargas ({transactions.filter(t => t.type === 'restock').length})
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <p>No hay transacciones para mostrar</p>
            </div>
          ) : (
            <div className="transactions-list">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                  {transaction.type === 'sale' ? (
                    <div className="transaction-content">
                      <div className="transaction-header">
                        <span className="transaction-type sale-badge">VENTA</span>
                        <span className="transaction-date">{formatDate(transaction.data.date)}</span>
                      </div>
                      <div className="transaction-details">
                        <p><strong>Cliente:</strong> {transaction.data.clientName}</p>
                        <p><strong>Cédula:</strong> {transaction.data.clientCedula}</p>
                        <p><strong>Teléfono:</strong> {transaction.data.clientPhone}</p>
                        <div className="transaction-row">
                          <span><strong>Unidades:</strong> {transaction.data.units}</span>
                          <span><strong>Precio:</strong> ${transaction.data.unitPrice.toFixed(2)}</span>
                        </div>
                        {transaction.data.discount > 0 && (
                          <p><strong>Dscto:</strong> {transaction.data.discount}%</p>
                        )}
                        <p className="total"><strong>Total:</strong> ${transaction.data.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="transaction-content">
                      <div className="transaction-header">
                        <span className="transaction-type restock-badge">RECARGA</span>
                        <span className="transaction-date">{formatDate(transaction.data.date)}</span>
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-row">
                          <span><strong>Agregado:</strong> {transaction.data.unitsAdded}</span>
                        </div>
                        <div className="transaction-row">
                          <span><strong>Anterior:</strong> {transaction.data.previousStock}</span>
                          <span><strong>Actual:</strong> {transaction.data.newStock}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="modal-footer">
            <button className="btn btn-cancel" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
