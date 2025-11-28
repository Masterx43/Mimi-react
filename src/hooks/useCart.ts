import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Product } from "../interfaces/Product";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export function useCart() {
  const { value: cart, setValue: setCart } =
    useLocalStorage<CartItem[]>("cart", []);

  const add = useCallback(
    (p: Product) => {
      setCart((prev) => {
        const next = [...prev];

        const found = next.find((i) => i.id === p.idProduct);

        if (found) {
          found.qty += 1;
        } else {
          next.push({
            id: p.idProduct,
            name: p.nombre,
            price: p.precio,
            image: `http://localhost:8087/${p.imagen}`,
            qty: 1,
          });
        }

        return next;
      });
    },
    [setCart]
  );

  const empty = useCallback(() => setCart([]), [setCart]);

  const total = useMemo(
    () => cart.reduce((acc, it) => acc + it.price * it.qty, 0),
    [cart]
  );

  const count = useMemo(
    () => cart.reduce((acc, it) => acc + it.qty, 0),
    [cart]
  );

  return { cart, add, empty, total, count };
}
