import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/productService";
import type { Product } from "../interfaces/Product";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Error cargando el producto:", error);
        navigate("/tienda");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="home-fondo d-flex justify-content-center align-items-center"
           style={{ minHeight: "100vh" }}>
        <div className="card p-5 text-center shadow-lg border-0"
             style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h2 className="mb-3">Producto no encontrado</h2>
          <p className="text-muted">
            El producto que buscas no existe o fue eliminado.
          </p>
          <button className="btn botonRosado mt-3"
                  onClick={() => navigate("/tienda")}>
            Volver a Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-fondo py-5">
      <div className="container d-flex justify-content-center">
        <div className="card p-4 shadow-lg border-0"
             style={{ borderRadius: "12px", backgroundColor: "white", maxWidth: "1000px" }}>
          <div className="row align-items-center">

            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={`http://localhost:8087/${product.imagen}`}
                alt={product.nombre}
                className="img-fluid rounded shadow-sm"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  maxHeight: "400px",
                  width: "100%",
                }}
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-3">{product.nombre}</h2>
              <p className="text-muted">{product.descripcion}</p>
              <h4 className="fw-bold mb-4">
                {product.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </h4>

              <div className="d-flex gap-3">
                <button className="btn botonRosado"
                        onClick={() => navigate("/carrito")}>
                  Agregar al carrito
                </button>
                <button className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}>
                  Volver
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
