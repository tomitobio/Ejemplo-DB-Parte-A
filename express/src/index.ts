import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET /products → lista todos los productos
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// POST /products → crea un producto
app.post("/products", async (req, res) => {
  const { title, image, price, favorite } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        title,
        image,
        price,
        favorite: favorite ?? false, // por defecto false si no lo mandan
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Error creating product" });
  }
});

// levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
