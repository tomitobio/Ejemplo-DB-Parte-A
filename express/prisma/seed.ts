import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        title: "Smartphone",
        image: "https://example.com/smartphone.png",
        price: 799.99,
        favorite: true,
      },
      {
        title: "Auriculares",
        image: "https://example.com/headphones.png",
        price: 149.99,
      },
      {
        title: "Cámara",
        image: "https://example.com/camera.png",
        price: 1200,
      },
    ],
  });
}

main()
  .then(() => console.log("Seed ejecutado 🚀"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
