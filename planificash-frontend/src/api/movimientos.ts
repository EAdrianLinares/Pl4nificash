const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 
import type { CreateMovimiento } from "../types/movimiento";



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

export async function getDisponibleActual() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos/disponible/actual`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener disponible");
  }

  return data;
}

export async function getPendientesMesSiguiente() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos/pendientes/mes-siguiente`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener pendientes");
  }

  return data;
}

export async function crearMovimiento(body: CreateMovimiento) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export async function actualizarMovimiento(
  id: string,
  body: Partial<CreateMovimiento>
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar movimiento");
  }

  return data;
}

export async function eliminarMovimiento(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar movimiento");
  }

  return data;
}

// Aplicar recurrentes
export async function aplicarRecurrentes() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movimientos-recurrentes/aplicar-mes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al aplicar recurrentes");
  }

  return data;
}