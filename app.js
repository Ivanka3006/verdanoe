const plants = [
  { name: "Монстера", price: 300 },
  { name: "Фікус", price: 250 },
  { name: "Сукулент", price: 150 },
  { name: "Кактус", price: 120 }
];

const catalog = document.getElementById("catalog");

plants.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = <h3>${p.name}</h3><p>${p.price} грн</p>;
  catalog.appendChild(div);
});
