import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api/authService";

import type { User } from "../interfaces/User";

export default function Perfil() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // CARGA DEL BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();

        if (data.error) {
          setError("Tu sesión expiró o el token no es válido");
          setUser(null);
        } else {
          setUser(data);
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);
        setError("No se pudo cargar tu información");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/inicio");
  };

  // LOADING
  if (loading) {
    return (
      <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h3>Cargando tu perfil...</h3>
      </div>
    );
  }

  // ERROR
  if (!user || error) {
    return (
      <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card p-5 text-center shadow-lg border-0" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h3>Error</h3>
          <p className="text-muted">{error || "Debes iniciar sesión"}</p>

          <button className="btn botonRosado mt-3" onClick={() => navigate("/inicio")}>
            Ir a Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  // PERFIL REAL
  return (
    <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div
        className="card p-4 text-center shadow-lg border-0"
        style={{ backgroundColor: "white", borderRadius: "12px", maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-4">Tu Perfil</h2>

        <p><strong>Nombre completo:</strong> {user.nombre} {user.apellido}</p>

        <p><strong>Correo:</strong> {user.correo}</p>

        <p><strong>Teléfono:</strong> {user.phone}</p>

        <p><strong>Rol:</strong>{" "}
          {user.rolId === 2 ? (
            <span className="text-warning fw-bold">
              Administrador <i className="bi bi-shield-lock-fill"></i>
            </span>
          ) : (
            <span className="text-success fw-bold">
              Usuario <i className="bi bi-person-circle"></i>
            </span>
          )}
        </p>

        <button
          className="btn botonRosado mt-3"
          onClick={() => navigate("/mis-reservas")}
        >
          Ver mis reservas
        </button>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
