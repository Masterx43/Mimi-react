// ✅ Importamos todas las imágenes desde src/assets/img
import MascarillaCapilar from '../assets/img/MascarillaCapilar.webp';
import serumCapilar from '../assets/img/serumCapilar.webp';
import TermoProtector from '../assets/img/TermoProtector.webp';
import cremaPeinar from '../assets/img/crema_de_peinar_rizos.webp';
import cepilloDesenredante from '../assets/img/cepillo_desenredante_crespo.webp';
import shampooKeratina from '../assets/img/shampoo_keratina.webp';
import aceiteCoco from '../assets/img/aceite_coco.webp';
import peineMadera from '../assets/img/peine_madera.webp';

// ✅ Definición de la interfaz Product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// ✅ Lista completa de productos con imports
export const products: Product[] = [
  {
    id: 'SKU-001',
    name: 'Mascarilla Capilar Hidratante',
    description:
      'Nutre tu cabello con extractos naturales y brillo duradero. Ideal para cabellos secos o dañados.',
    price: 12990,
    image: MascarillaCapilar, // 👈 usamos la variable importada
    category: 'Tratamiento',
  },
  {
    id: 'SKU-002',
    name: 'Serum Capilar de Keratina',
    description:
      'Repara las puntas abiertas y protege del calor de planchas y secadores.',
    price: 18990,
    image: serumCapilar,
    category: 'Cuidado Diario',
  },
  {
    id: 'SKU-003',
    name: 'TermoProtector Profesional',
    description:
      'Protege tu cabello hasta 230°C, evitando quiebre y pérdida de hidratación.',
    price: 15990,
    image: TermoProtector,
    category: 'Styling',
  },
  {
    id: 'SKU-004',
    name: 'Crema de Peinar para Rizos',
    description:
      'Define tus rizos y controla el frizz sin dejar residuos. Enriquecida con aceites naturales.',
    price: 10990,
    image: cremaPeinar,
    category: 'Styling',
  },
  {
    id: 'SKU-005',
    name: 'Cepillo Desenredante Profesional',
    description:
      'Cerdas flexibles que desenredan sin dolor. Ideal para todo tipo de cabello.',
    price: 4590,
    image: cepilloDesenredante,
    category: 'Accesorios',
  },
  {
    id: 'SKU-006',
    name: 'Shampoo con Keratina y Argán',
    description:
      'Limpieza profunda y nutrición intensa, sin sulfatos ni parabenos.',
    price: 9990,
    image: shampooKeratina,
    category: 'Cuidado Diario',
  },
  {
    id: 'SKU-007',
    name: 'Aceite Capilar de Coco',
    description:
      'Aporta brillo natural y suavidad, ideal para uso diario.',
    price: 8990,
    image: aceiteCoco,
    category: 'Tratamiento',
  },
  {
    id: 'SKU-008',
    name: 'Peine de Madera Antiestático',
    description:
      'Previene el frizz y cuida el cuero cabelludo. 100% natural.',
    price: 4990,
    image: peineMadera,
    category: 'Accesorios',
  },
];
