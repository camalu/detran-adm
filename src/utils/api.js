import axios from "axios";

const api = axios.create({
  baseURL: "https://panelads-adm.onrender.com/api", // Ajuste conforme necessário
});

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem("detran_admin_token"); // Remove o token
      window.location.href = "/auth/sign-in"; // Redireciona para a página de login
    }
    return Promise.reject(error);
  },
);

export default api;
