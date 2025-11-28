import { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productService";
import type { Product } from "../interfaces/Product";

export default function Tienda() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // ← microservicio real
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    return products.filter((p) =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  return (
    <div className="home-fondo">
      <div className="container cajita-fondo py-5">
        <section className="mt-4">
          <div className="container cajita-fondo3">
            <h2 className="text-center mb-3">Tienda</h2>

            <div className="text-center mb-4">
              <div className="input-group mx-auto" style={{ maxWidth: "400px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar producto..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuery(query.trim())}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard key={p.idProduct} product={p} />
              ))
            ) : (
              <p className="text-center mt-4">
                No se encontraron productos con ese nombre
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
