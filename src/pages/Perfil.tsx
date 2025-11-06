import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface User {
  firstName?: string;
  email?: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  //Cargar datos guardados del usuario
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
      setUser({ firstName: "Administrador", email: "admin@mimi.cl" });
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(false);
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  //Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
    navigate("/inicio");
  };

  //Sin sesión activa
  if (!user) {
    return (
      <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
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

  //Vista del usuario o admin
  return (
    <div className="home-fondo d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div
        className="card p-4 text-center shadow-lg border-0"
        style={{ backgroundColor: "white", borderRadius: "12px", maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-4">
          {isAdmin ? "Panel de Administrador" : "Tu Cuenta"}
        </h2>

        <p>
          <strong>Nombre:</strong> {user.firstName}
        </p>
        <p>
          <strong>Correo:</strong> {user.email}
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
