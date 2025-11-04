import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type  { Product } from "../data/products";
import { CLP } from "../utils/currency";
import { useCart } from "../hooks/useCart.ts";

export default function ProductDetail({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { add } = useCart();

  const back = useCallback(() => navigate(-1), [navigate]);

  return (
    <div className="container cajita-fondo">
      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <p className="text-muted">Categoría: {product.category}</p>
          <p>{product.description}</p>
          <h4 className="mb-4">{CLP.format(product.price)}</h4>
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
