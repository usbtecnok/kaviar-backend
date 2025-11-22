const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../config/jwt");

// =========================
//   ENVIAR OTP (Mock SMS)
// =========================
exports.requestOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Telefone é obrigatório." });

  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6 dígitos
  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

  await prisma.otpCode.create({
    data: {
      phone,
      code,
      expires_at: expires
    }
  });

  console.log(`\n📱 OTP MOCK para ${phone}: ${code}\n`);

  return res.json({ message: "Código enviado (mock). Ver console do servidor." });
};

// =========================
//   VERIFICAR OTP
// =========================
exports.verifyOtp = async (req, res) => {
  const { phone, code, type } = req.body;

  if (!phone || !code || !type)
    return res.status(400).json({ message: "Dados incompletos." });

  const otp = await prisma.otpCode.findFirst({
    where: { phone, code }
  });

  if (!otp) return res.status(400).json({ message: "Código inválido." });
  if (otp.expires_at < new Date())
    return res.status(400).json({ message: "Código expirado." });

  // Marcar como verificado
  if (type === "driver") {
    await prisma.driver.upsert({
      where: { phone },
      update: { verified_phone: true },
      create: {
        phone,
        name: "Motorista Kaviar",
        verified_phone: true
      }
    });
  } else if (type === "passenger") {
    await prisma.passenger.upsert({
      where: { phone },
      update: { verified_phone: true },
      create: {
        phone,
        name: "Passageiro Kaviar",
        verified_phone: true
      }
    });
  }

  await prisma.otpCode.delete({ where: { otp_id: otp.otp_id } });

  return res.json({ message: "Telefone verificado com sucesso." });
};

// =========================
//   REGISTRO EMAIL/SENHA
// =========================
exports.registerEmail = async (req, res) => {
  const { name, email, password, type } = req.body;

  if (!email || !password || !type)
    return res.status(400).json({ message: "Campos obrigatórios faltando." });

  const hashed = await bcrypt.hash(password, 10);

  if (type === "driver") {
    const user = await prisma.driver.create({
      data: { name, email, password: hashed, verified_email: true }
    });
    return res.json({ message: "Motorista registrado.", user });
  }

  if (type === "passenger") {
    const user = await prisma.passenger.create({
      data: { name, email, password: hashed, verified_email: true }
    });
    return res.json({ message: "Passageiro registrado.", user });
  }

  return res.status(400).json({ message: "Tipo inválido." });
};

// =========================
//   LOGIN EMAIL/SENHA
// =========================
exports.loginEmail = async (req, res) => {
  const { email, password, type } = req.body;

  let user = null;

  if (type === "driver") {
    user = await prisma.driver.findUnique({ where: { email } });
  } else if (type === "passenger") {
    user = await prisma.passenger.findUnique({ where: { email } });
  } else if (type === "admin") {
    user = await prisma.admin.findUnique({ where: { email } });
  }

  if (!user) return res.status(400).json({ message: "Usuário não encontrado." });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Senha incorreta." });

  const payload = { id: user[type + "_id"], type };

  const access = generateAccessToken(payload);
  const refresh = generateRefreshToken(payload);

  return res.json({
    message: "Login bem-sucedido.",
    access_token: access,
    refresh_token: refresh
  });
};

// =========================
//   REFRESH TOKEN
// =========================
exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = verifyRefreshToken(token);
    const access = generateAccessToken({ id: decoded.id, type: decoded.type });

    return res.json({
      access_token: access
    });

  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
