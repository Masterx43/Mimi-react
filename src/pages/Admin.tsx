import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productService";
import type { Product } from "../interfaces/Product";

interface User {
  name: string;
  email: string;
}

interface EditableItem {
  idProduct: number;
  nombre: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<EditableItem | null>(null);
  const [editedValue, setEditedValue] = useState("");
  const navigate = useNavigate();

  // Cargar usuarios desde localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  // Cargar productos del microservicio
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProductList(data);
      } catch (error) {
        console.error("Error cargando productos en AdminPanel:", error);
      }
    };

    loadProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    navigate("/inicio");
  };

  // Abrir modal de edición
  const handleEdit = (item: Product) => {
    setEditingItem({
      idProduct: item.idProduct,
      nombre: item.nombre,
    });
    setEditedValue(item.nombre);
  };

  // Guardar cambios
  const saveEdit = () => {
    if (!editingItem) return;

    setProductList((prev) =>
      prev.map((p) =>
        p.idProduct === editingItem.idProduct
          ? { ...p, nombre: editedValue }
          : p
      )
    );

    setEditingItem(null);
  };

  // Abrir modal de eliminar
  const handleDelete = (item: Product) => {
    setItemToDelete({
      idProduct: item.idProduct,
      nombre: item.nombre,
    });
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    if (!itemToDelete) return;

    setProductList((prev) =>
      prev.filter((p) => p.idProduct !== itemToDelete.idProduct)
    );

    setItemToDelete(null);
  };

  return (
    <div className="home-fondo d-flex justify-content-center align-items-center py-5">
      <div
        className="cajita-fondo2 shadow-lg border-0 p-5"
        style={{
          maxWidth: "950px",
          width: "100%",
          borderRadius: "16px",
          backgroundColor: "white",
        }}
      >
        <h1 className="text-center mb-3 fw-bold">
          <i className="bi bi-shield-lock-fill text-warning me-2"></i>
          Panel de Administración
        </h1>

        <p className="text-center text-muted mb-4">
          Bienvenido administrador. Gestiona usuarios y productos.
        </p>

        {/* Usuarios */}
        <section className="mb-5">
          <h4 className="fw-bold mb-3 text-start">
            <i className="bi bi-people-fill me-2 text-secondary"></i>
            Usuarios registrados
          </h4>
          <div className="list-group border rounded-3">
            {users.length > 0 ? (
              users.map((u, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <span>{index + 1}. — {u.email}</span>
                </div>
              ))
            ) : (
              <p className="text-muted text-center m-2">
                No hay usuarios registrados.
              </p>
            )}
          </div>
        </section>

        {/* Productos */}
        <section>
          <h4 className="fw-bold mb-3 text-start">
            <i className="bi bi-bag-heart-fill me-2 text-secondary"></i>
            Productos
          </h4>
          <div className="list-group border rounded-3">
            {productList.map((product) => (
              <div
                key={product.idProduct}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{product.nombre}</span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm px-3"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => handleDelete(product)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logout */}
        <div className="text-center mt-5">
          <button className="btn btn-danger px-4" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Modal editar */}
      {editingItem && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "14px" }}>
            <h4 className="mb-3 text-center text-primary">
              <i className="bi bi-pencil-square me-2"></i>
              Editar producto
            </h4>
            <input
              type="text"
              className="form-control mb-3"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              autoFocus
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setEditingItem(null)}
              >
                Cancelar
              </button>
              <button className="btn botonRosado" onClick={saveEdit}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {itemToDelete && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="card p-4 shadow-lg text-center" style={{ width: "400px", borderRadius: "14px" }}>
            <h4 className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Confirmar eliminación
            </h4>
            <p>
              ¿Seguro que deseas eliminar <strong>{itemToDelete.nombre}</strong>?
            </p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setItemToDelete(null)}
              >
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
