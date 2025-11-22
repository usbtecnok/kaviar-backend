import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

// ----------------------
// 🔹 HOTEL – REGISTRO
// ----------------------
export async function createHotel(req, res) {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.hotel.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Email já registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const hotel = await prisma.hotel.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    res.json({ id: hotel.id, name: hotel.name, email: hotel.email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar hotel" });
  }
}

// ----------------------
// 🔹 HOTEL – LOGIN
// ----------------------
export async function loginHotel(req, res) {
  try {
    const { email, password } = req.body;

    const hotel = await prisma.hotel.findUnique({ where: { email } });
    if (!hotel) {
      return res.status(404).json({ error: "Hotel não encontrado" });
    }

    const valid = await bcrypt.compare(password, hotel.password);
    if (!valid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: hotel.id, role: "hotel" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({ token, hotel: { id: hotel.id, name: hotel.name, email: hotel.email } });
  } catch (error) {
    res.status(500).json({ error: "Erro no login do hotel" });
  }
}

// ----------------------
// 🔹 HOTEL – CRIAR COMBO
// ----------------------
export async function createCombo(req, res) {
  try {
    const hotelId = req.hotelId;
    const { title, description, price, points } = req.body;

    const combo = await prisma.combo.create({
      data: {
        title,
        description,
        price,
        hotelId,
        points: {
          create: points.map((p) => ({
            name: p.name,
            latitude: p.latitude,
            longitude: p.longitude,
            order: p.order,
          })),
        },
      },
      include: { points: true },
    });

    res.json(combo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar combo" });
  }
}

// ----------------------
// 🔹 LISTAR COMBOS DO HOTEL LOGADO
// ----------------------
export async function listCombosByHotel(req, res) {
  try {
    const hotelId = req.hotelId;

    const combos = await prisma.combo.findMany({
      where: { hotelId },
      include: { points: true },
    });

    res.json(combos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar combos do hotel" });
  }
}

// ----------------------
// 🔹 LISTAR TODOS OS COMBOS DISPONÍVEIS
// ----------------------
export async function listAllCombos(req, res) {
  try {
    const combos = await prisma.combo.findMany({
      include: { points: true, hotel: true },
    });

    res.json(combos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar combos" });
  }
}

// ----------------------
// 🔹 PASSAGEIRO – CRIAR PEDIDO DE COMBO
// ----------------------
export async function createComboOrder(req, res) {
  try {
    const passengerId = req.passengerId;
    const { comboId } = req.body;

    const order = await prisma.comboOrder.create({
      data: {
        passengerId,
        comboId,
        status: "PENDING",
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar pedido de combo" });
  }
}

// ----------------------
// 🔹 STATUS DO PEDIDO DO PASSAGEIRO
// ----------------------
export async function getComboOrderStatus(req, res) {
  try {
    const orderId = parseInt(req.params.id);

    const order = await prisma.comboOrder.findUnique({
      where: { id: orderId },
      include: {
        combo: { include: { points: true, hotel: true } },
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar status do combo" });
  }
}

// ----------------------
// 🔹 MOTORISTA ACEITAR O PEDIDO DO COMBO
// ----------------------
export async function driverAcceptComboOrder(req, res) {
  try {
    const orderId = parseInt(req.params.id);
    const driverId = req.driverId;

    const order = await prisma.comboOrder.update({
      where: { id: orderId },
      data: {
        driverId,
        status: "ACCEPTED",
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao aceitar pedido do combo" });
  }
}

