import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { services as initialServices } from "../data/service";
import type { Service } from "../interfaces/Service";

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
    <div className="home-fondo"> 
      <div className="container cajita-fondo">
        <div className="container cajita-fondo2 text-center mb-4 p-4">
          <h1 className="mb-4">Nuestros Servicios</h1>

          {/*Barra de búsqueda */}
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

        {/*Cards de servicios */}
        <div className="container">
          <div className="row g-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service.id} className="col-md-4">
                  <div className="card h-100 shadow-sm text-center border-0">
                    <img
                      src={service.img}
                      alt={service.nombre}
                      className="card-img-top"
                      style={{
                        objectFit: "cover",
                        height: "230px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold">{service.nombre}</h5>
                      <p className="text-muted flex-grow-1">{service.descCorta}</p>
                      <p className="fw-bold mb-2 text-secondary">
                        {service.precio.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </p>

                      <div className="d-flex justify-content-center gap-2 mt-auto">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => navigate(`/servicio/${service.id}`)}
                        >
                          Ver detalles
                        </button>
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
              <p className="text-center mt-4">No se encontraron servicios</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
