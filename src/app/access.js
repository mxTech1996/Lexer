"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const allowedUsers = [
  { user: "julio", password: "passwordJulio" },
  { user: "ana", password: "passwordAna" },
  { user: "luis", password: "passwordLuis" },
  { user: "maria", password: "passwordMaria" },
  { user: "carlos", password: "passwordCarlos" },
  {
    user: "sofia",
    password: "passwordSofia",
  },
  {
    user: "pedro",
    password: "passwordPedro",
  },
  {
    user: "JamesKelley",
    password: "passwordJames",
  },
  {
    user: "RichardLewis",
    password: "passwordRichard",
  },
  {
    user: "CarlosAlonso",
    password: "passwordCarlos",
  },
  {
    user: "julioCesar",
    password: "passwordJulio",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = allowedUsers.find((u) => u.user === username);

    if (foundUser && foundUser.password === password) {
      setError("");
      router.push("/products");
      return;
    }

    setError("Usuario o contraseña incorrectos");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Please sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-foreground"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
