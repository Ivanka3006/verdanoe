const plants = [
  { name: "Троянда", price: 100, category: "Квіти" },
  { name: "Кактус", price: 50, category: "Сукуленти" }
];

function render() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  plants.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = <h3>${p.name}</h3><p>${p.price} грн</p>;
    catalog.appendChild(div);
  });
}

render();
