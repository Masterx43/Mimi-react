// src/_tests/Admin.test.tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminPanel from "../pages/Admin";
import { describe, beforeEach, test, expect, vi } from "vitest";

// -------- Mocks --------
const mockGetAllUsers = vi.fn();
const mockGetWorkers = vi.fn();

const mockGetProducts = vi.fn();
const mockCreateProduct = vi.fn();
const mockUpdateProduct = vi.fn();
const mockDeleteProduct = vi.fn();

const mockGetServices = vi.fn();
const mockCreateService = vi.fn();
const mockUpdateService = vi.fn();
const mockDeleteService = vi.fn();

// -------- Mock de APIs --------
vi.mock("../api/userService", () => ({
  getAllUsers: () => mockGetAllUsers(),
  getWorkers: () => mockGetWorkers(),
}));

vi.mock("../api/productService", () => ({
  getProducts: () => mockGetProducts(),
  createProduct: (...args: unknown[]) => mockCreateProduct(...args),
  updateProduct: (...args: unknown[]) => mockUpdateProduct(...args),
  deleteProduct: (...args: unknown[]) => mockDeleteProduct(...args),
}));

vi.mock("../api/servicioService", () => ({
  getServicios: () => mockGetServices(),
  createServicio: (...args: unknown[]) => mockCreateService(...args),
  updateServicio: (...args: unknown[]) => mockUpdateService(...args),
  deleteServicio: (...args: unknown[]) => mockDeleteService(...args),
}));

// ------------------- TESTS -------------------
describe("Admin", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetAllUsers.mockResolvedValue([
      { idUser: 1, correo: "cliente@test.cl", rolId: 1 },
    ]);

    mockGetWorkers.mockResolvedValue([
      { idUser: 2, correo: "worker@test.cl", rolId: 2 },
    ]);

    mockGetProducts.mockResolvedValue([
      {
        idProduct: 10,
        nombre: "Shampoo",
        descripcion: "",
        precio: 5000,
        imagen: "",
      },
    ]);

    mockGetServices.mockResolvedValue([
      {
        idServicio: 20,
        nombre: "Corte",
        descripcion: "",
        precio: 8000,
        imagenUrl: "",
      },
    ]);
  });

  test("carga y muestra usuarios, productos y servicios", async () => {
    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    expect(await screen.findByText(/cliente@test.cl/)).toBeInTheDocument();
    expect(await screen.findByText(/worker@test.cl/)).toBeInTheDocument();
    expect(await screen.findByText("Shampoo")).toBeInTheDocument();
    expect(await screen.findByText("Corte")).toBeInTheDocument();
  });

  test("abre el modal para crear producto", async () => {
    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    const createBtn = await screen.findByText("+ Crear producto");
    await userEvent.click(createBtn);

    expect(await screen.findByText("Crear Producto")).toBeInTheDocument();
  });

  test("edita un producto correctamente", async () => {
    mockUpdateProduct.mockResolvedValue({
      idProduct: 10,
      nombre: "Shampoo Editado",
      descripcion: "",
      precio: 6000,
      imagen: "",
    });

    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    const productosSection = await screen.findByText("Productos");
    const productosContainer = productosSection
      .closest("div")!
      .nextElementSibling as HTMLElement;

    const editButtons = within(productosContainer).getAllByText("Editar");
    await userEvent.click(editButtons[0]);

    const inputNombre = await screen.findByDisplayValue("Shampoo");
    await userEvent.clear(inputNombre);
    await userEvent.type(inputNombre, "Shampoo Editado");

    const saveBtn = await screen.findByText("Guardar");
    await userEvent.click(saveBtn);

    expect(mockUpdateProduct).toHaveBeenCalled();
  });

  test("elimina un producto", async () => {
    mockDeleteProduct.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AdminPanel />
      </MemoryRouter>
    );

    const productosSection = await screen.findByText("Productos");
    const productosContainer = productosSection
      .closest("div")!
      .nextElementSibling as HTMLElement;

    const deleteButtons = within(productosContainer).getAllByText("Eliminar");
    await userEvent.click(deleteButtons[0]);

    expect(mockDeleteProduct).toHaveBeenCalledWith(10);
  });

  test("cierra sesión y redirige", async () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <AdminPanel />
      </MemoryRouter>
    );

    const logoutBtn = await screen.findByText("Cerrar sesión");
    await userEvent.click(logoutBtn);

    expect(localStorage.getItem("token")).toBeNull();
  });
});
