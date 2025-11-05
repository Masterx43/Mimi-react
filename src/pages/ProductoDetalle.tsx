import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../data/products"; //aqui importamos la lista completa de los productos
import type { Product } from "../interfaces/Product"; //Aqui importamos la interface del producto
import ProductDetail from "../components/ProductDetail";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (!found) {
      navigate("/tienda");
      return;
    }
    setProduct(found);
  }, [id, navigate]);

  if (!product) return null;
  return <ProductDetail product={product} />;
}
