import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../data/products.ts";
import { CLP } from "../utils/currency.ts";
import { useCart } from "../hooks/useCart.ts";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { add } = useCart();

  const goDetail = useCallback(() => {
    navigate(`/producto/${product.id}`);
  }, [navigate, product.id]);

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top fit contain"
          alt={product.name}
        />
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="fw-bold mb-2">{CLP.format(product.price)}</p>
          <div className="d-grid gap-2 mt-auto">
            <button className="btn botonRosado" onClick={goDetail}>
              Ver detalle
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => add(product)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
