const catalog = document.getElementById("catalog");
const cartBox = document.getElementById("cart-box");
const cartCount = document.getElementById("cart-count");

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
];;

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "всі";

function renderCatalog() {
  let filtered = currentCategory === "всі"
    ? plants
    : plants.filter(p => p.category === currentCategory);

 catalog.innerHTML = filtered.map(p => `
  <div class="card">
    <img src="${p.image}" style="width:100%; height:150px; object-fit:cover;">
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
