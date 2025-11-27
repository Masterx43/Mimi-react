import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getServicios } from "../api/servicioService";
import { getTrabajadores } from "../api/trabajadorService";
import { crearReserva } from "../api/reservaService";

import type { Service } from "../interfaces/Service";
import type { Trabajador } from "../interfaces/Trabajador";
import type { ReservaResponse } from "../interfaces/ReservaResponse";

export default function Reserva() {
  const [searchParams] = useSearchParams();
  const servicioParam = searchParams.get("servicio"); // viene desde /reserva?servicio=x

  // ESTADOS
  const [servicios, setServicios] = useState<Service[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<number | "">(
    ""
  );

  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState<
    number | ""
  >("");

  const [fecha, setFecha] = useState<string>("");
  const [hora, setHora] = useState<string>("");

  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);

  const [mensaje, setMensaje] = useState<string>("");
  const [error, setError] = useState<string>("");

  // USUARIO DESDE LOCALSTORAGE
  const usuario = JSON.parse(localStorage.getItem("user") || "null");
  const usuarioId = usuario?.idUser ?? null;

  // ======================================================
  // Cargar servicios
  // ======================================================
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServicios();
        setServicios(data);

        // Si la URL trae ?servicio=3 → marcarlo seleccionado
        if (servicioParam) {
          setServicioSeleccionado(Number(servicioParam));
        }
      } catch (err) {
        console.error("Error cargando servicios:", err);
        setError("Error al cargar los servicios");
      }
    };

    fetchServicios();
  }, [servicioParam]);

  // ======================================================
  // Cargar trabajadores
  // ======================================================
  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const data = await getTrabajadores();
        setTrabajadores(data);
      } catch (err) {
        console.error("Error cargando trabajadores:", err);
        setError("Error al cargar trabajadores");
      }
    };
    fetchTrabajadores();
  }, []);

  // ======================================================
  // Generar horas según el día seleccionado
  // ======================================================
  const generarHoras = (hasta = 19) => {
    const arr: string[] = [];
    for (let i = 9; i <= hasta; i++) {
      arr.push(`${i.toString().padStart(2, "0")}:00`);
    }
    return arr;
  };

  useEffect(() => {
    if (!fecha) {
      setHorasDisponibles([]);
      return;
    }

    const dia = new Date(fecha).getDay(); // 0 = DOMINGO
    setError("");

    if (dia === 0) {
      setError("No se puede reservar los domingos");
      setHorasDisponibles([]);
      return;
    }

    if (dia === 6) {
      setHorasDisponibles(generarHoras(14)); // sábado hasta las 14:00
      return;
    }

    setHorasDisponibles(generarHoras(19)); // normal
  }, [fecha]);

  // ======================================================
  // Envío del formulario
  // ======================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!servicioSeleccionado || !trabajadorSeleccionado || !fecha || !hora) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!usuarioId) {
      setError("Debes iniciar sesión para reservar");
      return;
    }

    try {
      const payload = {
        idUsuario: Number(usuarioId),
        idServicio: Number(servicioSeleccionado),
        idTrabajador: Number(trabajadorSeleccionado),
        fecha,
        hora,
      };

      console.log("⏳ Enviando reserva:", payload);

      const res: ReservaResponse = await crearReserva(payload);

      if (!res.success) {
        setError(res.message || "No se pudo crear la reserva");
        return;
      }

      setMensaje("¡Reserva creada correctamente! 🎉");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    }
  };

  // ======================================================
  // FORMULARIO
  // ======================================================
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
            {/* Servicio */}
            <div className="mb-3">
              <label className="form-label">Servicio</label>
              <select
                className="form-select"
                value={servicioSeleccionado}
                onChange={(e) =>
                  setServicioSeleccionado(Number(e.target.value))
                }
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((s) => (
                  <option key={s.idServicio} value={s.idServicio}>
                    {s.nombre} —{" "}
                    {s.precio.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Profesional */}
            <div className="mb-3">
              <label className="form-label">Profesional</label>
              <select
                className="form-select"
                value={trabajadorSeleccionado}
                onChange={(e) =>
                  setTrabajadorSeleccionado(Number(e.target.value))
                }
              >
                <option value="">Selecciona un profesional</option>
                {trabajadores.map((t) => (
                  <option key={t.idTrabajador} value={t.idTrabajador}>
                    {t.nombreCompleto}
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
                min={new Date().toISOString().split("T")[0]}
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
                  <option key={h}>{h}</option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button className="btn botonRosado" type="submit">
                Reservar hora
              </button>
            </div>
          </form>

          {/* Mensajes */}
          {error && (
            <div className="alert alert-danger mt-4 text-center">{error}</div>
          )}
          {mensaje && (
            <div className="alert alert-success mt-4 text-center">{mensaje}</div>
          )}
        </div>
      </div>
    </div>
  );
}
