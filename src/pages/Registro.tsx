import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Definimos el tipo de usuario
interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function Registro() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de contraseñas
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        const existingUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        // Verificar si el correo ya existe
        if (existingUsers.some((u) => u.email === email)) {
            setError("Ya existe una cuenta con este correo");
            return;
        }

        // Crear nuevo usuario
        const newUser: User = { firstName, lastName, email, password };
        localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));


        setSuccess("Registro exitoso");
        setError("");

        // Redirigir después de 1.5 segundos al inicio de sesión
        setTimeout(() => navigate("/inicio"), 1500);
    };

    return (
        <div className="home-fondo">
            <div className="container cajita-fondo">
                <div className="cajita-fondo2 p-4" style={{ maxWidth: "450px" }}>
                    <h2 className="text-center mb-4">
                        <i className="bi bi-person-plus-fill me-2 text-primary"></i>
                        Crear cuenta
                    </h2>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Ej: Juan "
                                required
                            />
                        </div>

                        <div className=" mb-3">
                            <label className="form-label">Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Ej: Torres"
                                required
                            />
                        </div>

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
                                placeholder="Mínimo 6 caracteres"
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repite la contraseña"
                                required
                            />
                        </div>

                        <button type="submit" className="btn botonRosado w-100">
                            Registrarse
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
