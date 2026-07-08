import { apiCall } from "./api";

// Helper para generar un username a partir del email
const generateUsername = (email) => {
  return email.split("@")[0];
};

export const signUp = async (name, email, password) => {
  const username = generateUsername(email);
  
  try {
    const result = await apiCall("/signup", "POST", {
      username,
      name,
      email,
      password,
      is_company: false,
      balance: 0,
    });

    if (result.success) {
      return {
        success: true,
        message: "¡Cuenta creada exitosamente! Por favor inicia sesión.",
      };
    } else {
      throw new Error("No se pudo crear la cuenta");
    }
  } catch (error) {
    throw new Error(error.message || "Error al registrarse");
  }
};

export const login = async (email, password) => {
  try {
    const result = await apiCall("/login", "POST", {
      email,
      password,
    });

    if (!result.authenticated) {
      throw new Error("Email o contraseña incorrectos");
    }

    // Guardar tokens en localStorage
    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return {
      success: true,
      message: "¡Inicio de sesión exitoso!",
      user: result.user,
      tokens: {
        access_token: result.access_token,
        refresh_token: result.refresh_token,
      },
    };
  } catch (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};
