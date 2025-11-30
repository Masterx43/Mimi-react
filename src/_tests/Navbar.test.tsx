import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";

// === MOCK: useCart ===
vi.mock("../hooks/useCart.ts", () => ({
  useCart: () => ({ count: 3 }), // simulamos que hay 3 productos en el carrito
}));

// === MOCK: logo import ===
vi.mock("../assets/img/logotopbarmimi.png", () => ({
  default: "logo-mock.png",
}));

// === MOCK: useNavigate ===
// MOCK useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// Reset mocks
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
});

describe("Navbar", () => {

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

    const badge = screen.getByText("3"); 
    expect(badge).toBeInTheDocument();
  });

  // ----------------------------------------------------
  it("redirige al login si no hay usuario en localStorage", () => {
    renderNavbar();

    const userButton = screen.getByTitle("Iniciar sesión");
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });

  // ----------------------------------------------------
  it("redirige al perfil si el usuario normal está logueado", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Juan", email: "test@test.com", role: "USER" })
    );

    renderNavbar();

    const userButton = screen.getByTitle("Ver cuenta");
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/perfil");
  });

  // ----------------------------------------------------
  it("redirige al admin si el usuario tiene rol ADMIN", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Admin", email: "admin@test.com", role: "ADMIN" })
    );

    renderNavbar();

    const userButton = screen.getByTitle("Ver cuenta");
    fireEvent.click(userButton);

    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  // ----------------------------------------------------
  it("navega al carrito al presionar el botón de carrito", () => {
    renderNavbar();

    const cartButton = screen.getByTitle("Ver carrito");
    fireEvent.click(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith("/carrito");
  });
});
