import api from "./api";

export async function login(email, senha) {
  const response = await api.post("/auth/login", { email, senha });
  return response.data; // retorna { access_token, token_type }
}

export function salvarToken(token) {
  localStorage.setItem("token", token);
}

export function removerToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function estaAutenticado() {
  return !!localStorage.getItem("token");
}