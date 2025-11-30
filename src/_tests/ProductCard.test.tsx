import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { MemoryRouter } from "react-router-dom";

// ---- MOCK useCart ----
const mockAdd = vi.fn();

vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    add: mockAdd,
  }),
}));

// ---- MOCK useNavigate ----
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ==== PRODUCTO DE PRUEBA ====
const product = {
  idProduct: 10,
  nombre: "Shampoo Hidratante",
  descripcion: "Shampoo profesional para hidratación profunda",
  precio: 7990,
  imagen: "shampoo.webp",
};

beforeEach(() => {
  mockAdd.mockClear();
  mockNavigate.mockClear();
});

describe("ProductCard component", () => {
  const renderProduct = () =>
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

  // --------------------------------------------------
  it("renderiza nombre, precio y imagen", () => {
    renderProduct();

    expect(screen.getByText("Shampoo Hidratante")).toBeInTheDocument();
    expect(screen.getByText("$7.990")).toBeInTheDocument(); // formato CLP
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "http://localhost:8087/shampoo.webp"
    );
  });

  // --------------------------------------------------
  it("navega al detalle del producto al hacer click en 'Ver detalle'", () => {
    renderProduct();

    const detailBtn = screen.getByText("Ver detalle");
    fireEvent.click(detailBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/producto/10");
  });

  // --------------------------------------------------
  it("agrega el producto al carrito al hacer click en 'Agregar al carrito'", () => {
    renderProduct();

    const addBtn = screen.getByText("Agregar al carrito");
    fireEvent.click(addBtn);

    expect(mockAdd).toHaveBeenCalledWith(product);
  });

  // --------------------------------------------------
  it("usa imagen fallback cuando la imagen falla", () => {
    renderProduct();

    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/fallback.webp");
  });
});
