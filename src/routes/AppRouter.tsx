import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Tienda from '../pages/Tienda'
import ProductoDetalle from '../pages/ProductoDetalle'


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tienda" element={<Tienda />} />
                    <Route path="/producto/:id" element={<ProductoDetalle />} />
                </Routes>
        </BrowserRouter>
    )
}