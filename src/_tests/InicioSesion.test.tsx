import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InicioSesion from "../pages/InicioSesion";
import { MemoryRouter } from "react-router-dom";

// --- MOCK useNavigate ---
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// --- MOCK API login ---
const mockLogin = vi.fn();

vi.mock("../api/authService", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (...args: any[]) => mockLogin(...args),
}));

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockClear();
  mockLogin.mockClear();
});

// Helper para renderizar
const renderLogin = () =>
  render(
    <MemoryRouter>
      <InicioSesion />
    </MemoryRouter>
  );

describe("InicioSesion page", () => {

  // --------------------------------------------------------------
  it("muestra error si las credenciales son incorrectas", async () => {
    mockLogin.mockResolvedValue({
      success: false,
      user: null,
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("ejemplo@mimi.cl"), {
      target: { value: "test@mimi.cl" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(
        screen.getByText("Credenciales incorrectas")
      ).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------
  it("realiza login exitoso, guarda datos y redirige al perfil", async () => {
    mockLogin.mockResolvedValue({
      success: true,
      token: "TOKEN123",
      user: { name: "Juan", email: "juan@mimi.cl" },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("ejemplo@mimi.cl"), {
      target: { value: "juan@mimi.cl" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("TOKEN123");
      expect(JSON.parse(localStorage.getItem("user")!)).toEqual({
        name: "Juan",
        email: "juan@mimi.cl",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/perfil");
    });
  });

  // --------------------------------------------------------------
  it("muestra error cuando el servidor falla", async () => {
    mockLogin.mockRejectedValue(new Error("Server down"));

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("ejemplo@mimi.cl"), {
      target: { value: "carlos@mimi.cl" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(
        screen.getByText("Error al conectar con el servidor")
      ).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------
  it("redirige a registro cuando se hace click en el enlace", () => {
    renderLogin();

    const link = screen.getByText("Regístrate aquí");

    fireEvent.click(link);

    expect(mockNavigate).toHaveBeenCalledWith("/registro");
  });
});
