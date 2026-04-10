import api from "./api";

export async function getCertificados() {
  const response = await api.get("/certificados");
  return response.data;
}

export async function getCertificadoById(id) {
  const response = await api.get(`/certificados/${id}`);
  return response.data;
}

export async function criarCertificado(payload) {
  const response = await api.post("/certificados", payload);
  return response.data;
}

export async function atualizarCertificado(id, payload) {
  const response = await api.put(`/certificados/${id}`, payload);
  return response.data;
}

export async function deletarCertificado(id) {
  const response = await api.delete(`/certificados/${id}`);
  return response.data;
}