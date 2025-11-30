import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReservaDetalleById } from "../api/reservaService";

import type { ReservaDetalle } from "../interfaces/Reserva";

export default function ReservaDetalle() {
  const { idReserva } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState<ReservaDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!idReserva) {
      setError("Reserva no encontrada");
      setLoading(false);
      return;
    }

    const fetchReserva = async () => {
      try {
        const data = await getReservaDetalleById(Number(idReserva));
        setReserva(data);
      } catch (err) {
        console.error("Error cargando reserva:", err);
        setError("No se pudo cargar la reserva");
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [idReserva]);

  if (loading) return <h3 className="text-center mt-4">Cargando detalle...</h3>;
  if (error || !reserva)
    return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <div className="home-fondo py-5">
      <div className="container d-flex justify-content-center">
        <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "600px" }}>

          <h2 className="text-center mb-3">Detalle de tu Reserva</h2>

          <p><strong>Servicio:</strong> {reserva.servicio}</p>
          <p><strong>Profesional:</strong> {reserva.trabajador}</p>
          <p><strong>Fecha:</strong> {reserva.fecha}</p>
          <p><strong>Hora:</strong> {reserva.hora}</p>
          <p><strong>Estado:</strong> {reserva.estado}</p>

          <hr />

          <div className="d-flex justify-content-center mt-4 gap-3">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
