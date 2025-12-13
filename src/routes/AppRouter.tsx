import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Tienda from '../pages/Tienda';
import ProductoDetalle from '../pages/ProductoDetalle';
import Servicios from '../pages/Servicios';
import Carrito from '../pages/Carrito';
import Reserva from '../pages/Reservas';
import ServicioDetalle from '../pages/ServicioDetalles';
import InicioSesion from '../pages/InicioSesion';
import Registro from '../pages/Registro';
import Admin from '../pages/Admin';
import Perfil from '../pages/Perfil'
import MisReservas from '../pages/MisReservas';
import ReservaDetalle from '../pages/ReservaDetalle';
import ProtectedRoute from './ProtectedRoutes';




export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="Servicio/:id" element={<ServicioDetalle />} />
          <Route path="/servicio/:id" element={<ServicioDetalle />} />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute redirectTo="/inicio">
                <Carrito />
              </ProtectedRoute>
            }
          />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route
            path="/reserva"
            element={
              <ProtectedRoute redirectTo="/inicio">
                <Reserva />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-reservas"
            element={
              <ProtectedRoute redirectTo="/inicio">
                <MisReservas />
              </ProtectedRoute>
            }
          />
          <Route path="/inicio" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={[2]} redirectTo="/inicio">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute redirectTo="/inicio">
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reserva-detalle/:idReserva"
            element={
              <ProtectedRoute redirectTo="/inicio">
                <ReservaDetalle />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<div>Pagina no disponible</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

