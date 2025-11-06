import { useNavigate } from "react-router-dom";
import brushing from "../assets/img/brushing-y-styling.webp";
import coloracion from "../assets/img/coloracion.webp";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-fondo">
      <div className="container cajita-fondo">
        {/* Bienvenida y Nuestros Servicios */}
        <div className="container cajita-fondo2 text-center p-4">
          <h1 className="mb-3">Bienvenidos a nuestra página web</h1>
          <p className="mb-4">
            Nos alegra recibirte en <strong>Mimi</strong>, tu espacio de belleza y bienestar. 
            Aquí encontrarás los mejores servicios capilares, asesorías personalizadas 
            y productos de calidad para cuidar de ti y realzar tu estilo.
          </p>

          <h2 className="mb-3 mt-5">Nuestros Servicios</h2>
          <p>
            En <strong>Mimi</strong> ofrecemos tratamientos capilares, asesorías personalizadas 
            y servicios de belleza para que te sientas y luzcas espectacular. 
          </p>
          <button
            className="btn botonRosado mt-3"
            onClick={() => navigate("/servicios")}
          >
            Ver todos los servicios
          </button>
        </div>

        {/* Sección Brushing & Coloración */}
        <div className="container cajita-fondo2 mb-5">
          <h2 className="text-center mb-4">Algunos de nuestros servicios</h2>
          <div className="row g-4">
            {/* Card Brushing */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm text-center">
                <img
                  src={brushing}
                  alt="Brushing y Styling"
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold">Brushing & Styling</h5>
                  <p className="text-muted">
                    Dale forma, movimiento y brillo natural a tu cabello con un brushing profesional.
                  </p>
                  <button
                    className="btn botonRosado"
                    onClick={() => navigate("/servicios")}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Card Coloración */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm text-center">
                <img
                  src={coloracion}
                  alt="Coloración Profesional"
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold">Coloración Profesional</h5>
                  <p className="text-muted">
                    Transforma tu look con colores vibrantes, brillo intenso y resultados duraderos.
                  </p>
                  <button
                    className="btn botonRosado"
                    onClick={() => navigate("/servicios")}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Tienda */}
        <div className="container cajita-fondo2 text-center mb-5">
          <h2 className="mb-3">Nuestra Tienda</h2>
          <p>
            Descubre productos de alta calidad para el cuidado capilar y facial. 
            ¡Llévate a casa tus favoritos de <strong>Mimi</strong>!
          </p>
          <button
            className="btn botonRosado mt-3"
            onClick={() => navigate("/tienda")}
          >
            Ir a Tienda
          </button>
        </div>

        {/* Sección "Sobre nosotros" */}
        <div className="container cajita-fondo2 sobre-nosotros text-center mb-5">
          <h2>Sobre nosotros</h2>
          <p>
            En <strong>Mimi</strong> nos destacamos por ofrecer un servicio excepcional, 
            de alta calidad y personalizado. Un ambiente relajante y acogedor 
            para desconectarte del estrés y cuidar tu estilo.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4">
          <h4>
            Nos puedes encontrar en &nbsp;
            <i className="bi bi-instagram"></i>&nbsp;
            <i className="bi bi-tiktok"></i>&nbsp;
            <i className="bi bi-facebook"></i>
          </h4>
        </footer>
      </div>
    </div>
  );
}
