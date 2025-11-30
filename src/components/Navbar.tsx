import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart.ts";
import logo from "../assets/img/logotopbarmimi.png";
import { useEffect, useState } from "react";

export interface User {
  idUser: number;
  nombre: string;
  apellido: string;
  correo: string;
  rolId: number;
}


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { count } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Cargar sesión activa al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAdmin(userData.rolId === 2);
      
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [location.pathname]);


  const handlerRedirection = () => {
    if (isAdmin) {
      navigate("/admin"); // panel administrador
    } else if (user) {
      navigate("/perfil"); // perfil de usuario
    } else {
      navigate("/inicio"); // sin sesión → login o registro
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4 py-2 mb-3 navbar-morado">
      <div className="container-fluid">
        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logoMimi" height={80} />
        </Link>

        {/* ENLACES DEL NAVBAR */}
        <div className="ms-auto d-flex align-items-center gap-3">
          <NavLink
            to="/tienda"
            className={({ isActive }) =>
              `nav-link fs-5 ${isActive ? "fw-bold text-primary" : ""}`
            }
          >
            Tienda
          </NavLink>

          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              `nav-link fs-5 ${isActive ? "fw-bold text-primary" : ""}`
            }
          >
            Servicios
          </NavLink>

          <NavLink
            to="/reserva"
            className={({ isActive }) =>
              `nav-link fs-5 ${isActive ? "fw-bold text-primary" : ""}`
            }
          >
            Reserva
          </NavLink>

          {/* ÍCONO DE USUARIO */}
          <button
            className="btn position-relative"
            onClick={handlerRedirection} // lleva al perfil o panel de usuario
            title={user ? "Ver cuenta" : "Iniciar sesión"}
          >
            <i
              className={`bi ${isAdmin
                ? "bi-shield-lock-fill text-warning" // admin
                : user
                  ? "bi-person-circle text-success" // usuario
                  : "bi-person text-dark" // sin sesión
                }`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>


          {/* CARRITO */}
          <button
            className="btn position-relative"
            onClick={() => navigate("/carrito")}
            title="Ver carrito"
          >
            <i className="bi bi-cart-fill"></i>
            {count > 0 && (
              <span
                key={count}
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
