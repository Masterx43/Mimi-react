import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface User {
  name?: string;
  email?: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Cargar datos guardados del usuario
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const admin = localStorage.getItem("isAdmin");

    if (admin === "true") {
      setIsAdmin(true);
      setUser({ name: "Administrador", email: "admin@mimi.cl" });
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(false);
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
    navigate("/inicio"); // redirige al login
  };

  if (!user) {
    return (
      <div className="cajita-fondo2 text-center p-4">
        <h3> No hay sesión activa</h3>
        <button
          className="btn botonRosado mt-3"
          onClick={() => navigate("/inicio")}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="container cajita-fondo2 mt-5 text-center" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">{isAdmin ? "Panel de Administrador" : "Tu Cuenta"}</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Correo:</strong> {user.email}</p>
      <p>
        Estado:{" "}
        {isAdmin ? (
          <span className="text-warning fw-bold">Administrador 🛡️</span>
        ) : (
          <span className="text-success fw-bold">Usuario Activo 💚</span>
        )}
      </p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
