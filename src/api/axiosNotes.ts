import axios from "axios";

const notesApi = axios.create({
  baseURL: import.meta.env.VITE_NOTES_API_URL,
});

notesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default notesApi;
