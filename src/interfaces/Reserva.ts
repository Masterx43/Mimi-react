import type { ReservaResponse } from "../interfaces/ReservaResponse";

export interface Reserva {
  idReserva: number;
  idServicio: number;
  idTrabajador: number;
  fecha: string;
  hora: string;

  // Datos que vienen del JOIN en el backend
  clienteNombre: string;
  clienteEmail: string;

  servicioNombre: string;
  trabajadorNombre: string;
}

export interface ReservaDetalle {
  idReserva: number;
  fecha: string;
  hora: string;
  estado: string;
  usuario: string;
  trabajador: string;
  servicio: string;
}


export interface CrearReservaPayload {
  idUsuario: number;
  idServicio: number;
  idTrabajador: number;
  fecha: string;
  hora: string;
  servicioNombre?: string;
  trabajadorNombre?: string;
}

export async function crearReserva(payload: CrearReservaPayload): Promise<ReservaResponse> {
  const res = await fetch("http://localhost:8086/api/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Error al crear la reserva");
  }

  return res.json();
}
