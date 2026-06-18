import axios from "axios";

const TOKEN_STORAGE_KEY = "accessToken";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
if (savedToken) {
  setAuthToken(savedToken);
}

export default api;
