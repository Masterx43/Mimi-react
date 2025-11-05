import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Reutilizamos la misma interfaz de usuario
interface User {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const adminEmail = "admin@mimi.cl";
    const adminPassword = "123456";

    // Verificar si es administrador
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
      return;
    }

    // Verificar si es un usuario registrado
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
    <div className="cajita-fondo d-flex justify-content-center align-items-center">
      <div className="cajita-fondo2" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@mimi.cl"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
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
  );
}
