import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ServicioDetalle from "../pages/ServicioDetalles";
import { describe, beforeEach, test, expect, vi } from "vitest";

// =============== MOCK useNavigate =================
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "10" }),
  };
});

// =============== MOCK API =================
const mockGetServicioById = vi.fn();
vi.mock("../api/servicioService", () => ({
  getServicioById: (id: number) => mockGetServicioById(id),
}));

// =============== TESTS =================
describe("Página ServicioDetalle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra pantalla de carga", () => {
    mockGetServicioById.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando servicio...")).toBeInTheDocument();
  });

  test("muestra correctamente los datos del servicio", async () => {
    mockGetServicioById.mockResolvedValue({
      idServicio: 10,
      nombre: "Uñas acrílicas",
      descripcion: "Servicio profesional",
      precio: 15000,
      imagenUrl: "img.jpg",
    });

    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    // Esperamos a que cargue el servicio
    expect(await screen.findByText("Uñas acrílicas")).toBeInTheDocument();
    expect(screen.getByText("Servicio profesional")).toBeInTheDocument();
    expect(screen.getByText("$15.000")).toBeInTheDocument();
  });

  test("redirige correctamente al presionar 'Reservar ahora'", async () => {
    mockGetServicioById.mockResolvedValue({
      idServicio: 10,
      nombre: "Depilación",
      descripcion: "Servicio experto",
      precio: 8000,
      imagenUrl: "img.jpg",
    });

    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await screen.findByText("Depilación");

    const reservarBtn = screen.getByText("Reservar ahora");
    await userEvent.click(reservarBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/reserva?servicio=10");
  });

  test("vuelve hacia atrás al presionar 'Volver'", async () => {
    mockGetServicioById.mockResolvedValue({
      idServicio: 10,
      nombre: "Lavado de pelo",
      descripcion: "Incluye masaje capilar",
      precio: 5000,
      imagenUrl: "img.jpg",
    });

    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await screen.findByText("Lavado de pelo");

    const volverBtn = screen.getByText("Volver");
    await userEvent.click(volverBtn);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("muestra mensaje de error cuando no se encuentra el servicio", async () => {
  mockGetServicioById.mockRejectedValue(new Error("Servicio no encontrado"));

  render(
    <MemoryRouter>
      <ServicioDetalle />
    </MemoryRouter>
  );

  const mensajes = await screen.findAllByText("Servicio no encontrado");
  expect(mensajes.length).toBeGreaterThan(0);
});


  test("botón 'Volver a Servicios' redirige correctamente cuando hay error", async () => {
    mockGetServicioById.mockRejectedValue(new Error("Error"));

    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await screen.findByText("Servicio no encontrado");

    const volverBtn = screen.getByText("Volver a Servicios");
    await userEvent.click(volverBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/servicios");
  });
});
