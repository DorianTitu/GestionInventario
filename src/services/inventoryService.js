// Datos iniciales del inventario
const initialData = {
  "products": [
    {
      "id": "FIL-001",
      "nombre": "PLA+ Negro",
      "material": "PLA",
      "color": "Negro",
      "precioVenta": 22.00,
      "proveedor": "eSUN",
      "stockActual": 50
    },
    {
      "id": "FIL-002",
      "nombre": "PLA+ Gris",
      "material": "PLA",
      "color": "Gris",
      "precioVenta": 22.00,
      "proveedor": "eSUN",
      "stockActual": 30
    },
    {
      "id": "FIL-003",
      "nombre": "PLA+ Gris",
      "material": "PLA",
      "color": "Gris",
      "precioVenta": 22.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-004",
      "nombre": "PLA+ Beige",
      "material": "PLA",
      "color": "Beige",
      "precioVenta": 22.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-005",
      "nombre": "PLA+ Café Claro",
      "material": "PLA",
      "color": "Café Claro",
      "precioVenta": 22.00,
      "proveedor": "eSUN",
      "stockActual": 9
    },
    {
      "id": "FIL-006",
      "nombre": "PLA+ Verde",
      "material": "PLA",
      "color": "Verde",
      "precioVenta": 22.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-007",
      "nombre": "PLA Blanco",
      "material": "PLA",
      "color": "Blanco",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 19
    },
    {
      "id": "FIL-008",
      "nombre": "PLA Negro",
      "material": "PLA",
      "color": "Negro",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 17
    },
    {
      "id": "FIL-009",
      "nombre": "PLA Gris",
      "material": "PLA",
      "color": "Gris",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-010",
      "nombre": "PLA Azul",
      "material": "PLA",
      "color": "Azul",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-011",
      "nombre": "PLA Blanco Hueso",
      "material": "PLA",
      "color": "Blanco Hueso",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-012",
      "nombre": "PLA Azul Cielo",
      "material": "PLA",
      "color": "Azul Cielo",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 9
    },
    {
      "id": "FIL-013",
      "nombre": "PLA Rojo",
      "material": "PLA",
      "color": "Rojo",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-014",
      "nombre": "PLA Verde Luminoso",
      "material": "PLA",
      "color": "Verde Luminoso",
      "precioVenta": 24.00,
      "proveedor": "eSUN",
      "stockActual": 9
    },
    {
      "id": "FIL-015",
      "nombre": "PLA Dorado Seda",
      "material": "PLA",
      "color": "Dorado Seda",
      "precioVenta": 24.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-016",
      "nombre": "PLA Marfil",
      "material": "PLA",
      "color": "Marfil",
      "precioVenta": 24.00,
      "proveedor": "eSUN",
      "stockActual": 8
    },
    {
      "id": "FIL-017",
      "nombre": "PLA Madera Birch",
      "material": "PLA",
      "color": "Madera Birch",
      "precioVenta": 24.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-018",
      "nombre": "PETG Negro Básic",
      "material": "PETG",
      "color": "Negro",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 3
    },
    {
      "id": "FIL-019",
      "nombre": "PETG Blanco",
      "material": "PETG",
      "color": "Blanco",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 8
    },
    {
      "id": "FIL-020",
      "nombre": "PETG Negro",
      "material": "PETG",
      "color": "Negro",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 10
    },
    {
      "id": "FIL-021",
      "nombre": "PETG Blanco",
      "material": "PETG",
      "color": "Blanco",
      "precioVenta": 20.00,
      "proveedor": "eSUN",
      "stockActual": 8
    }
  ]
};

const STORAGE_KEY = 'inventory_data';

// Obtener todos los productos
export const getProducts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.products));
  return initialData.products;
};

// Obtener un producto por ID
export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

// Crear un nuevo producto
export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    id: product.id || `FIL-${Date.now()}`,
    nombre: product.nombre,
    material: product.material,
    color: product.color,
    precioVenta: parseFloat(product.precioVenta),
    proveedor: product.proveedor,
    stockActual: parseInt(product.stockActual)
  };
  
  // Verificar que el ID no exista
  if (products.find(p => p.id === newProduct.id)) {
    throw new Error('El ID del producto ya existe');
  }
  
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return newProduct;
};

// Actualizar solo el stock de un producto
export const updateStock = (id, newStock) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Producto no encontrado');
  }
  
  products[index].stockActual = parseInt(newStock);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return products[index];
};

// Actualizar un producto (edición completa)
export const updateProduct = (id, updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Producto no encontrado');
  }
  
  products[index] = {
    ...products[index],
    nombre: updatedProduct.nombre || products[index].nombre,
    material: updatedProduct.material || products[index].material,
    color: updatedProduct.color || products[index].color,
    precioVenta: updatedProduct.precioVenta !== undefined ? parseFloat(updatedProduct.precioVenta) : products[index].precioVenta,
    proveedor: updatedProduct.proveedor || products[index].proveedor,
    stockActual: updatedProduct.stockActual !== undefined ? parseInt(updatedProduct.stockActual) : products[index].stockActual
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return products[index];
};

