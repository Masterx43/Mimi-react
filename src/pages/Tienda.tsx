import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products as initialProducts } from "../data/products";
import type { Product } from "../data/products";

export default function Tienda() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simula fetch local: podrías cambiarlo por un fetch('/products.json') si lo pones en /public
    setProducts(initialProducts);
  }, []);

  return (
    <div className="container cajita-fondo">
      <section className="mt-4">
        <div className="container cajita-fondo3">
          <h2 className="text-center mb-3">Tienda</h2>
        </div>
        <div className="row g-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
