import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

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
  idProduct: 1,
  nombre: "Mascarilla Capilar",
  descripcion: "Tratamiento profundo para el cabello seco.",
  precio: 12990,
  imagen: "mascarilla.webp",
  categoria: {
    idCategoria: 5,
    nombre: "Capilares",
  },
};

beforeEach(() => {
  mockAdd.mockClear();
  mockNavigate.mockClear();
});

describe("ProductDetail component", () => {

  const renderDetail = () =>
    render(
      <MemoryRouter>
        <ProductDetail product={product} />
      </MemoryRouter>
    );

  // --------------------------------------------------------
  it("renderiza el nombre, descripción y precio", () => {
    renderDetail();

    expect(screen.getByText("Mascarilla Capilar")).toBeInTheDocument();
    expect(screen.getByText("Tratamiento profundo para el cabello seco.")).toBeInTheDocument();
    expect(screen.getByText("$12.990")).toBeInTheDocument(); // Formateo CLP
  });

  // --------------------------------------------------------
  it("renderiza la categoría por nombre", () => {
    renderDetail();

    expect(screen.getByText("Categoría: Capilares")).toBeInTheDocument();
  });

  // --------------------------------------------------------
  it("llama a add(product) cuando se presiona 'Agregar al carrito'", () => {
    renderDetail();

    const addBtn = screen.getByText("Agregar al carrito");
    fireEvent.click(addBtn);

    expect(mockAdd).toHaveBeenCalledWith(product);
  });

  // --------------------------------------------------------
  it("llama a navigate(-1) cuando se presiona 'Volver'", () => {
    renderDetail();

    const backBtn = screen.getByText("Volver");
    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  // --------------------------------------------------------
  it("usa imagen fallback cuando ocurre error de carga", () => {
    renderDetail();

    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/fallback.webp");
  });

  // --------------------------------------------------------
  it("renderiza la imagen correctamente", () => {
    renderDetail();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "http://localhost:8087/mascarilla.webp"
    );
  });
});
