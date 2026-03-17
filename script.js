const catalog = document.getElementById("catalog");

const plant = JSON.parse(localStorage.getItem("plant"));

if (plant) {
  catalog.innerHTML = `
    <h3>${plant.name}</h3>
    <p>${plant.desc}</p>
  `;
}
