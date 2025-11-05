//Importamos todas las imágenes desde src/assets/img
import MascarillaCapilar from '../assets/img/productos/MascarillaCapilar.webp';
import serumCapilar from '../assets/img/productos/serumCapilar.webp';
import TermoProtector from '../assets/img/productos/TermoProtector.webp';
import cremaPeinar from '../assets/img/productos/crema_de_peinar_rizos.webp';
import cepilloDesenredante from '../assets/img/productos/cepillo_desenredante_crespo.webp';
import shampooKeratina from '../assets/img/productos/shampoo_keratina.webp';
import cremaMasaja from '../assets/img/productos/crema_masaja_capilar_500ml.webp';
import espejoDoble from '../assets/img/productos/espejo_doble_x10.webp';
import oxidanteVol30 from '../assets/img/productos/oxidante_vol30_75ml.webp';
import pestaniasNegra from '../assets/img/productos/pestanias_individual_negra.webp';
import pestaniasLily from '../assets/img/productos/pestanias_lily.webp';
import pinzaCejas from '../assets/img/productos/pinza_cejas.webp';
import tinturaModastyling from '../assets/img/productos/tintura_modastyling.webp';
import type { Product } from '../interfaces/Product';

//Lista completa de productos con imports
export const products: Product[] = [
  {
    id: 'SKU-001',
    name: 'Mascarilla Capilar Hidratante',
    description:
      'Nutre tu cabello con extractos naturales y brillo duradero. Ideal para cabellos secos o dañados.',
    price: 12990,
    image: MascarillaCapilar,
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
    name: 'Crema de Masaje Capilar 500ml',
    description:
      'Revitaliza el cuero cabelludo y estimula el crecimiento. Ideal para uso profesional.',
    price: 11990,
    image: cremaMasaja,
    category: 'Tratamiento',
  },
  {
    id: 'SKU-008',
    name: 'Espejo Doble con Aumento x10',
    description:
      'Espejo portátil con aumento ideal para maquillaje y cuidado facial de precisión.',
    price: 8490,
    image: espejoDoble,
    category: 'Accesorios',
  },
  {
    id: 'SKU-009',
    name: 'Oxidante Vol. 30 - 75ml',
    description:
      'Formulación estable y cremosa para mezclas de coloración profesional.',
    price: 4990,
    image: oxidanteVol30,
    category: 'Coloración',
  },
  {
    id: 'SKU-010',
    name: 'Pestañas Individuales Negras',
    description:
      'Pestañas ligeras y naturales, perfectas para un acabado personalizado.',
    price: 6990,
    image: pestaniasNegra,
    category: 'Maquillaje',
  },
  {
    id: 'SKU-011',
    name: 'Pestañas Lily Natural Look',
    description:
      'Diseño liviano y curvado, aporta volumen sin perder naturalidad.',
    price: 7490,
    image: pestaniasLily,
    category: 'Maquillaje',
  },
  {
    id: 'SKU-012',
    name: 'Pinza Profesional para Cejas',
    description:
      'Punta precisa y acero inoxidable. Ideal para definir cejas con máxima precisión.',
    price: 4990,
    image: pinzaCejas,
    category: 'Accesorios',
  },
  {
    id: 'SKU-013',
    name: 'Tintura Capilar Modastyling',
    description:
      'Color vibrante y duradero con fórmula protectora del cabello.',
    price: 9990,
    image: tinturaModastyling,
    category: 'Coloración',
  },
];
