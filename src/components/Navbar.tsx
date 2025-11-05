import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.ts";
import logo from "../assets/img/mimi.logo.webp"

export default function Navbar() {
  const navigate = useNavigate();
  const { count } = useCart();

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
              `nav-link ${isActive ? "fw-bold text-primary" : ""}`
            }
          >
            Tienda
          </NavLink>

          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : ""}`
            }
          >
            Servicios
          </NavLink>

          {/* BOTÓN CARRITO */}
          <button
            className="btn position-relative"
            onClick={() => navigate("/carrito")} // 👈 CAMBIO AQUÍ
          >
            <i className="bi bi-cart-fill"></i>
            {count > 0 && ( // 👈 oculta el número si está vacío
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
