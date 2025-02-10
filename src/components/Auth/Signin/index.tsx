"use client";

import { useTheme } from "next-themes";

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
  const { theme } = useTheme(); // Captura o tema atual

  return (
    <div
      className={`w-full max-w-md rounded-lg p-6 shadow-lg transition-all ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-center text-2xl font-bold">Bem-vindo ao Painel</h2>
      <p className="text-center text-gray-500 dark:text-gray-300">
        Faça login para continuar
      </p>

      {error && (
        <div className="mt-4 text-center text-sm text-red-500">{error}</div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </div>
  );
}
