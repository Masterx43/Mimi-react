import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Registro from "../pages/Registro";
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

// --- MOCK registerUser ---
const mockRegister = vi.fn();

vi.mock("../api/authService", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerUser: (...args: any[]) => mockRegister(...args),
}));

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockClear();
  mockRegister.mockClear();
});

// Helper render
const renderRegistro = () =>
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );

describe("Registro page", () => {

  // ----------------------------------------------------------
  it("muestra error si faltan campos", async () => {
    renderRegistro();

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() =>
      expect(
        screen.getByText("Debes completar todos los campos")
      ).toBeInTheDocument()
    );
  });

  // ----------------------------------------------------------
  it("muestra mensaje de error si el backend responde con error", async () => {
    mockRegister.mockResolvedValue({
      success: false,
      message: "Correo ya registrado",
    });

    renderRegistro();

    fireEvent.change(screen.getByPlaceholderText("Ej: María"), {
      target: { value: "María" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: López"), {
      target: { value: "López" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: maria@example.cl"), {
      target: { value: "maria@example.cl" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345" },
    });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() =>
      expect(screen.getByText("Correo ya registrado")).toBeInTheDocument()
    );
  });

  // ----------------------------------------------------------
  it("registra exitosamente, guarda token/user y redirige", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    mockRegister.mockResolvedValue({
      success: true,
      token: "TOKEN123",
      user: { name: "María", email: "maria@example.cl" },
    });

    renderRegistro();

    fireEvent.change(screen.getByPlaceholderText("Ej: María"), {
      target: { value: "María" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: López"), {
      target: { value: "López" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: maria@example.cl"), {
      target: { value: "maria@example.cl" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345" },
    });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    // ✔️ Mensaje de éxito
    await waitFor(() =>
      expect(
        screen.getByText("¡Registro exitoso! Redirigiendo...")
      ).toBeInTheDocument()
    );

    // ✔️ Verificar almacenamiento
    expect(localStorage.getItem("token")).toBe("TOKEN123");
    expect(JSON.parse(localStorage.getItem("user")!)).toEqual({
      name: "María",
      email: "maria@example.cl",
    });

    // 🔥 Ejecutar TODOS los timeouts pendientes
    vi.runAllTimers();

    // ✔️ Debe redirigir
    expect(mockNavigate).toHaveBeenCalledWith("/perfil");

    vi.useRealTimers();
  });

  // ----------------------------------------------------------
  it("muestra error de servidor cuando registerUser lanza una excepción", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    vi.spyOn(console, "error").mockImplementation(() => {});
    mockRegister.mockRejectedValue(new Error("Server down"));

    renderRegistro();

    fireEvent.change(screen.getByPlaceholderText("Ej: María"), {
      target: { value: "María" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: López"), {
      target: { value: "López" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ej: maria@example.cl"), {
      target: { value: "maria@example.cl" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345" },
    });

    const form = screen.getByTestId("register-form");
    fireEvent.submit(form);

    await waitFor(() =>
      expect(
        screen.getByText("Error al conectar con el servidor")
      ).toBeInTheDocument()
    );

    vi.runAllTimers(); // prevenir timeout

    vi.useRealTimers();
  });

  // ----------------------------------------------------------
  it("redirige a inicio desde 'Inicia sesión aquí'", () => {
    renderRegistro();

    fireEvent.click(screen.getByText("Inicia sesión aquí"));

    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });
});
