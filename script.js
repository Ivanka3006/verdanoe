const catalog = document.getElementById("catalog");
const cartBox = document.getElementById("cart-box");

/* ТОВАРИ */
let plants = [
  {
    id: 1,
    name: "Туя Смарагд",
    price: 250,
    category: "хвойні",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Thuja_occidentalis_Smaragd.jpg/320px-Thuja_occidentalis_Smaragd.jpg"
  },
  {
    id: 2,
    name: "Троянда",
    price: 150,
    category: "квіти",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rose_pink_1.jpg/320px-Rose_pink_1.jpg"
  },
  {
    id: 3,
    name: "Яблуня",
    price: 200,
    category: "дерева",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Apple_tree.jpg/320px-Apple_tree.jpg"
  }
];

/* КОШИК */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* КАТАЛОГ */
function renderCatalog() {
  catalog.innerHTML = plants.map(p => `
    <div class="card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <b>${p.price} грн</b><br>
      <button onclick="addToCart(${p.id})">Купити</button>
    </div>
  `).join("");
}

/* ДОДАТИ В КОШИК */
function addToCart(id) {
  let item = plants.find(p => p.id === id);
  let existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart();
}

/* ВІДОБРАЖЕННЯ КОШИКА */
function renderCart() {
  if (!cartBox) return;

  if (cart.length === 0) {
    cartBox.innerHTML = "Кошик пустий";
    return;
  }

  let total = 0;

  cartBox.innerHTML = cart.map((item, index) => {
    total += item.price * item.qty;

    return `
      <div style="border-bottom:1px solid #ccc; padding:5px;">
        <b>${item.name}</b><br>
        ${item.price} грн × ${item.qty}<br>

        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="changeQty(${index}, -1)">-</button>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  }).join("");

  cartBox.innerHTML += <h3>Сума: ${total} грн</h3>;
}

/* ЗМІНА КІЛЬКОСТІ */
function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
}

/* ВИДАЛЕННЯ */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

/* ЗБЕРЕЖЕННЯ */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* ЗАПУСК */
renderCatalog();
renderCart();
