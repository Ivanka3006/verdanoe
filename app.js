let cart = [];

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const filter = document.getElementById("categoryFilter").value;

  const container = document.getElementById("products");
  container.innerHTML = "";

  products
    .filter(p => !filter || p.category === filter)
    .forEach(p => {
      container.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p>${p.price} грн</p>
          <button onclick="addToCart(${p.id})">В кошик</button>
        </div>
      `;
    });
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });

  renderCart();
}

function renderCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";

  cart.forEach(item => {
    div.innerHTML += `
      <div>
        Товар ${item.id} 
        <button onclick="changeQty(${item.id},1)">+</button>
        ${item.qty}
        <button onclick="changeQty(${item.id},-1)">-</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
  });
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

document.getElementById("categoryFilter").onchange = loadProducts;

loadProducts();
