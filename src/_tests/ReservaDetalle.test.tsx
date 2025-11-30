import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, beforeEach, test, expect, vi } from "vitest";

import ReservaDetalle from "../pages/ReservaDetalle";

// ========================
// MOCKS
// ========================

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useParams: () => ({ idReserva: "5" }),  // valor por defecto
  };
});

// Mock API
const mockGetReservaDetalleById = vi.fn();
vi.mock("../api/reservaService", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getReservaDetalleById: (...args: any[]) =>
    mockGetReservaDetalleById(...args),
}));

// ========================
// TESTS
// ========================
describe("ReservaDetalle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ------------------------
  test("muestra mensaje de carga correctamente", () => {
    mockGetReservaDetalleById.mockResolvedValueOnce(null);

    render(
      <MemoryRouter>
        <ReservaDetalle />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando detalle...")).toBeInTheDocument();
  });

  // ------------------------
  test("muestra error si no existe la reserva", async () => {
    mockGetReservaDetalleById.mockRejectedValueOnce(new Error("No existe"));

    render(
      <MemoryRouter>
        <ReservaDetalle />
      </MemoryRouter>
    );

    const errorMsg = await screen.findByText("No se pudo cargar la reserva");
    expect(errorMsg).toBeInTheDocument();
  });

  // ------------------------
  test("muestra correctamente los datos de la reserva", async () => {
    mockGetReservaDetalleById.mockResolvedValueOnce({
      idReserva: 5,
      servicio: "Manicure",
      trabajador: "Josefa",
      fecha: "2025-12-01",
      hora: "15:00",
      estado: "PENDIENTE",
    });

    render(
      <MemoryRouter>
        <ReservaDetalle />
      </MemoryRouter>
    );

    expect(await screen.findByText("Manicure")).toBeInTheDocument();
    expect(screen.getByText(/Josefa/)).toBeInTheDocument();
    expect(screen.getByText(/2025-12-01/)).toBeInTheDocument();
    expect(screen.getByText(/15:00/)).toBeInTheDocument();
    expect(screen.getByText(/PENDIENTE/)).toBeInTheDocument();
  });

  // ------------------------
  test("botón volver usa navigate(-1)", async () => {
    mockGetReservaDetalleById.mockResolvedValueOnce({
      idReserva: 5,
      servicio: "Peinado",
      trabajador: "Camila",
      fecha: "2025-12-05",
      hora: "10:30",
      estado: "CONFIRMADA",
    });

    render(
      <MemoryRouter>
        <ReservaDetalle />
      </MemoryRouter>
    );

    const btnVolver = await screen.findByText("Volver");
    await userEvent.click(btnVolver);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
