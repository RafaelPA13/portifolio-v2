import api from "./api";

export async function getTecnologias() {
  const response = await api.get("/tecnologias");
  return response.data;
}

export async function getTecnologiaById(id) {
  const response = await api.get(`/tecnologias/${id}`);
  return response.data;
}

export async function criarTecnologia(payload) {
  const response = await api.post("/tecnologias", payload);
  return response.data;
}

export async function atualizarTecnologia(id, payload) {
  const response = await api.put(`/tecnologias/${id}`, payload);
  return response.data;
}

export async function deletarTecnologia(id) {
  const response = await api.delete(`/tecnologias/${id}`);
  return response.data;
}