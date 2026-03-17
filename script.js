const catalog = document.getElementById("catalog");

// беремо дані з localStorage
const plant = JSON.parse(localStorage.getItem("plant"));

if (plant) {
  catalog.innerHTML = `
    <div>
      <h3>${plant.name}</h3>
      <p>${plant.desc}</p>
    </div>
  `;
} else {
  catalog.innerHTML = "<p>Немає рослин</p>";
}
