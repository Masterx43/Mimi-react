import { useState, useEffect } from "react";
import { services } from "../data/service";

export default function Reserva() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");

  // Genera lista base de horas (de 9:00 a 19:00)
  const generarHoras = (hasta = 19) => {
    const horas: string[] = [];
    for (let i = 9; i <= hasta; i++) {
      horas.push(`${i.toString().padStart(2, "0")}:00`);
    }
    return horas;
  };

  //Actualiza horas según el día seleccionado
  useEffect(() => {
    if (!fecha) {
      setHorasDisponibles([]);
      return;
    }

    const diaSeleccionado = new Date(fecha).getDay(); // 0 = domingo, 6 = sábado

    if (diaSeleccionado === 0) {
      // domingo
      setMensaje(" No se puede reservar los domingos.");
      setHorasDisponibles([]);
      setHora("");
    } else if (diaSeleccionado === 6) {
      // sábado: solo hasta las 14:00
      setHorasDisponibles(generarHoras(14));
      setMensaje("");
    } else {
      // lunes a viernes
      setHorasDisponibles(generarHoras(19));
      setMensaje("");
    }
  }, [fecha]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !correo || !telefono || !servicio || !fecha || !hora) {
      setMensaje("Por favor completa todos los campos");
      return;
    }

    // Validación básica de correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      setMensaje("Por favor ingresa un correo válido");
      return;
    }

    // Validación básica de teléfono
    const telefonoRegex = /^[0-9]{8,12}$/;
    if (!telefonoRegex.test(telefono)) {
      setMensaje("El número de teléfono debe tener entre 8 y 12 dígitos 📱");
      return;
    }

    setMensaje(`¡Reserva confirmada, ${nombre}!
    Te esperamos para tu ${servicio} el ${fecha} a las ${hora}.
    Confirmación enviada a: ${correo}`);

    // Limpiar campos
    setNombre("");
    setCorreo("");
    setTelefono("");
    setServicio("");
    setFecha("");
    setHora("");
  };

  return (
  <div className="home-fondo"> 
    <div className="container cajita-fondo">
      <div className="container cajita-fondo2">
        <h2 className="text-center mb-4">Reserva tu hora</h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: "400px" }}
        >
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Juan Torres"
            />
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ej: juan@example.com"
            />
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label className="form-label">Número de teléfono</label>
            <input
              type="tel"
              className="form-control"
              value={telefono}
              onChange={(e) =>
                setTelefono(e.target.value.replace(/[^0-9]/g, ""))
              } // solo números
              placeholder="Ej: 912345678"
            />
          </div>

          {/* Servicio */}
          <div className="mb-3">
            <label className="form-label">Servicio</label>
            <select
              className="form-select"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            >
              <option value="">Selecciona un servicio</option>
              {services.map((s) => (                           //Aqui creamos una opcion para cada scroll dependiendo de cuantos servicios haya en nuestra data
                <option key={s.id} value={s.nombre}>
                  {s.nombre} — ${s.precio.toLocaleString("es-CL")}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // no fechas pasadas
            />
          </div>

          {/* Hora */}
          <div className="mb-3">
            <label className="form-label">Hora</label>
            <select
              className="form-select"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              disabled={!horasDisponibles.length}
            >
              <option value="">Selecciona una hora</option>
              {horasDisponibles.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              type="submit"
              className="btn botonRosado"
              disabled={!horasDisponibles.length}
            >
              Reservar hora
            </button>
          </div>
        </form>

        {/* Mensaje */}
        {mensaje && (
          <div
            className={`alert mt-4 ${
              mensaje.includes("registrada su hora")
                ? "alert-success"
                : "alert-info"
            } text-center`}
          >
            {mensaje}
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
