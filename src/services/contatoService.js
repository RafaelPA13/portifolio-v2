import api from "./api";

export async function enviarEmail(payload) {
  const response = await api.post("/contato", payload);
  return response.data;
}
