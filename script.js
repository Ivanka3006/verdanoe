const catalog = document.getElementById("catalog");

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

function renderCatalog() {
  catalog.innerHTML = plants.map(p => `
    <div class="card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <b>${p.price} грн</b>
    </div>
  `).join("");
}

renderCatalog();
