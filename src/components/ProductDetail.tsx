import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { CLP } from "../utils/currency";
import { useCart } from "../hooks/useCart";

export default function ProductDetail({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { add } = useCart();

  const back = useCallback(() => navigate(-1), [navigate]);

  return (
    <div className="container cajita-fondo">
      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={`http://localhost:8087/${product.imagen}`}
            alt={product.nombre}
            className="img-fluid rounded shadow-sm"
            onError={(e) => (e.currentTarget.src = "/fallback.webp")}
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{product.nombre}</h2>

          <p className="text-muted">
            Categoría: {product.categoria?.nombre ?? product.categoriaId}
          </p>

          <p>{product.descripcion}</p>

          <h4 className="mb-4">{CLP.format(product.precio)}</h4>

          <div className="d-flex gap-2">
            <button className="btn botonRosado" onClick={() => add(product)}>
              Agregar al carrito
            </button>

            <button className="btn btn-outline-secondary" onClick={back}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
