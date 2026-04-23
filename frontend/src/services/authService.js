import api from "./api";

export const loginAPI = (data) => api.post("/login", data);
export const registerAPI = (data) => api.post("/register", data);
export const logoutAPI = () => api.post("/logout");
