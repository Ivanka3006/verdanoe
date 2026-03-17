const catalog = document.getElementById("catalog");

// беремо товари з localStorage
let plants = JSON.parse(localStorage.getItem("plants")) || [];

function render(data) {
  if (data.length === 0) {
    catalog.innerHTML = "Немає товарів";
    return;
  }

  catalog.innerHTML = data.map((plant, index) => `
    <div>
      <h3>${plant.name}</h3>
      <p>${plant.category}</p>
      <b>${plant.price} грн</b><br>
      <button onclick="addToCart(${index})">Купити</button>
    </div>
  `).join("");
}

// додаємо в кошик
function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = plants[index];

  let existing = cart.find(p => p.name === item.name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      name: item.name,
      price: item.price,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Додано в кошик");
}

// фільтр
function filter(cat) {
  if (cat === "всі") {
    render(plants);
  } else {
    const filtered = plants.filter(p => p.category === cat);
    render(filtered);
  }
}

// запуск
render(plants);
