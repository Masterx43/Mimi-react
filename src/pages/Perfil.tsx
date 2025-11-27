import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../service/AuthService";

// Interface ajustada al DTO del backend
interface User {
  idUser: number;
  nombre: string;
  apellido: string;
  correo: string;
  phone: string;
  rolId: number;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    getProfile(token).then((data) => {
      if (!data) {
        // Token inválido o expirado
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(data);
        setIsAdmin(data.rolId === 2); // ADMIN = rolId 2
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/inicio");
  };

  // Si no hay sesión activa
  if (!user) {
    return (
      <div
        className="home-fondo d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card p-5 text-center shadow-lg border-0"
          style={{ backgroundColor: "white", borderRadius: "12px", maxWidth: "400px" }}
        >
          <h3 className="mb-3">No hay sesión activa</h3>
          <p className="text-muted">Por favor, inicia sesión para continuar.</p>
          <button className="btn botonRosado mt-3" onClick={() => navigate("/inicio")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  // Vista usuario o admin
  return (
    <div
      className="home-fondo d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 text-center shadow-lg border-0"
        style={{ backgroundColor: "white", borderRadius: "12px", maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-4">{isAdmin ? "Panel de Administrador" : "Tu Cuenta"}</h2>

        <p>
          <strong>Nombre:</strong> {user.nombre} {user.apellido}
        </p>
        <p>
          <strong>Correo:</strong> {user.correo}
        </p>
        <p>
          <strong>Teléfono:</strong> {user.phone}
        </p>

        <p>
          <strong>Estado:</strong>{" "}
          {isAdmin ? (
            <span className="text-warning fw-bold">
              Administrador <i className="bi bi-shield-lock-fill"></i>
            </span>
          ) : (
            <span className="text-success fw-bold">
              Usuario Activo <i className="bi bi-person-circle"></i>
            </span>
          )}
        </p>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
