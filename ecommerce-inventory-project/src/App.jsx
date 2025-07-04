import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', quantity: 5 },
    { id: 2, name: 'Phone', quantity: 10 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '' });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.quantity) return;
    const newItem = {
      id: Date.now(),
      name: newProduct.name,
      quantity: parseInt(newProduct.quantity),
    };
    setProducts([...products, newItem]);
    setNewProduct({ name: '', quantity: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>E-commerce Inventory</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <button onClick={handleAdd}>Add Product</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – Qty: {product.quantity}
            <button onClick={() => handleDelete(product.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
