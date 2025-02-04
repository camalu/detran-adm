import { useState } from "react";

interface SignInProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  loading: boolean;
  handleLogin: () => void;
}

export default function SignIn({
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
  handleLogin,
}: SignInProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Bem-vindo ao Painel</h2>
        <p className="text-center text-gray-500">Faça login para continuar</p>

        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <button
          className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}
