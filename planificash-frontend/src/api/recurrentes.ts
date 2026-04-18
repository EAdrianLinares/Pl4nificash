const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
import type { CreateRecurrente } from "../types/movimiento";

// 🔐 helper para headers
function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

//////////////////////////////////////////////////////
// 📥 OBTENER RECURRENTES
//////////////////////////////////////////////////////
export async function getRecurrentes() {
  const userString = localStorage.getItem("user");

if (!userString) {
  throw new Error("Usuario no autenticado");
}

const user = JSON.parse(userString);
const userId = user.id;

  const response = await fetch(
    `${API_URL}/movimientos-recurrentes?usuario_id=${userId}`,
    {
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener recurrentes");
  }

  return data;
}

//////////////////////////////////////////////////////
// ➕ CREAR RECURRENTE
//////////////////////////////////////////////////////
export async function createRecurrente(body: CreateRecurrente) {
  const response = await fetch(`${API_URL}/movimientos-recurrentes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear recurrente");
  }

  return data;
}

//////////////////////////////////////////////////////
// ✏️ ACTUALIZAR
//////////////////////////////////////////////////////
export async function updateRecurrente(id: number, body: any) {
  const response = await fetch(`${API_URL}/movimientos-recurrentes/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar");
  }

  return data;
}

//////////////////////////////////////////////////////
// ❌ ELIMINAR (soft delete)
//////////////////////////////////////////////////////
export async function deleteRecurrente(id: number) {
  const response = await fetch(`${API_URL}/movimientos-recurrentes/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar");
  }

  return data;
}

//////////////////////////////////////////////////////
// 🔥 APLICAR MES (todos)
//////////////////////////////////////////////////////
export async function aplicarRecurrentes() {
  const response = await fetch(`${API_URL}/movimientos-recurrentes/aplicar`, {
    method: "POST",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al aplicar recurrentes");
  }

  return data;
}

//////////////////////////////////////////////////////
// 🔥 APLICAR RECURRENTE INDIVIDUAL
//////////////////////////////////////////////////////
export async function aplicarRecurrenteIndividual(recurrenteId: number) {
  const userString = localStorage.getItem("user");

  if (!userString) {
    throw new Error("Usuario no autenticado");
  }

  const user = JSON.parse(userString);
  const userId = user.id;

  const response = await fetch(
    `${API_URL}/movimientos-recurrentes/${recurrenteId}/aplicar`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ usuario_id: userId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al aplicar recurrente");
  }

  return data;
}