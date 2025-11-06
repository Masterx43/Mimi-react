import { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { products as initialProducts } from "../data/products";
import type { Product } from "../interfaces/Product";

export default function Tienda() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simula fetch local (puedes cambiarlo por un fetch real)
    setProducts(initialProducts);
  }, []);

  // Filtrado de productos según búsqueda
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  return (
    <div className="home-fondo">
      <div className="container cajita-fondo py-5">
        <section className="mt-4">
          <div className="container cajita-fondo3">
            <h2 className="text-center mb-3">Tienda</h2>

            {/* Barra de búsqueda con ícono */}
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

          {/* Lista de productos */}
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
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
