import axios from "axios";
export const api = axios.create({
  baseURL: `http://localhost:4066/api`,
  // baseURL: `/api`,
});
// export const host = "/";
export const host = "http://localhost:4066";