// Eliminar un producto
export const deleteProduct = (id) => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  
  if (filteredProducts.length === products.length) {
    throw new Error('Producto no encontrado');
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
  return true;
};

// Buscar productos
export const searchProducts = (query) => {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter(p => 
    p.nombre.toLowerCase().includes(lowerQuery) ||
    p.id.toLowerCase().includes(lowerQuery) ||
    p.color.toLowerCase().includes(lowerQuery) ||
    p.material.toLowerCase().includes(lowerQuery)
  );
};

// Exportar datos a JSON
export const exportToJSON = () => {
  const products = getProducts();
  return JSON.stringify({ products }, null, 2);
};

// Importar datos desde JSON
export const importFromJSON = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    if (!Array.isArray(data.products)) {
      throw new Error('Formato JSON inválido');
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
    return data.products;
  } catch (error) {
    throw new Error('Error al importar datos: ' + error.message);
  }
};

// ==================== VENTAS ====================

const SALES_KEY = 'sales_data';

export const getSales = () => {
  const stored = localStorage.getItem(SALES_KEY);
  if (stored) {
    return JSON.parse(stored).sales || [];
  }
  return [];
};

export const recordSale = (productId, saleData) => {
  const product = getProductById(productId);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  // Validar que hay suficiente stock
  if (product.stockActual < saleData.units) {
    throw new Error(`Stock insuficiente. Disponible: ${product.stockActual}`);
  }

  const sales = getSales();
  const totalPrice = saleData.units * saleData.unitPrice * (1 - saleData.discount / 100);

  const newSale = {
    id: `SALE-${Date.now()}`,
    productId: productId,
    productNombre: product.nombre,
    clientName: saleData.clientName,
    clientPhone: saleData.clientPhone,
    clientCedula: saleData.clientCedula,
    units: saleData.units,
    unitPrice: saleData.unitPrice,
    discount: saleData.discount || 0,
    totalPrice: totalPrice,
    date: new Date().toISOString()
  };

  sales.push(newSale);
  localStorage.setItem(SALES_KEY, JSON.stringify({ sales }));

  // Actualizar stock del producto
  const newStock = product.stockActual - saleData.units;
  updateStock(productId, newStock);

  // Registrar en historial de transacciones
  recordTransactionHistory({
    type: 'sale',
    productId,
    data: newSale
  });

  return newSale;
};

export const getSalesByProduct = (productId) => {
  const sales = getSales();
  return sales.filter(s => s.productId === productId).sort((a, b) => new Date(b.date) - new Date(a.date));
};

// ==================== RECARGAS ====================

const RESTOCKS_KEY = 'restocks_data';

export const getRestocks = () => {
  const stored = localStorage.getItem(RESTOCKS_KEY);
  if (stored) {
    return JSON.parse(stored).restocks || [];
  }
  return [];
};

export const recordRestock = (productId, units) => {
  const product = getProductById(productId);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  const restocks = getRestocks();
  const previousStock = product.stockActual;
  const newStock = previousStock + units;

  const newRestock = {
    id: `RESTOCK-${Date.now()}`,
    productId: productId,
    productNombre: product.nombre,
    unitsAdded: units,
    previousStock: previousStock,
    newStock: newStock,
    date: new Date().toISOString()
  };

  restocks.push(newRestock);
  localStorage.setItem(RESTOCKS_KEY, JSON.stringify({ restocks }));

  // Actualizar stock del producto
  updateStock(productId, newStock);

  // Registrar en historial de transacciones
  recordTransactionHistory({
    type: 'restock',
    productId,
    data: newRestock
  });

  return newRestock;
};

export const getRestocksByProduct = (productId) => {
  const restocks = getRestocks();
  return restocks.filter(r => r.productId === productId).sort((a, b) => new Date(b.date) - new Date(a.date));
};

// ==================== HISTORIAL DE TRANSACCIONES ====================

const TRANSACTIONS_KEY = 'transactions_history';

export const getTransactionHistory = () => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  if (stored) {
    return JSON.parse(stored).transactions || [];
  }
  return [];
};

export const recordTransactionHistory = (transaction) => {
  const transactions = getTransactionHistory();
  
  const newTransaction = {
    id: `TRANS-${Date.now()}`,
    type: transaction.type, // 'sale' o 'restock'
    productId: transaction.productId,
    data: transaction.data,
    timestamp: new Date().toISOString()
  };

  transactions.push(newTransaction);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify({ transactions }));
  return newTransaction;
};

export const getProductTransactionHistory = (productId) => {
  const transactions = getTransactionHistory();
  return transactions
    .filter(t => t.productId === productId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};
