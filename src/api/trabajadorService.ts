export async function getTrabajadores() {
  const res = await fetch("http://localhost:8082/api/trabajadores");

  if (!res.ok) {
    throw new Error("Error al obtener trabajadores");
  }

  return res.json();
}
