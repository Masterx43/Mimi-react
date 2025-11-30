import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { User } from "../interfaces/User";
import type { Product } from "../interfaces/Product";
import type { Service } from "../interfaces/Service";

// APIs
import { getAllUsers, getWorkers } from "../api/userService";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/productService";
import { getServicios, createServicio, updateServicio, deleteServicio } from "../api/servicioService";

export default function AdminPanel() {
  const navigate = useNavigate();

  // ============================
  // ESTADOS
  // ============================
  const [clients, setClients] = useState<User[]>([]);
  const [workers, setWorkers] = useState<User[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);

  // Crear producto
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoriaId: 1
  });

  // Editar producto
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Crear servicio
  const [creatingService, setCreatingService] = useState(false);
  const [newService, setNewService] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    categoriaId: 1
  });

  // Editar servicio
  const [editingService, setEditingService] = useState<Service | null>(null);

  // ============================
  // LOGOUT
  // ============================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/inicio");
  };

  // ============================
  // CARGAR USUARIOS
  // ============================
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const workersData = await getWorkers();
        setClients(allUsers.filter((u) => u.rolId === 1));
        setWorkers(workersData);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    loadUsers();
  }, []);

  // ============================
  // CARGAR PRODUCTOS
  // ============================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProductList(data);
      } catch (error) {
        console.error("Error productos:", error);
      }
    };
    loadProducts();
  }, []);

  // ============================
  // CARGAR SERVICIOS
  // ============================
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServicios();
        setServiceList(data);
      } catch (error) {
        console.error("Error servicios:", error);
      }
    };
    loadServices();
  }, []);

  // ============================================================
  // CREAR PRODUCTO
  // ============================================================
  const handleCreateProduct = async () => {
    if (!newProduct.nombre.trim()) return;

    const created = await createProduct({
      nombre: newProduct.nombre,
      descripcion: newProduct.descripcion,
      precio: Number(newProduct.precio),
      imagen: newProduct.imagen,
      categoriaId: 1
    });

    setProductList([...productList, created]);
    setCreatingProduct(false);
    setNewProduct({ nombre: "", descripcion: "", precio: "", imagen: "", categoriaId: 1 });
  };

  // ============================================================
  // EDITAR PRODUCTO
  // ============================================================
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const updated = await updateProduct(editingProduct.idProduct, {
      nombre: editingProduct.nombre,
      descripcion: editingProduct.descripcion,
      precio: Number(editingProduct.precio),
      imagen: editingProduct.imagen,
      categoriaId: 1
    });

    setProductList(productList.map((p) => (p.idProduct === updated.idProduct ? updated : p)));
    setEditingProduct(null);
  };

  // ============================================================
  // ELIMINAR PRODUCTO
  // ============================================================
  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    setProductList(productList.filter((p) => p.idProduct !== id));
  };

  // ============================================================
  // CREAR SERVICIO
  // ============================================================
  const handleCreateService = async () => {
    const created = await createServicio({
      nombre: newService.nombre,
      descripcion: newService.descripcion,
      precio: Number(newService.precio),
      imagenUrl: newService.imagenUrl,
      categoriaId: 1
    });

    setServiceList([...serviceList, created]);
    setCreatingService(false);
    setNewService({ nombre: "", descripcion: "", precio: "", imagenUrl: "", categoriaId: 1 });
  };

  // ============================================================
  // EDITAR SERVICIO
  // ============================================================
  const handleUpdateService = async () => {
    if (!editingService) return;

    const updated = await updateServicio(editingService.idServicio, {
      nombre: editingService.nombre,
      descripcion: editingService.descripcion,
      precio: Number(editingService.precio),
      imagenUrl: editingService.imagenUrl,
      categoriaId: 1
    });

    setServiceList(serviceList.map((s) => (s.idServicio === updated.idServicio ? updated : s)));
    setEditingService(null);
  };

  // ============================================================
  // ELIMINAR SERVICIO
  // ============================================================
  const handleDeleteService = async (id: number) => {
    await deleteServicio(id);
    setServiceList(serviceList.filter((s) => s.idServicio !== id));
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="home-fondo d-flex justify-content-center align-items-start py-5">

      <div className="cajita-fondo2 shadow-lg p-5 admin-container">

        <h1 className="text-center mb-4 fw-bold" style={{ color: "#d63384" }}>
          Panel de Administración
        </h1>

        <div className="text-end mb-4">
          <button className="btn botonRosado" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        {/* ================= USUARIOS ================= */}
        <h3 style={{ color: "#d63384" }} className="fw-bold mb-3 mt-4">
          Usuarios
        </h3>

        <ul className="list-group shadow-sm mb-4" style={{ borderRadius: "10px" }}>
          {clients.map((c) => (
            <li
              key={c.idUser}
              className="list-group-item d-flex justify-content-between"
              style={{ border: "none", borderBottom: "1px solid #eee" }}
            >
              <b>Cliente</b> — {c.correo}
            </li>
          ))}
          {workers.map((w) => (
            <li
              key={w.idUser}
              className="list-group-item d-flex justify-content-between"
              style={{ border: "none", borderBottom: "1px solid #eee" }}
            >
              <b>Trabajador</b> — {w.correo}
            </li>
          ))}
        </ul>

        {/* ================= PRODUCTOS ================= */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 style={{ color: "#d63384" }} className="fw-bold">Productos</h3>
          <button className="btn botonRosado" onClick={() => setCreatingProduct(true)}>
            + Crear producto
          </button>
        </div>

        <ul className="list-group shadow-sm mt-2">
          {productList.map((product) => (
            <li
              key={product.idProduct}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ border: "none", borderBottom: "1px solid #eee" }}
            >
              {product.nombre}

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm botonRosado"
                  onClick={() => setEditingProduct(product)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteProduct(product.idProduct)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* ================= SERVICIOS ================= */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 style={{ color: "#d63384" }} className="fw-bold">Servicios</h3>
          <button className="btn botonRosado" onClick={() => setCreatingService(true)}>
            + Crear servicio
          </button>
        </div>

        <ul className="list-group shadow-sm mt-2">
          {serviceList.map((service) => (
            <li
              key={service.idServicio}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ border: "none", borderBottom: "1px solid #eee" }}
            >
              {service.nombre}

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm botonRosado"
                  onClick={() => setEditingService(service)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteService(service.idServicio)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ======================= MODALES ======================= */}

      {/* MODAL CREAR PRODUCTO */}
      {creatingProduct && (
        <div className="modal-bg">
          <div className="modal-card">

            <h4>Crear Producto</h4>

            <label className="modal-label">Nombre</label>
            <input
              className="form-control mb-2"
              value={newProduct.nombre}
              onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
            />

            <label className="modal-label">Descripción</label>
            <textarea
              className="form-control mb-2"
              value={newProduct.descripcion}
              onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            />

            <label className="modal-label">Precio</label>
            <input
              type="number"
              className="form-control mb-2"
              value={newProduct.precio}
              onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            />

            <label className="modal-label">Imagen URL</label>
            <input
              className="form-control mb-3"
              value={newProduct.imagen}
              onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setCreatingProduct(false)}>Cancelar</button>
              <button className="btn botonRosado" onClick={handleCreateProduct}>Crear</button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL EDITAR PRODUCTO */}
      {editingProduct && (
        <div className="modal-bg">
          <div className="modal-card">

            <h4>Editar Producto</h4>

            <label className="modal-label">Nombre</label>
            <input
              className="form-control mb-2"
              value={editingProduct.nombre}
              onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
            />

            <label className="modal-label">Descripción</label>
            <textarea
              className="form-control mb-2"
              value={editingProduct.descripcion}
              onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
            />

            <label className="modal-label">Precio</label>
            <input
              type="number"
              className="form-control mb-2"
              value={editingProduct.precio}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  precio: e.target.value === "" ? 0 : Number(e.target.value)
                })
              }
            />

            <label className="modal-label">Imagen URL</label>
            <input
              className="form-control"
              value={editingProduct.imagen}
              onChange={(e) => setEditingProduct({ ...editingProduct, imagen: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancelar</button>
              <button className="btn botonRosado" onClick={handleUpdateProduct}>Guardar</button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL CREAR SERVICIO */}
      {creatingService && (
        <div className="modal-bg">
          <div className="modal-card">

            <h4>Crear Servicio</h4>

            <label className="modal-label">Nombre</label>
            <input
              className="form-control mb-2"
              value={newService.nombre}
              onChange={(e) => setNewService({ ...newService, nombre: e.target.value })}
            />

            <label className="modal-label">Descripción</label>
            <textarea
              className="form-control mb-2"
              value={newService.descripcion}
              onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })}
            />

            <label className="modal-label">Precio</label>
            <input
              type="number"
              className="form-control mb-2"
              value={newService.precio}
              onChange={(e) => setNewService({ ...newService, precio: e.target.value })}
            />

            <label className="modal-label">Imagen URL</label>
            <input
              className="form-control"
              value={newService.imagenUrl}
              onChange={(e) => setNewService({ ...newService, imagenUrl: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setCreatingService(false)}>Cancelar</button>
              <button className="btn botonRosado" onClick={handleCreateService}>Crear</button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL EDITAR SERVICIO */}
      {editingService && (
        <div className="modal-bg">
          <div className="modal-card">

            <h4>Editar Servicio</h4>

            <label className="modal-label">Nombre</label>
            <input
              className="form-control mb-2"
              value={editingService.nombre}
              onChange={(e) => setEditingService({ ...editingService, nombre: e.target.value })}
            />

            <label className="modal-label">Descripción</label>
            <textarea
              className="form-control mb-2"
              value={editingService.descripcion}
              onChange={(e) => setEditingService({ ...editingService, descripcion: e.target.value })}
            />

            <label className="modal-label">Precio</label>
            <input
              type="number"
              className="form-control mb-2"
              value={editingService.precio}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  precio: e.target.value === "" ? 0: Number(e.target.value)
                })
              }
            />

            <label className="modal-label">Imagen URL</label>
            <input
              className="form-control"
              value={editingService.imagenUrl}
              onChange={(e) => setEditingService({ ...editingService, imagenUrl: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setEditingService(null)}>Cancelar</button>
              <button className="btn botonRosado" onClick={handleUpdateService}>Guardar</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
