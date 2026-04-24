import { apiCall } from "./api";

export const signUp = async (name, email, password) => {
  return await apiCall("/signup", "POST", {
    name,
    email,
    password,
  });
};

export const login = async (email, password) => {
  return await apiCall("/login", "POST", {
    email,
    password,
  });
};
