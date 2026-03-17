const catalog = document.getElementById("catalog");

let plants = [
  {
    name: "Туя Смарагд",
    category: "туї",
    price: 250
  },
  {
    name: "Троянда",
    category: "квіти",
    price: 150
  }
];

function render(data) {
  if (data.length === 0) {
    catalog.innerHTML = "Немає товарів";
    return;
  }

  catalog.innerHTML = data.map((plant, index) => `
    <div>
      <h3 onclick="openProduct(${index})">${plant.name}</h3>
      <p>${plant.category}</p>
      <b>${plant.price} грн</b><br>
      <button onclick="addToCart(${index})">Купити</button>
    </div>
  `).join("");
}

render(plants);

function filter(cat) {
  if (cat === "всі") {
    render(plants);
  } else {
    const filtered = plants.filter(p => p.category === cat);
    render(filtered);
  }
}
function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = plants[index];

  let existing = cart.find(p => p.name === item.name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Додано в кошик");
}


function openProduct(index) {
  localStorage.setItem("currentProduct", index);
  window.location.href = "product.html";
}
