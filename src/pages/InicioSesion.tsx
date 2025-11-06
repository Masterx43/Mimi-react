import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function InicioSesion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const adminEmail = "admin@mimi.cl";
    const adminPassword = "123456";

    // 👑 Verificar si es administrador
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
      return;
    }

    // 👤 Verificar usuario registrado
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="home-fondo">
      <div className="container cajita-fondo">
        <div
          className="cajita-fondo2 p-4 shadow-lg"
          style={{ maxWidth: "450px", borderRadius: "16px" }}
        >
          <h2 className="text-center mb-4">
            <i className="bi bi-person-circle me-2 text-primary"></i>
            Iniciar sesión
          </h2>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@mimi.cl"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn botonRosado w-100">
              Iniciar sesión
            </button>

            <p className="text-center mt-3">
              ¿No tienes cuenta?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/registro");
                }}
              >
                Regístrate aquí
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
