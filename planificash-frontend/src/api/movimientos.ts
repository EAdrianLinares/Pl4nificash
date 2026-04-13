const API_URL = import.meta.env.VITE_API_URL;

export async function getMovimientos() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function crearMovimiento(movimiento: any) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movimiento),
  });

  const data = await response.json();
  return data;
}