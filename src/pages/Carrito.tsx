// src/pages/Carrito.tsx
import { useCart } from "../hooks/useCart";
import { CLP } from "../utils/currency";

export default function Carrito() {
  const { cart, total, empty } = useCart();

  return (
    <div className="home-fondo">
      <div className="container cajita-fondo">
        <div className="container cajita-fondo2">
          <h1 className="text-center mb-4">Tu Carrito</h1>

          {cart.length === 0 ? (
            <p className="text-center">Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">

                      {/* Imagen */}
                      <img
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded shadow-sm"
                      />

                      <div>
                        <strong>{item.name}</strong>

                        <p className="mb-0 text-muted">
                          {item.qty} × {CLP.format(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <span className="fw-bold">
                      {CLP.format(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-end">
                <h4>Total: {CLP.format(total)}</h4>
              </div>

              <div className="text-center mt-4 d-flex justify-content-center gap-3">
                <button className="btn btn-outline-secondary" onClick={empty}>
                  Vaciar carrito
                </button>
                <button className="btn botonRosado">Proceder al pago</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
