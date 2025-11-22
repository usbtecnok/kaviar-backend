require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@usbtecnok.com.br";
  const password = "@#*Z4939ia4";

  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashed,
      name: "Admin USBtecnok",
    },
    create: {
      name: "Admin USBtecnok",
      email,
      password: hashed,
    },
  });

  console.log("✅ Admin criado/atualizado com sucesso:");
  console.log(`   Email: ${admin.email}`);
  console.log("   Use a senha definida no script.");
}

main()
  .catch((e) => {
    console.error("Erro ao criar admin:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
