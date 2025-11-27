import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServicios } from "../api/servicioService";
import type { Service } from "../interfaces/Service";

export default function Servicios() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Cargar servicios desde el microservicio
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServicios();
        setServices(data);
      } catch (e) {
        console.error("Error cargando servicios:", e);
        setError("Error al cargar los servicios");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar servicios
  const filteredServices = useMemo(() => {
    if (!query.trim()) return services;
    return services.filter((s) =>
      s.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, services]);

  if (loading) {
    return <h3 className="text-center mt-5">Cargando servicios...</h3>;
  }

  if (error) {
    return <h3 className="text-center text-danger mt-5">{error}</h3>;
  }

  return (
    <div className="home-fondo">
      <div className="container cajita-fondo">
        <div className="container cajita-fondo2 text-center mb-4 p-4">
          <h1 className="mb-4">Nuestros Servicios</h1>

          {/* Barra de búsqueda */}
          <div className="input-group mt-4 mx-auto" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar servicio..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="container">
          <div className="row g-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service.idServicio} className="col-md-4">
                  <div className="card h-100 shadow-sm text-center border-0">

                    <img
                      src={service.imagen}
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
                      <p className="text-muted flex-grow-1">{service.descripcion}</p>

                      <p className="fw-bold mb-2 text-secondary">
                        {service.precio.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </p>

                      <div className="d-flex justify-content-center gap-2 mt-auto">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => navigate(`/servicio/${service.idServicio}`)}
                        >
                          Ver detalles
                        </button>

                        <button
                          className="btn botonRosado"
                          onClick={() => navigate(`/reserva?servicio=${service.idServicio}`)}
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
