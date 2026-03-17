const express = require("express");
const fs = require("fs-extra");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = "1234";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "public/uploads/" });

const DB_FILE = "db.json";

async function readDB() {
  return fs.readJson(DB_FILE);
}

async function writeDB(data) {
  await fs.writeJson(DB_FILE, data, { spaces: 2 });
}

// отримати всі товари
app.get("/api/products", async (req, res) => {
  const data = await readDB();
  res.json(data.products);
});

// додати товар (адмін)
app.post("/api/products", upload.single("image"), async (req, res) => {
  if (req.headers.password !== ADMIN_PASSWORD)
    return res.status(403).send("Нема доступу");

  const db = await readDB();

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category,
    price: Number(req.body.price),
    quantity: Number(req.body.quantity),
    description: req.body.description,
    image: req.file ? "/uploads/" + req.file.filename : ""
  };

  db.products.push(newProduct);
  await writeDB(db);

  res.json(newProduct);
});

// оновити товар
app.put("/api/products/:id", async (req, res) => {
  if (req.headers.password !== ADMIN_PASSWORD)
    return res.status(403).send("Нема доступу");

  const db = await readDB();

  const product = db.products.find(p => p.id == req.params.id);
  Object.assign(product, req.body);

  await writeDB(db);
  res.json(product);
});

// видалити товар
app.delete("/api/products/:id", async (req, res) => {
  if (req.headers.password !== ADMIN_PASSWORD)
    return res.status(403).send("Нема доступу");

  const db = await readDB();
  db.products = db.products.filter(p => p.id != req.params.id);

  await writeDB(db);
  res.send("OK");
});

app.listen(PORT, () => console.log("Server running"));
