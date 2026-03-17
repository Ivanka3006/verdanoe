const catalog = document.getElementById("catalog");

const plant = JSON.parse(localStorage.getItem("plant"));

if (plant) {
  catalog.innerHTML = `
    <div>
      <h3>${plant.name}</h3>
      <p>${plant.desc}</p>
      <b>${plant.price} грн</b><br><br>
      <button onclick="addToCart()">Купити</button>
    </div>
  `;
} else {
  catalog.innerHTML = "<p>Немає рослин</p>";
}

function addToCart() {
  localStorage.setItem("cart", JSON.stringify(plant));
  alert("Додано в кошик!");
}
