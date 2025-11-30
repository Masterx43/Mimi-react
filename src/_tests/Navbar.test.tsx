import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";

// === MOCK useCart ===
vi.mock("../hooks/useCart.ts", () => ({
  useCart: () => ({ count: 3 }),
}));

// === MOCK logo ===
vi.mock("../assets/img/logotopbarmimi.png", () => ({
  default: "logo-mock.png",
}));

// === MOCK useNavigate ===
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
});

describe("Navbar Component", () => {

  const renderNavbar = (initialPath = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Navbar />
      </MemoryRouter>
    );
  };

  // ----------------------------------------------------
  it("renderiza los enlaces principales", () => {
    renderNavbar();

    expect(screen.getByText("Tienda")).toBeInTheDocument();
    expect(screen.getByText("Servicios")).toBeInTheDocument();
    expect(screen.getByText("Reserva")).toBeInTheDocument();
  });

  // ----------------------------------------------------
  it("muestra el contador del carrito cuando count > 0", () => {
    renderNavbar();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // ----------------------------------------------------
  it("redirige a /inicio si NO hay usuario en localStorage", () => {
    renderNavbar();

    const userButton = screen.getByTitle("Iniciar sesión");
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });

  // ----------------------------------------------------
  it("redirige a /perfil si hay usuario normal (rolId = 1)", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        idUser: 10,
        nombre: "Juan",
        apellido: "Tester",
        correo: "test@test.com",
        rolId: 1, // usuario normal
      })
    );

    renderNavbar();

    const userButton = screen.getByTitle("Ver cuenta");
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/perfil");
  });

  // ----------------------------------------------------
  it("redirige a /admin si el usuario es ADMIN (rolId = 2)", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        idUser: 1,
        nombre: "Admin",
        apellido: "Root",
        correo: "admin@test.com",
        rolId: 2, // admin
      })
    );

    renderNavbar();

    const userButton = screen.getByTitle("Ver cuenta");
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  // ----------------------------------------------------
  it("navega a /carrito al presionar el botón del carrito", () => {
    renderNavbar();

    const cartButton = screen.getByTitle("Ver carrito");
    fireEvent.click(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith("/carrito");
  });
});
