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




export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} /> 
          <Route path="Servicio/:id" element={<ServicioDetalle/>}/>
          <Route path="/servicio/:id" element={<ServicioDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/reserva" element= {<Reserva />}/>
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path= "/inicio" element={<InicioSesion/>}/>
          <Route path="/registro" element= {<Registro/>}/>
          <Route path="/admin" element ={<Admin/>}/>
          <Route path="/perfil" element={<Perfil />}/>
          <Route path="/reserva-detalle/:idReserva" element={<ReservaDetalle/>}/>
          <Route path='*' element= {<div>Pagina no disponible</div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

