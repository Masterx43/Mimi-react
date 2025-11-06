import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/service";

export default function ServicioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const servicio = services.find((s) => s.id === id);

  if (!servicio) {
    return (
      <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card p-5 text-center shadow-lg border-0" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h2 className="mb-3">Servicio no encontrado</h2>
          <p className="text-muted">El servicio que buscas no existe o fue eliminado.</p>
          <button
            className="btn botonRosado mt-3"
            onClick={() => navigate("/servicios")}
          >
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
            {/*  Imagen */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={servicio.img}
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

            {/*  Descripción */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">{servicio.nombre}</h2>
              <p className="text-muted">{servicio.descCorta}</p>
              <p>{servicio.descLarga}</p>
              <h4 className="fw-bold mb-4">
                {servicio.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </h4>

              <div className="d-flex gap-3">
                <button
                  className="btn botonRosado"
                  onClick={() => navigate("/reserva")}
                >
                  Reservar ahora
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
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
