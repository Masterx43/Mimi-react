import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="cajita-fondo">
      <div className="container cajita-fondo2 sobre-nosotros">
        <h1 className="text-center">Sobre nosotros</h1>
        <p className="text-center">
          En Mimi nos destacamos por ofrecer un servicio excepcional, de alta calidad y personalizado.
          Un ambiente relajante y acogedor para desconectarte del estrés y cuidar tu estilo.
        </p>
        <div className="text-center">
          <button
            className="btn botonRosado"
            onClick={() => navigate("/tienda")}
          >
            Ir a Tienda
          </button>
        </div>
      </div>

      <footer className="text-center">
        <h4>
          Nos puedes encontrar en &nbsp;
          <i className="bi bi-instagram"></i>&nbsp;
          <i className="bi bi-tiktok"></i>&nbsp;
          <i className="bi bi-facebook"></i>
        </h4>
      </footer>
    </div>
  );
}
