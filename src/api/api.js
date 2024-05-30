import axios from "axios";

// Cria uma instância do Axios com uma URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
