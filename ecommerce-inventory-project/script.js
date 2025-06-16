const products = [
  { id: 1, name: "Wireless Mouse", stock: 4, price: 499, vendorEmail: "vendor1@example.com" },
  { id: 2, name: "Keyboard", stock: 10, price: 799, vendorEmail: "vendor2@example.com" },
  { id: 3, name: "USB Cable", stock: 2, price: 199, vendorEmail: "vendor3@example.com" }
];

function renderProducts() {
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: Rs. ${p.price}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick="purchaseProduct(${p.id})" ${p.stock <= 0 ? 'disabled' : ''}>Buy</button>
    `;
    container.appendChild(div);
  });
}

function purchaseProduct(id) {
  const product = products.find(p => p.id === id);
  if (product.stock > 0) {
    product.stock--;
    renderProducts();
    if (product.stock < 5) {
      sendLowStockEmail(product);
    }
  } else {
    alert("Out of stock!");
  }
}

function sendLowStockEmail(product) {
  emailjs.send("service_az5qs1v", "template_g7spn1t", {
    to_email: product.vendorEmail,
    product_name: product.name,
    current_stock: product.stock
  }).then(() => {
    console.log("Email sent to vendor");
  }).catch(err => {
    console.error("Email error", err);
  });
}

document.addEventListener('DOMContentLoaded', renderProducts);
