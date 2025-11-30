import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!nombre || !apellido || !correo || !password) {
      setError("Debes completar todos los campos");
      return;
    }

    try {
      const res = await registerUser({
        nombre,
        apellido,
        correo,
        password,
        rolId: 1, // 1 = Usuario normal según tu backend
      });

      if (!res.success) {
        setError(res.message || "Error en el registro");
        return;
      }

      // Guardar token y datos del usuario
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setMensaje("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => navigate("/perfil"), 1500);

    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
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
            <i className="bi bi-person-plus-fill me-2 text-primary"></i>
            Crear cuenta
          </h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}
          {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}

          <form onSubmit={handleSubmit} data-testid="register-form">
            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: María"
                required
              />
            </div>

            {/* Apellido */}
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej: López"
                required
              />
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ej: maria@example.cl"
                required
              />
            </div>

            {/* Contraseña */}
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
              Crear cuenta
            </button>

            <p className="text-center mt-3">
              ¿Ya tienes cuenta?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/inicio");
                }}
              >
                Inicia sesión aquí
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
