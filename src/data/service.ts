// Importamos todas las imágenes desde src/assets/img
import coloracion from '../assets/img/coloracion.webp';
import brushing from '../assets/img/brushing-y-styling.webp';
import manicure from '../assets/img/Manicure.webp';

// Interfaz de servicios
export interface Service {
  id: string;
  nombre: string;
  descCorta: string;
  descLarga: string;
  precio: number;
  img: string;
}

//Lista de servicios
export const services: Service[] = [
  {
    id: 'SERV-001',
    nombre: 'Coloración Profesional',
    descCorta: 'Renueva tu look con tonos vibrantes y duraderos.',
    descLarga:
      'Nuestro servicio de coloración utiliza productos de alta calidad sin amoníaco, que cuidan la salud de tu cabello mientras logran tonos intensos, naturales y con brillo radiante. Incluye asesoría personalizada según tu tipo de cabello.',
    precio: 24990,
    img: coloracion,
  },
  {
    id: 'SERV-002',
    nombre: 'Brushing & Styling',
    descCorta: 'Peinado y alisado profesional con acabado perfecto.',
    descLarga:
      'Ideal para eventos o simplemente para lucir impecable. Incluye lavado, secado con cepillo y modelado con plancha o rizador según tu preferencia. ¡Tu cabello quedará suave, brillante y con movimiento natural!',
    precio: 15990,
    img: brushing,
  },
  {
    id: 'SERV-003',
    nombre: 'Manicure Spa',
    descCorta: 'Cuida tus manos con nuestro tratamiento completo.',
    descLarga:
      'Disfruta de una experiencia relajante que incluye limado, exfoliación, hidratación profunda y esmaltado a elección (tradicional o permanente). Perfecto para mantener tus manos suaves y elegantes.',
    precio: 9990,
    img: manicure,
  },
];
