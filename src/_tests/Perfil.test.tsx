import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Perfil from "../pages/Perfil";
import { MemoryRouter } from "react-router-dom";

// -------- MOCK useNavigate --------
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// -------- MOCK API --------
const mockGetProfile = vi.fn();

vi.mock("../api/authService", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserProfile: (...args: any[]) => mockGetProfile(...args),
}));

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockClear();
  mockGetProfile.mockClear();
});

const renderPerfil = () =>
  render(
    <MemoryRouter>
      <Perfil />
    </MemoryRouter>
  );

describe("Perfil page", () => {

  // -----------------------------------------------------
  it("muestra pantalla de carga mientras loading = true", async () => {
    mockGetProfile.mockResolvedValueOnce({}); // se resolverá luego

    renderPerfil();

    expect(screen.getByText("Cargando tu perfil...")).toBeInTheDocument();
  });

  // -----------------------------------------------------
  it("muestra error si el backend devuelve data.error", async () => {
    mockGetProfile.mockResolvedValueOnce({ error: true });

    renderPerfil();

    await waitFor(() =>
      expect(
        screen.getByText("Tu sesión expiró o el token no es válido")
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Ir a Iniciar sesión"));
    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });

  // -----------------------------------------------------
  it("muestra error si la API lanza excepción", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockGetProfile.mockRejectedValueOnce(new Error("fail"));

    renderPerfil();

    await waitFor(() =>
      expect(
        screen.getByText("No se pudo cargar tu información")
      ).toBeInTheDocument()
    );
  });

  // -----------------------------------------------------
  it("muestra el perfil del usuario correctamente", async () => {
    mockGetProfile.mockResolvedValueOnce({
      idUser: 1,
      nombre: "Bastián",
      apellido: "Gómez",
      correo: "bastian@test.cl",
      phone: "123456789",
      rolId: 1,
    });

    renderPerfil();

    // El título ahora es "Tu Perfil"
    await waitFor(() =>
      expect(screen.getByText("Tu Perfil")).toBeInTheDocument()
    );

    expect(screen.getByText("Bastián Gómez")).toBeInTheDocument();
    expect(screen.getByText("bastian@test.cl")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument(); // teléfono
    expect(screen.getByText(/Usuario/)).toBeInTheDocument();
  });

  // -----------------------------------------------------
  it("navega a /mis-reservas cuando se presiona 'Ver mis reservas'", async () => {
    mockGetProfile.mockResolvedValueOnce({
      idUser: 1,
      nombre: "A",
      apellido: "B",
      correo: "a@b.cl",
      rolId: 1,
    });

    renderPerfil();

    await waitFor(() => screen.getByText("Ver mis reservas"));

    fireEvent.click(screen.getByText("Ver mis reservas"));

    expect(mockNavigate).toHaveBeenCalledWith("/mis-reservas");
  });

  // -----------------------------------------------------
  it("cierra sesión correctamente y navega a /inicio", async () => {
    localStorage.setItem("token", "abc123");
    localStorage.setItem("user", JSON.stringify({ name: "Test" }));

    mockGetProfile.mockResolvedValueOnce({
      idUser: 1,
      nombre: "Test",
      apellido: "User",
      correo: "a@b.cl",
      rolId: 1,
    });

    renderPerfil();

    await waitFor(() => screen.getByText("Cerrar sesión"));

    fireEvent.click(screen.getByText("Cerrar sesión"));

    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("user")).toBe(null);
    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });
});
