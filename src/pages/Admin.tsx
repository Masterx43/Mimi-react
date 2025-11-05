import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products as initialProducts } from "../data/products";
import { services as initialServices } from "../data/service";

interface User {
  name: string;
  email: string;
}

interface Item {
  id: string;
  name: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Item[]>([]);
  const [services, setServices] = useState<Item[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Modal de edición
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState<"producto" | "servicio" | null>(null);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(admin);

    if (!admin) {
      navigate("/inicio");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);

    setProducts(initialProducts.map((p) => ({ id: p.id, name: p.name })));
    setServices(initialServices.map((s) => ({ id: s.id, name: s.nombre })));
  }, [navigate]);

  // Eliminar producto o servicio
  const handleDelete = (type: "producto" | "servicio", id: string) => {
    if (type === "producto") {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Abrir modal de edición
  const openEditModal = (type: "producto" | "servicio", id: string, name: string) => {
    setEditType(type);
    setEditName(name);
    setEditId(id);
    setShowModal(true);
  };

  // Guardar cambios desde el modal
  const handleSaveEdit = () => {
    if (!editType) return;

    if (editType === "producto") {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, name: editName } : p))
      );
    } else {
      setServices((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, name: editName } : s))
      );
    }

    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="cajita-fondo">
      <div className="container cajita-fondo2">
        <h1 className="text-center mb-4">
          <i className="bi bi-shield-lock-fill text-warning me-2"></i>
          Panel de Administración
        </h1>

        {!isAdmin ? (
          <p className="text-center text-danger">
            No tienes permisos para acceder a esta página.
          </p>
        ) : (
          <>
            <p className="text-center mb-4">
              Bienvenido administrador 👑. Aquí puedes gestionar usuarios, servicios y productos.
            </p>

            {/* Usuarios */}
            <h3 className="mt-4 mb-3">Usuarios registrados</h3>
            {users.length > 0 ? (
              <ul className="list-group mb-4">
                {users.map((u, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    <span>
                      {i + 1}. {u.name} — <small>{u.email}</small>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No hay usuarios registrados aún.</p>
            )}

            {/* Servicios */}
            <h3 className="mt-4 mb-3">Servicios</h3>
            {services.length > 0 ? (
              <ul className="list-group mb-4">
                {services.map((s) => (
                  <li
                    key={s.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{s.name}</span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => openEditModal("servicio", s.id, s.name)}
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete("servicio", s.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No hay servicios disponibles.</p>
            )}

            {/* Productos */}
            <h3 className="mt-4 mb-3">Productos</h3>
            {products.length > 0 ? (
              <ul className="list-group mb-4">
                {products.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{p.name}</span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => openEditModal("producto", p.id, p.name)}
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete("producto", p.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No hay productos disponibles.</p>
            )}

            <div className="text-center mt-4">
              <button className="btn btn-outline-secondary" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal de edición tipo card */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 999 }}
        >
          <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "90%" }}>
            <h5 className="mb-3 text-center">
              <i className="bi bi-pencil-square me-2 text-primary"></i>
              Editar {editType === "producto" ? "producto" : "servicio"}
            </h5>

            <input
              type="text"
              className="form-control mb-3"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nuevo nombre..."
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn botonRosado" onClick={handleSaveEdit}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
