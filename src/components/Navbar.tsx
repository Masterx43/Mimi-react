import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.ts";

export default function Navbar() {
  const navigate = useNavigate();
  const { count } = useCart();

  return (
    <div className="container cajita-fondo">
      <div className="row mt-1">
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 px-3">
          <Link className="navbar-brand" to="/">
            <img src="/assets/img/mimi.logo.webp" alt="logoMimi" height={80} />
          </Link>
          <div className="ms-auto d-flex align-items-center gap-3">
            <NavLink className="nav-link" to="/tienda">
              Tienda
            </NavLink>
            <button
              className="btn position-relative"
              onClick={() => navigate("/tienda")}
            >
              <i className="fa-solid fa-cart-shopping" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {count}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
