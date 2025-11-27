export async function getTrabajadores() {
  const res = await fetch("http://localhost:8084/api/users/workers");

  if (!res.ok) {
    throw new Error("Error al obtener trabajadores");
  }

  return res.json();
}
