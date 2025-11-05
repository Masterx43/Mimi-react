import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/service";

export default function ServicioDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const servicio = services.find((s) => s.id === id);

  if (!servicio) {
    return (
      <div className="cajita-fondo text-center">
        <h2>Servicio no encontrado</h2>
        <button className="btn botonRosado mt-3" onClick={() => navigate("/servicios")}>
          Volver a Servicios
        </button>
      </div>
    );
  }

  return (
    <div className="container cajita-fondo">
      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <img
            src={servicio.img}
            alt={servicio.nombre}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{servicio.nombre}</h2>
          <p className="text-muted">{servicio.descCorta}</p>
          <p>{servicio.descLarga}</p>
          <h4 className="fw-bold mb-4">
            ${servicio.precio.toLocaleString("es-CL")}
          </h4>
          <div className="d-flex gap-3">
            <button className="btn botonRosado" onClick={() => navigate('/reserva')}>Reservar ahora</button>
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
