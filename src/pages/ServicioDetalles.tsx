import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServicioById } from "../api/servicioService";
import type { Service } from "../interfaces/Service";

export default function ServicioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servicio, setServicio] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchServicio = async () => {
      try {
        const data = await getServicioById(Number(id));
        setServicio(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Error desconocido";
        console.error("Error cargando servicio:", msg);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchServicio();
  }, [id]);

  if (loading) {
    return (
      <div className="home-fondo text-center py-5">
        <h3>Cargando servicio...</h3>
      </div>
    );
  }

  if (error || !servicio) {
    return (
      <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card p-5 text-center shadow-lg border-0" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h2 className="mb-3">Servicio no encontrado</h2>
          <p className="text-muted">{error}</p>
          <button className="btn botonRosado mt-3" onClick={() => navigate("/servicios")}>
            Volver a Servicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-fondo py-5">
      <div className="container d-flex justify-content-center">
        <div className="card p-4 shadow-lg border-0" style={{ borderRadius: "12px", backgroundColor: "white", maxWidth: "1000px" }}>
          <div className="row align-items-center">

            {/* Imagen */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={servicio.imagenUrl}
                alt={servicio.nombre}
                className="img-fluid rounded shadow-sm"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  maxHeight: "400px",
                  width: "100%",
                }}
              />
            </div>

            {/* Descripción */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">{servicio.nombre}</h2>
              <p className="text-muted">{servicio.descripcion}</p>

              <h4 className="fw-bold mb-4">
                {servicio.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </h4>

              <div className="d-flex gap-3">
                <button
                  className="btn botonRosado"
                  onClick={() => navigate(`/reserva?servicio=${servicio.idServicio}`)}
                >
                  Reservar ahora
                </button>

                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                  Volver
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
