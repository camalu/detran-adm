"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/Auth/Signin";
import axios from "axios";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    setError(""); // Limpa erros anteriores
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://panelads-adm.onrender.com/api/login",
        {
          email,
          password,
        },
      );

      if (res.data.token) {
        localStorage.setItem("detran_admin_token", res.data.token);
        router.push("/");
      } else {
        setError("Erro ao tentar fazer login. Tente novamente.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Erro ao tentar fazer login. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Corrigindo erro de hidratação: só renderiza após o tema estar carregado
  if (!mounted) return null;

  return (
    <SignIn
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      handleLogin={handleLogin}
    />
  );
}
