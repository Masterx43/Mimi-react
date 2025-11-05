import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Tienda from '../pages/Tienda';
import ProductoDetalle from '../pages/ProductoDetalle';
import Servicios from '../pages/Servicios';
import Carrito from '../pages/Carrito';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/servicios" element={<Servicios />} /> 
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
