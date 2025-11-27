export interface ReservaResponse {
  success: boolean;
  message: string;
  data?: {
    idReserva: number;
    idUsuario: number;
    idServicio: number;
    idTrabajador: number;
    fecha: string;
    hora: string;
  };
}
