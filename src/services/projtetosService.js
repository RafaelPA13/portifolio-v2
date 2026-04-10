import api from "./api";

export async function getProjetos() {
  const response = await api.get("/projetos");
  return response.data;
}

export async function getProjetoById(id) {
  const response = await api.get(`/projetos/${id}`);
  return response.data;
}

export async function criarProjeto(formData) {
  const response = await api.post("/projetos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function atualizarProjeto(id, formData) {
  const response = await api.put(`/projetos/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deletarProjeto(id) {
  const response = await api.delete(`/projetos/${id}`);
  return response.data;
}