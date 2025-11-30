import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Reserva from "../pages/Reservas";
import { MemoryRouter } from "react-router-dom";

// ------------------ MOCKS ------------------
const mockGetServicios = vi.fn();
const mockGetTrabajadores = vi.fn();
const mockCrearReserva = vi.fn();

vi.mock("../api/servicioService", () => ({
  getServicios: () => mockGetServicios(),
}));

vi.mock("../api/trabajadorService", () => ({
  getTrabajadores: () => mockGetTrabajadores(),
}));

vi.mock("../api/reservaService", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crearReserva: (payload: any) => mockCrearReserva(payload),
}));

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// ------------------ HELPERS ------------------
const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/reserva"]}>
      <Reserva />
    </MemoryRouter>
  );

const getFecha = () => screen.getByTestId("input-fecha");
const getHora = () => screen.getByTestId("select-hora");
const getServ = () => screen.getByTestId("select-servicio");
const getTrab = () => screen.getByTestId("select-trabajador");

// ------------------ TESTS ------------------
describe("Reserva Page", () => {
  it("muestra error si falla servicios", async () => {
    mockGetServicios.mockRejectedValueOnce(new Error("fail"));
    mockGetTrabajadores.mockResolvedValueOnce([]);

    renderPage();

    expect(
      await screen.findByText("Error al cargar los servicios")
    ).toBeInTheDocument();
  });

  it("muestra error si falla trabajadores", async () => {
    mockGetServicios.mockResolvedValueOnce([]);
    mockGetTrabajadores.mockRejectedValueOnce(new Error("fail"));

    renderPage();

    expect(
      await screen.findByText("Error al cargar trabajadores")
    ).toBeInTheDocument();
  });

  it("muestra error si faltan campos", async () => {
    mockGetServicios.mockResolvedValueOnce([]);
    mockGetTrabajadores.mockResolvedValueOnce([]);

    renderPage();

    await userEvent.click(screen.getByText("Reservar hora"));

    expect(
      await screen.findByText("Por favor completa todos los campos")
    ).toBeInTheDocument();
  });

  it("muestra error si la fecha es domingo", async () => {
    mockGetServicios.mockResolvedValueOnce([]);
    mockGetTrabajadores.mockResolvedValueOnce([]);

    renderPage();

    fireEvent.change(screen.getByTestId("input-fecha"), {
      target: { value: "2025-01-05" },
    });

    expect(
      await screen.findByText(/No se puede reservar los domingos/i)
    ).toBeInTheDocument();
  });

  it("muestra horas hasta 14:00 si es sábado", async () => {
    mockGetServicios.mockResolvedValueOnce([]);
    mockGetTrabajadores.mockResolvedValueOnce([]);

    renderPage();

    await userEvent.type(getFecha(), "2025-01-04");

    expect(await screen.findByText("14:00")).toBeInTheDocument();
  });

  it("muestra error si no hay usuario logueado", async () => {
    mockGetServicios.mockResolvedValueOnce([
      { idServicio: 1, nombre: "Corte", precio: 5000 },
    ]);
    mockGetTrabajadores.mockResolvedValueOnce([
      { idUser: 10, nombre: "Ana", apellido: "Pérez" },
    ]);

    renderPage();
    await screen.findByText((content) => content.includes("Corte"));

    await userEvent.selectOptions(getServ(), "1");
    await userEvent.selectOptions(getTrab(), "10");

    await userEvent.type(getFecha(), "2025-01-02");
    await screen.findByText("10:00");

    await userEvent.selectOptions(getHora(), "10:00");

    await userEvent.click(screen.getByText("Reservar hora"));

    expect(
      await screen.findByText("Debes iniciar sesión para reservar")
    ).toBeInTheDocument();
  });

  it("muestra error si crearReserva devuelve success=false", async () => {
    localStorage.setItem("user", JSON.stringify({ idUser: 1 }));

    mockGetServicios.mockResolvedValueOnce([
      { idServicio: 1, nombre: "Corte", precio: 5000 },
    ]);
    mockGetTrabajadores.mockResolvedValueOnce([
      { idUser: 10, nombre: "Ana", apellido: "Pérez" },
    ]);

    mockCrearReserva.mockResolvedValueOnce({
      success: false,
      message: "No disponible",
    });

    renderPage();
    await screen.findByText((content) => content.includes("Corte"));

    await userEvent.selectOptions(getServ(), "1");
    await userEvent.selectOptions(getTrab(), "10");

    await userEvent.type(getFecha(), "2025-01-02");
    await screen.findByText("10:00");

    await userEvent.selectOptions(getHora(), "10:00");
    await userEvent.click(screen.getByText("Reservar hora"));

    expect(await screen.findByText("No disponible")).toBeInTheDocument();
  });

  it("muestra éxito cuando la reserva se crea correctamente", async () => {
    localStorage.setItem("user", JSON.stringify({ idUser: 1 }));

    mockGetServicios.mockResolvedValueOnce([
      { idServicio: 1, nombre: "Corte", precio: 5000 },
    ]);
    mockGetTrabajadores.mockResolvedValueOnce([
      { idUser: 10, nombre: "Ana", apellido: "Pérez" },
    ]);

    mockCrearReserva.mockResolvedValueOnce({ success: true });

    renderPage();
    await screen.findByText((content) => content.includes("Corte"));

    await userEvent.selectOptions(getServ(), "1");
    await userEvent.selectOptions(getTrab(), "10");

    await userEvent.type(getFecha(), "2025-01-02");
    await screen.findByText("10:00");

    await userEvent.selectOptions(getHora(), "10:00");

    await userEvent.click(screen.getByText("Reservar hora"));

    expect(
      await screen.findByText("Reserva creada correctamente")
    ).toBeInTheDocument();
  });
});
