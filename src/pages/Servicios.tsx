import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { services as initialServices } from "../data/service";
import type { Service } from "../data/service";

export default function Servicios() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setServices(initialServices);
  }, []);

  // Filtrado de servicios
  const filteredServices = useMemo(() => {
    if (!query.trim()) return services;
    return services.filter((s) =>
      s.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, services]);

  return (
    <div className="cajita-fondo">
      <div className="container cajita-fondo2 text-center mb-4">
        <h1 className="mb-4">💆‍♀️ Nuestros Servicios</h1>
        <p>
          En <strong>Mimi</strong> cuidamos tu belleza y bienestar con los mejores
          tratamientos. Encuentra el servicio perfecto para ti y agenda tu cita fácilmente.
        </p>

        {/* 🔍 Barra de búsqueda */}
        <div className="input-group mt-4 mx-auto" style={{ maxWidth: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar servicio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      {/* 💅 Cards de servicios */}
      <div className="container">
        <div className="row g-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.id} className="col-md-4">
                <div className="card h-100 shadow-sm text-center">
                  <img
                    src={service.img}
                    alt={service.nombre}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "230px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold">{service.nombre}</h5>
                    <p className="text-muted flex-grow-1">{service.descCorta}</p>
                    <p className="fw-bold mb-2">
                      {service.precio.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </p>

                    <div className="d-flex justify-content-center gap-2 mt-auto">
                      {/* Botón de detalles */}
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(`/servicio/${service.id}`)}
                      >
                        Ver detalles
                      </button>

                      {/* 💜 Botón de reserva */}
                      <button
                        className="btn botonRosado"
                        onClick={() => navigate(`/reserva?servicio=${service.id}`)}
                      >
                        Reservar hora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No se encontraron servicios </p>
          )}
        </div>
      </div>
    </div>
  );
}
