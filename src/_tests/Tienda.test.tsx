import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, beforeEach, test, expect, vi } from "vitest";
import Tienda from "../pages/Tienda";

// ===== MOCK: ProductCard para no renderizar el componente real =====
vi.mock("../components/ProductCard", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ product }: any) => (
    <div data-testid="product-card">{product.nombre}</div>
  ),
}));

// ===== MOCKS de API =====
const mockGetProducts = vi.fn();

vi.mock("../api/productService", () => ({
  getProducts: () => mockGetProducts(),
}));

// ===== DATA DE PRUEBA =====
const mockProductos = [
  { idProduct: 1, nombre: "Shampoo", descripcion: "", precio: 5000, imagen: "" },
  { idProduct: 2, nombre: "Acondicionador", descripcion: "", precio: 7000, imagen: "" },
];

describe("Tienda", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetProducts.mockResolvedValue(mockProductos);
  });

  // ---------- TEST 1: Carga inicial ----------
  test("muestra los productos cargados desde la API", async () => {
    render(
      <MemoryRouter>
        <Tienda />
      </MemoryRouter>
    );

    expect(await screen.findByText("Shampoo")).toBeInTheDocument();
    expect(await screen.findByText("Acondicionador")).toBeInTheDocument();
  });

  // ---------- TEST 2: Búsqueda filtra correctamente ----------
  test("filtra productos por nombre", async () => {
    render(
      <MemoryRouter>
        <Tienda />
      </MemoryRouter>
    );

    // Esperar a que carguen
    await screen.findByText("Shampoo");

    const input = screen.getByPlaceholderText("Buscar producto...");

    await userEvent.type(input, "sham");

    expect(screen.getByText("Shampoo")).toBeInTheDocument();
    expect(screen.queryByText("Acondicionador")).not.toBeInTheDocument();
  });

  // ---------- TEST 3: No hay resultados ----------
  test("muestra mensaje cuando no hay coincidencias", async () => {
    render(
      <MemoryRouter>
        <Tienda />
      </MemoryRouter>
    );

    await screen.findByText("Shampoo");

    const input = screen.getByPlaceholderText("Buscar producto...");

    await userEvent.type(input, "zzzzzzz");

    expect(
      screen.getByText("No se encontraron productos con ese nombre")
    ).toBeInTheDocument();
  });
});
