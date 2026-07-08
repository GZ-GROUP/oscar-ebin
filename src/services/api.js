const API_URL = import.meta.env.VITE_API_URL;
const API_TARGET = import.meta.env.VITE_API_TARGET;

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Agregar token de autenticación si está disponible
  const token = localStorage.getItem("access_token");
  if (token) {
    // CORREGIDO: Se agregaron las comillas invertidas (backticks)
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
    // CORREGIDO: Se agregaron las comillas invertidas (backticks)
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const text = await response.text();
    console.log('Response text:', text); // Para debug
    
    // Extraer JSON si hay HTML antes
    const jsonStart = text.indexOf('{');
    const jsonText = jsonStart !== -1 ? text.substring(jsonStart) : text;
    let result;
    try {
      result = JSON.parse(jsonText);
    } catch (parseError) {
      throw new Error(`Respuesta no es JSON válido: ${text} `);
    }

    if (!response.ok) {
      // Si es 401, limpiar tokens y redirigir al login
      if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/signin";
      }
      throw new Error(result.message || "Error en la solicitud");
    }

    return result;
  } catch (error) {
    throw error;
  }
};