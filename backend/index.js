import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid"; // Gera um UUID único

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Conectado ao MongoDB Atlas com sucesso!"))
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB Atlas:", err);
    process.exit(1); // Para evitar que a API continue rodando sem banco de dados
  });

// Modelo de Usuário (Revendedor)
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  token: { type: String, default: uuidv4 }, // Token único para cada revendedor
});

const User = mongoose.model("User", UserSchema);

const DashboardSchema = new mongoose.Schema({
  pedidos: Number,
  pagamentos: Number,
  totalVendas: Number,
});
const Dashboard = mongoose.model("Dashboard", DashboardSchema);

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { userId: user._id, userToken: user.token },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, userToken: user.token });
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  // Hash da senha antes de salvar
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criação do usuário
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "Usuário cadastrado com sucesso!" });
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const dashboardData = (await Dashboard.findOne()) || {
      pedidos: 0,
      pagamentos: 0,
      totalVendas: 0,
    };

    res.json({
      pedidos: dashboardData.pedidos,
      pagamentos: dashboardData.pagamentos,
      totalVendas: dashboardData.totalVendas,
      usuarioToken: user.token,
      email: user.email,
      nome: user.nome || "Usuário sem nome",
    });
  } catch (err) {
    console.error("Erro ao buscar dados do dashboard:", err);
    res.status(500).json({ error: "Erro ao buscar dados do dashboard." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
