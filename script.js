const catalog = document.getElementById("catalog");
const cartBox = document.getElementById("cart-box");
const cartCount = document.getElementById("cart-count");

let plants = [
  { name: "Туя Смарагд", price: 250 },
  { name: "Троянда", price: 150 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCatalog() {
  catalog.innerHTML = plants.map((p, i) => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.price} грн</p>
      <button onclick="addToCart(${i})">Купити</button>
    </div>
  `).join("");
}

function addToCart(i) {
  cart.push(plants[i]);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartCount.innerText = cart.length;

  if (cart.length === 0) {
    cartBox.innerHTML = "Кошик пустий";
    return;
  }

  cartBox.innerHTML = cart.map(item => `
    <div>
      <p>${item.name} - ${item.price} грн</p>
    </div>
  `).join("");
}

renderCatalog();
renderCart();
