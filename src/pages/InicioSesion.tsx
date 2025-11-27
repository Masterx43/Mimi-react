import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";

export default function InicioSesion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);

      if (!res.success || !res.user) {
        setError("Credenciales incorrectas");
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/perfil");

    } catch (e) {
      console.error("Error en login: ",e);
      setError("Error al conectar con el servidor");
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
