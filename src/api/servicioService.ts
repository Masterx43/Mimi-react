export async function getServicios() {
  const res = await fetch("http://localhost:8083/api/servicios");

  if (!res.ok) {
    throw new Error("Error al obtener servicios");
  }

  return res.json();
}

export async function getServicioById(id: number) {
  const res = await fetch(`http://localhost:8083/api/servicios/${id}`);

  if (!res.ok) {
    throw new Error("Servicio no encontrado");
  }

  return res.json();
}
