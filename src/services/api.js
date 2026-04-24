const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
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
      throw new Error(`Respuesta no es JSON válido: ${text}`);
    }

    if (!response.ok) {
      throw new Error(result.message || "Error en la solicitud");
    }

    return result;
  } catch (error) {
    throw error;
  }
};
