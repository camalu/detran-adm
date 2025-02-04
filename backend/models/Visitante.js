import mongoose from "mongoose";

const VisitanteSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  navegador: String,
  dispositivo: String,
  renavam: String,
  valorGerado: Number,
  parcelasSelecionadas: [Number], // Armazena as parcelas selecionadas
  statusPagamento: {
    type: String,
    enum: ["gerado", "pago"],
    default: "gerado",
  },
  dataAcesso: { type: Date, default: Date.now },
});

const Visitante = mongoose.model("Visitante", VisitanteSchema);

export default Visitante;
