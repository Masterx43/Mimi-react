import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCart } from "../hooks/useCart";
import type { Product } from "../interfaces/Product";
import type { CartItem } from "../hooks/useCart";

// --- MOCK useLocalStorage ---
const mockSetValue = vi.fn();

vi.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: () => ({
    value: mockCart,
    setValue: mockSetValue,
  }),
}));

// Estado interno simulado del carrito
let mockCart: CartItem[] = [];

beforeEach(() => {
  mockCart = [];
  mockSetValue.mockClear();
});

// Producto de prueba
const mockProduct: Product = {
  idProduct: 1,
  nombre: "Shampoo Premium",
  descripcion: "Hidratación intensa",
  precio: 10000,
  imagen: "shampoo.webp",
  categoriaId: 5,
};

describe("useCart hook", () => {
  // ---------------------------------------------------------
  it("inicia con carrito vacío", () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.cart).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.total).toBe(0);
  });

  // ---------------------------------------------------------
  it("agrega un producto nuevo al carrito", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.add(mockProduct);
    });

    expect(mockSetValue).toHaveBeenCalled();

    // lo importante es que setValue reciba un callback
    const setFunction = mockSetValue.mock.calls[0][0];
    const updated = setFunction([]);

    expect(updated).toEqual([
      {
        id: 1,
        name: "Shampoo Premium",
        price: 10000,
        image: "http://localhost:8087/shampoo.webp",
        qty: 1,
      },
    ]);
  });

  // ---------------------------------------------------------
  it("incrementa qty si el producto ya existe", () => {
    mockCart = [
      {
        id: 1,
        name: "Shampoo Premium",
        price: 10000,
        image: "http://localhost:8087/shampoo.webp",
        qty: 1,
      },
    ];

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.add(mockProduct);
    });

    const setFunction = mockSetValue.mock.calls[0][0];
    const updated = setFunction(mockCart);

    expect(updated[0].qty).toBe(2);
  });

  // ---------------------------------------------------------
  it("calcula correctamente el total", () => {
    mockCart = [
      { id: 1, name: "A", price: 2000, qty: 2, image: "" },
      { id: 2, name: "B", price: 3000, qty: 1, image: "" },
    ];

    const { result } = renderHook(() => useCart());

    expect(result.current.total).toBe(2000 * 2 + 3000);
  });

  // ---------------------------------------------------------
  it("calcula correctamente el count", () => {
    mockCart = [
      { id: 1, name: "A", price: 2000, qty: 2, image: "" },
      { id: 2, name: "B", price: 3000, qty: 1, image: "" },
    ];

    const { result } = renderHook(() => useCart());

    expect(result.current.count).toBe(3);
  });

  // ---------------------------------------------------------
  it("vacía el carrito con empty()", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.empty();
    });

    expect(mockSetValue).toHaveBeenCalledWith([]);
  });
});
