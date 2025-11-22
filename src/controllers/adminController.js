import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "kaviar_admin_secret";

// Criar admin
export async function createAdmin(req, res) {
  try {
    const { name, email, password } = req.body;

    const adminExists = await prisma.admin.findUnique({ where: { email } });
    if (adminExists) {
      return res.status(400).json({ error: "Administrador já existe." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { name, email, password: hashed },
    });

    res.json({
      success: true,
      message: "Administrador criado com sucesso.",
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("Erro createAdmin:", error);
    res.status(500).json({ error: "Erro interno ao criar admin." });
  }
}

// Login admin
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("Erro loginAdmin:", error);
    res.status(500).json({ error: "Erro interno no login." });
  }
}

// Ver perfil admin
export async function getAdminProfile(req, res) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin não encontrado." });
    }

    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      createdAt: admin.createdAt,
    });
  } catch (error) {
    console.error("Erro getAdminProfile:", error);
    res.status(500).json({ error: "Erro interno." });
  }
}

export default {
  createAdmin,
  loginAdmin,
  getAdminProfile,
};
