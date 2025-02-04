import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
  pedidos: Number,
  pagamentos: Number,
  totalVendas: Number,
});

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

export default Dashboard;
