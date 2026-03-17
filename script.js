const catalog = document.getElementById("catalog");

let plants = JSON.parse(localStorage.getItem("plants")) || [];

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
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(plants[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Додано в кошик");
}

function openProduct(index) {
  localStorage.setItem("currentProduct", index);
  window.location.href = "product.html";
}
