const catalog = document.getElementById("catalog");

// масив товарів
const plants = JSON.parse(localStorage.getItem("plants")) || [];

if (plants.length > 0) {
  catalog.innerHTML = plants.map((plant, index) => `
    <div>
      <h3>${plant.name}</h3>
      <p>${plant.desc}</p>
      <b>${plant.price} грн</b><br>
      <button onclick="addToCart(${index})">Купити</button>
    </div>
  `).join("");
} else {
  catalog.innerHTML = "Немає товарів";
}

function addToCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(plants[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Додано в кошик");
}
