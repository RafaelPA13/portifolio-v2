import api from "./api";

export async function getExperiencias() {
  const response = await api.get("/experiencias");
  return response.data;
}

export async function getExperienciaById(id) {
  const response = await api.get(`/experiencias/${id}`);
  return response.data;
}

export async function criarExperiencia(payload) {
  const response = await api.post("/experiencias", payload);
  return response.data;
}

export async function atualizarExperiencia(id, payload) {
  const response = await api.put(`/experiencias/${id}`, payload);
  return response.data;
}

export async function deletarExperiencia(id) {
  const response = await api.delete(`/experiencias/${id}`);
  return response.data;
}