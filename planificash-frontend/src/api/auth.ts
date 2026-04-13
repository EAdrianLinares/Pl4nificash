const API_URL = import.meta.env.VITE_API_URL;

async function fetchData(endpoint: string, body: any) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
  
}

// Login
export async function login(email: string, password: string) {
  return fetchData("/auth/login", { email, password });
}

// Register
export async function register(nombre: string, email: string, password: string) {
  return fetchData("/auth/register", { nombre, email, password });
}