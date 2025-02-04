"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/Auth/Signin";
import axios from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // Limpa erros anteriores
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

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
