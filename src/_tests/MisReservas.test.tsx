import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, beforeEach, test, expect, vi } from "vitest";
import MisReservas from "../pages/MisReservas";


// mock de navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

// mock API
const mockGetReservasByUsuario = vi.fn();
const mockCancelarReserva = vi.fn();

vi.mock("../api/reservaService", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getReservasByUsuario: (...args: any[]) =>
    mockGetReservasByUsuario(...args),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cancelarReserva: (...args: any[]) =>
    mockCancelarReserva(...args),
}));

// mock confirm()
vi.spyOn(window, "confirm").mockImplementation(() => true);



describe("MisReservas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // ====================== TEST 1 ======================
  test("muestra mensaje de error si no hay usuario logueado", async () => {
    render(
      <MemoryRouter>
        <MisReservas />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Debes iniciar sesión para ver tus reservas")
    ).toBeInTheDocument();
  });

  // ====================== TEST 2 ======================
  test("muestra reservas cargadas correctamente", async () => {
    localStorage.setItem("user", JSON.stringify({ idUser: 5 }));

    mockGetReservasByUsuario.mockResolvedValue([
      {
        idReserva: 1,
        servicio: "Corte de cabello",
        trabajador: "Ana",
        fecha: "2025-02-10",
        hora: "10:00",
        estado: "PENDIENTE",
      },
    ]);

    render(
      <MemoryRouter>
        <MisReservas />
      </MemoryRouter>
    );

    expect(await screen.findByText("Corte de cabello")).toBeInTheDocument();
    expect(screen.getByText(/Ana/)).toBeInTheDocument();
    expect(screen.getByText(/2025-02-10/)).toBeInTheDocument();
  });

  // ====================== TEST 3 ======================
  test("muestra mensaje si no hay reservas", async () => {
    localStorage.setItem("user", JSON.stringify({ idUser: 5 }));

    mockGetReservasByUsuario.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <MisReservas />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("No tienes reservas registradas.")
    ).toBeInTheDocument();
  });

  // ====================== TEST 4 ======================
  test("cancelar una reserva elimina la tarjeta", async () => {
    localStorage.setItem("user", JSON.stringify({ idUser: 5 }));

    mockGetReservasByUsuario.mockResolvedValue([
      {
        idReserva: 1,
        servicio: "Peinado",
        trabajador: "Carlos",
        fecha: "2025-02-11",
        hora: "15:00",
        estado: "PENDIENTE",
      },
    ]);

    mockCancelarReserva.mockResolvedValue({
      estado: "OK",
      message: "Cancelada",
    });

    render(
      <MemoryRouter>
        <MisReservas />
      </MemoryRouter>
    );

    const cancelBtn = await screen.findByText("Cancelar");
    await userEvent.click(cancelBtn);

    expect(mockCancelarReserva).toHaveBeenCalledWith(1);

    await waitFor(() =>
      expect(screen.queryByText("Peinado")).not.toBeInTheDocument()
    );
  });

  // ====================== TEST 5 ======================
  test("redirige al detalle de la reserva", async () => {
    localStorage.setItem("user", JSON.stringify({ idUser: 5 }));

    mockGetReservasByUsuario.mockResolvedValue([
      {
        idReserva: 7,
        servicio: "Coloración",
        trabajador: "María",
        fecha: "2025-02-15",
        hora: "09:00",
        estado: "PENDIENTE",
      },
    ]);

    render(
      <MemoryRouter>
        <MisReservas />
      </MemoryRouter>
    );

    const detalleBtn = await screen.findByText("Ver detalle");
    await userEvent.click(detalleBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/reserva-detalle/7");
  });
});
