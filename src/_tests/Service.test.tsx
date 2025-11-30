import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Servicios from "../pages/Servicios";
import { describe, beforeEach, test, expect, vi } from "vitest";

// --- Mock de navegación ---
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// --- Mock del servicio ---
const mockGetServicios = vi.fn();

vi.mock("../api/servicioService", () => ({
  getServicios: () => mockGetServicios(),
}));

// ---------------- TESTS ----------------

describe("Página Servicios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra pantalla de carga", () => {
    mockGetServicios.mockReturnValue(
      new Promise(() => {}) // Promise que no resuelve
    );

    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando servicios...")).toBeInTheDocument();
  });

  test("carga y muestra los servicios correctamente", async () => {
    mockGetServicios.mockResolvedValue([
      {
        idServicio: 1,
        nombre: "Corte de Pelo",
        descripcion: "Servicio profesional",
        precio: 8000,
        imagenUrl: "img.jpg",
      },
    ]);

    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    expect(await screen.findByText("Corte de Pelo")).toBeInTheDocument();
    expect(screen.getByText("Servicio profesional")).toBeInTheDocument();
    expect(screen.getByText("$8.000")).toBeInTheDocument();
  });

  test("filtra servicios correctamente", async () => {
    mockGetServicios.mockResolvedValue([
      {
        idServicio: 5,
        nombre: "Peinado",
        descripcion: "Estilo elegante",
        precio: 7000,
        imagenUrl: "img.jpg",
      },
      {
        idServicio: 6,
        nombre: "Coloración",
        descripcion: "Tinte profesional",
        precio: 12000,
        imagenUrl: "img.jpg",
      },
    ]);

    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    // Asegurarse de que cargan
    await screen.findByText("Peinado");
    await screen.findByText("Coloración");

    // Escribir en el buscador
    const searchInput = screen.getByPlaceholderText("Buscar servicio...");
    await userEvent.type(searchInput, "pein");

    expect(screen.getByText("Peinado")).toBeInTheDocument();
    expect(screen.queryByText("Coloración")).not.toBeInTheDocument();
  });

  test("navega a los detalles del servicio", async () => {
    mockGetServicios.mockResolvedValue([
      {
        idServicio: 10,
        nombre: "Manicure",
        descripcion: "Profesional",
        precio: 5000,
        imagenUrl: "img.jpg",
      },
    ]);

    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    await screen.findByText("Manicure");

    const btnDetalles = screen.getByText("Ver detalles");
    await userEvent.click(btnDetalles);

    expect(mockNavigate).toHaveBeenCalledWith("/servicio/10");
  });

  test("navega a reservar hora", async () => {
    mockGetServicios.mockResolvedValue([
      {
        idServicio: 7,
        nombre: "Masaje",
        descripcion: "Relajante",
        precio: 15000,
        imagenUrl: "img.jpg",
      },
    ]);

    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    await screen.findByText("Masaje");

    const btnReserva = screen.getByText("Reservar hora");
    await userEvent.click(btnReserva);

    expect(mockNavigate).toHaveBeenCalledWith("/reserva?servicio=7");
  });

  test("muestra mensaje de error si falla la API", async () => {
    mockGetServicios.mockRejectedValue(new Error("API ERROR"));

    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Error al cargar los servicios")
    ).toBeInTheDocument();
  });
});
