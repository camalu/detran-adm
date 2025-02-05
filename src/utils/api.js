import axios from "axios";
import { useRouter } from "next/navigation";

// Criação da instância do Axios
const api = axios.create({
  baseURL: "http://localhost:5000/api", // 🔥 Ajuste para a URL do seu backend
});

// Interceptor para respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token expirado, deslogando usuário...");
      localStorage.removeItem("detran_admin_token"); // 🔥 Remove o token
      window.location.href = "/auth/sign-in"; // 🔥 Redireciona para login
    }
    return Promise.reject(error);
  },
);

export default api;
