const catalog = document.getElementById("catalog");
const cartBox = document.getElementById("cart-box");
const cartCount = document.getElementById("cart-count");

let plants = [
  { id: 1, name: "Туя Смарагд", price: 250, category: "хвойні" },
  { id: 2, name: "Сосна", price: 300, category: "хвойні" },
  { id: 3, name: "Яблуня", price: 200, category: "дерева" },
  { id: 4, name: "Троянда", price: 150, category: "квіти" },
  { id: 5, name: "Петунія", price: 80, category: "однорічні" },
  { id: 6, name: "Лаванда", price: 120, category: "багаторічні" },
  { id: 7, name: "Алоє", price: 90, category: "сукуленти" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "всі";

function renderCatalog() {
  let filtered = currentCategory === "всі"
    ? plants
    : plants.filter(p => p.category === currentCategory);

  catalog.innerHTML = filtered.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <b>${p.price} грн</b><br>
      <button onclick="addToCart(${p.id})">Купити</button>
    </div>
  `).join("");
}

function setCategory(cat) {
  currentCategory = cat;
  renderCatalog();
}

function addToCart(id) {
  let item = plants.find(p => p.id === id);

  let existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    cartBox.innerHTML = "Кошик пустий";
    return;
  }

  let total = 0;

  cartBox.innerHTML = cart.map(item => {
    total += item.price * item.qty;

    return `
      <div>
        <p>${item.name}</p>
        <p>${item.qty} × ${item.price} грн</p>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
  }).join("");

  cartBox.innerHTML += <hr><b>Сума: ${total} грн</b>;
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCatalog();
renderCart();
