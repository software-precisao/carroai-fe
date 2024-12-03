import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.carroai.app",
  // baseURL: "http://localhost:3000",
});
