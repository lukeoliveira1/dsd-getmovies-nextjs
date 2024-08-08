import axios from "axios";

export const movieAPI = axios.create({
  baseURL: `http://www.omdbapi.com/`,
});
