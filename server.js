const express = require("express");
const fs = require("fs-extra");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

// 🔥 ВАЖЛИВО ДЛЯ RENDER
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = "1234";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "public/uploads/" });

const DB_FILE = "db.json";

// ✅ якщо нема бази — створити
async function ensureDB() {
  const exists = await fs.pathExists(DB_FILE);
  if (!exists) {
    await fs.writeJson(DB_FILE, {
      products: [
        {
          id: 1,
          name: "Ялина звичайна",
          category: "хвойні",
          price: 250,
          quantity: 10,
          description: "Вічнозелена хвойна рослина",
          image: ""
        },
        {
          id: 2,
          name: "Яблуня",
          category: "плодові",
          price: 300,
          quantity: 5,
          description: "Смачні яблука",
          image: ""
        }
      ]
    }, { spaces: 2 });
  }
}

async function readDB() {
  await ensureDB();
  return fs.readJson(DB_FILE);
}

async function writeDB(data) {
  await fs.writeJson(DB_FILE, data, { spaces: 2 });
}

// API
app.get("/api/products", async (req, res) => {
  const data = await readDB();
  res.json(data.products);
});

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

app.put("/api/products/:id", async (req, res) => {
  if (req.headers.password !== ADMIN_PASSWORD)
    return res.status(403).send("Нема доступу");

  const db = await readDB();
  const product = db.products.find(p => p.id == req.params.id);

  if (!product) return res.status(404).send("Not found");

  Object.assign(product, req.body);
  await writeDB(db);

  res.json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  if (req.headers.password !== ADMIN_PASSWORD)
    return res.status(403).send("Нема доступу");

  const db = await readDB();
  db.products = db.products.filter(p => p.id != req.params.id);

  await writeDB(db);
  res.send("OK");
});

// 🔥 ДЛЯ RENDER (щоб не було помилок)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
