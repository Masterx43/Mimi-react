import type { Service } from "../interfaces/Service";

const BASE_URL = "http://localhost:8083/api/servicios";

// Obtener todos
export async function getServicios(): Promise<Service[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener servicios");
  return res.json();
}

// Obtener por ID
export async function getServicioById(id: number): Promise<Service> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Servicio no encontrado");
  return res.json();
}

// Crear
export async function createServicio(data: Omit<Service, "idServicio">): Promise<Service> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear servicio");
  return res.json();
}

// Actualizar
export async function updateServicio(id: number, data: Partial<Service>): Promise<Service> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar servicio");
  return res.json();
}

// Eliminar
export async function deleteServicio(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar servicio");
}


