import api from "./api";

export async function uploadCurriculo(arquivo) {
  const formData = new FormData();
  formData.append("arquivo", arquivo);

  const response = await api.post("/curriculo/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function downloadCurriculo() {
  const response = await api.get("/curriculo/download");
  return response.data;
}