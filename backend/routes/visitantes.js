import express from "express";
import Visitante from "../models/Visitante.js";

const router = express.Router();

router.post("/visitantes", async (req, res) => {
  try {
    const { renavam, valorGerado, parcelasSelecionadas, statusPagamento } =
      req.body;

    const userAgent = req.headers["user-agent"];
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const navegador = userAgent.split(" ")[0];
    const dispositivo = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    const novoVisitante = new Visitante({
      ip,
      userAgent,
      navegador,
      dispositivo,
      renavam,
      valorGerado,
      parcelasSelecionadas,
      statusPagamento,
    });

    await novoVisitante.save();
    res.status(201).json({ message: "Visitante cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar visitante" });
  }
});

export default router;
