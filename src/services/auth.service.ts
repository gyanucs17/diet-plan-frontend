import apiClient from "./apiClient";


export const register = (username: string, email: string, password: string) => {
  return apiClient.post("/user/register", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return apiClient.post("/user/login", {
      username,
      password,
    })
    
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  const userStr = localStorage.getItem("user");
    if (userStr) return true
    return false;
};

export const getAuthenticatedUser = () => {
  const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return false;
};