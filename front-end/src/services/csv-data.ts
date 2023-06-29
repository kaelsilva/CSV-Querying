import api from "./api";

export async function uploadCsv(data: FormData) {
  const response = await api.post("/api/files", data);

  return response;
}

export async function getCsv(query: string): Promise<string[][]> {
  const response = await api.get(`/api/users?q=${query}`);

  return response.data.csv_array;
}
