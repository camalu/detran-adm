export const getUserFromToken = (): any | null => {
  if (typeof window === "undefined") return null; // Evita erro no Next.js SSR

  const token = localStorage.getItem("detran_admin_token");
  if (!token) return null;

  try {
    // Decodifica o JWT (sem verificar assinatura)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
