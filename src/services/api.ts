import axios from "axios";

export const movieAPI = axios.create({
  baseURL: `http://www.omdbapi.com/`,
});

export const baseAPI = axios.create({
  baseURL: `http://127.0.0.1:8000/`,
});
