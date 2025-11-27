import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getReservasByUsuario, cancelarReserva } from "../api/reservaService";
import type { ReservaDetalle } from "../interfaces/Reserva";

export default function MisReservas() {
  const navigate = useNavigate();

  const [reservas, setReservas] = useState<ReservaDetalle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const usuario = JSON.parse(localStorage.getItem("user") || "null");
  const usuarioId = usuario?.idUser;

  useEffect(() => {
    if (!usuarioId) {
      setError("Debes iniciar sesión para ver tus reservas");
      setLoading(false);
      return;
    }

    const fetchReservas = async () => {
      try {
        const data = await getReservasByUsuario(usuarioId);
        setReservas(data);
      } catch (err) {
        console.error("Error al cargar reservas:", err);
        setError("Error al cargar reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [usuarioId]);

  // CANCELAR RESERVA
  const handleCancelar = async (idReserva: number) => {
    if (!confirm("¿Estás seguro de cancelar esta reserva?")) return;

    try {
      const res = await cancelarReserva(idReserva);

      if (!res.success) {
        setError(res.message || "No se pudo cancelar la reserva");
        return;
      }

      setMensaje("Reserva cancelada correctamente ✔");
      setReservas((prev) => prev.filter((r) => r.idReserva !== idReserva));
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
      setError("Error al cancelar la reserva");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Cargando reservas...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <div className="home-fondo py-5">
      <div className="container">
        <h2 className="text-center mb-4">Mis Reservas</h2>

        {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}

        {!reservas.length ? (
          <p className="text-center">No tienes reservas registradas.</p>
        ) : (
          reservas.map((r) => (
            <div key={r.idReserva} className="card mb-3 p-3 shadow-sm">

              <h5 className="fw-bold">{r.servicio}</h5>
              <p><strong>Profesional:</strong> {r.trabajador}</p>
              <p><strong>Fecha:</strong> {r.fecha}</p>
              <p><strong>Hora:</strong> {r.hora}</p>

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/reserva-detalle/${r.idReserva}`)}
                >
                  Ver detalle
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelar(r.idReserva)}
                >
                  Cancelar
                </button>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}
