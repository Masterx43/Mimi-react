// Importamos todas las imágenes desde src/assets/img
import { serviceImages } from './images';
import type { Service } from '../interfaces/Service';

//Lista de servicios
export const services: Service[] = [
  {
    id: 'SERV-001',
    nombre: 'Coloración Profesional',
    descCorta: 'Renueva tu look con tonos vibrantes y duraderos.',
    descLarga:
      'Nuestro servicio de coloración utiliza productos de alta calidad sin amoníaco, que cuidan la salud de tu cabello mientras logran tonos intensos, naturales y con brillo radiante. Incluye asesoría personalizada según tu tipo de cabello.',
    precio: 24990,
    img: serviceImages.coloracion,
  },
  {
    id: 'SERV-002',
    nombre: 'Brushing & Styling',
    descCorta: 'Peinado y alisado profesional con acabado perfecto.',
    descLarga:
      'Ideal para eventos o simplemente para lucir impecable. Incluye lavado, secado con cepillo y modelado con plancha o rizador según tu preferencia. ¡Tu cabello quedará suave, brillante y con movimiento natural!',
    precio: 15990,
    img: serviceImages.brushing,
  },
  {
    id: 'SERV-003',
    nombre: 'Manicure Spa',
    descCorta: 'Cuida tus manos con nuestro tratamiento completo.',
    descLarga:
      'Disfruta de una experiencia relajante que incluye limado, exfoliación, hidratación profunda y esmaltado a elección (tradicional o permanente). Perfecto para mantener tus manos suaves y elegantes.',
    precio: 9990,
    img: serviceImages.manicure,
  },
  {
    id: 'SERV-004',
    nombre: 'Corte Mujer',
    descCorta: 'Corte profesional para mujeres con acabado personalizado.',
    descLarga:
      'Servicio de corte para modificar la estructura y/o largo del cabello, utilizando tijeras o máquina. Incluye lavado y secado básico. Duración aproximada de 45 minutos.',
    precio: 16500,
    img: serviceImages.corteMujer,
  },
  {
    id: 'SERV-005',
    nombre: 'Corte Flequillo',
    descCorta: 'Retoque rápido y preciso de flequillo.',
    descLarga:
      'Servicio de corte para modificar la estructura y/o largo del flequillo, utilizando tijeras o máquina. Ideal para mantener tu estilo sin un cambio completo. Duración aproximada de 15 minutos.',
    precio: 7000,
    img: serviceImages.corteFlequillo,
  },
  {
    id: 'SERV-006',
    nombre: 'Corte Hombre',
    descCorta: 'Corte clásico o moderno según tu estilo.',
    descLarga:
      'Servicio de corte para modificar la estructura y/o largo del cabello, utilizando tijeras o máquina. Incluye lavado y peinado final. Duración aproximada de 40 minutos.',
    precio: 13500,
    img: serviceImages.corteHombre,
  },
  {
    id: 'SERV-007',
    nombre: 'Corte Niño',
    descCorta: 'Corte especial para niños de entre 2 a 8 años.',
    descLarga:
      'Servicio pensado para los más pequeños, utilizando tijeras o máquina. Experiencia cómoda y segura. Duración aproximada de 40 minutos.',
    precio: 12500,
    img: serviceImages.corteNino,
  },
  {
    id: 'SERV-008',
    nombre: 'Lavado Específico',
    descCorta: 'Lavado y acondicionamiento personalizado según diagnóstico.',
    descLarga:
      'Servicio de lavado y acondicionamiento del cabello, realizado con una línea específica diagnosticada por el profesional según tus necesidades capilares. Ideal como complemento antes de otros servicios.',
    precio: 9500,
    img: serviceImages.lavadoCabello,
  },
  {
    id: 'SERV-009',
    nombre: 'Ondulado',
    descCorta: 'Rizos u ondas definidas con plancha u ondulador profesional.',
    descLarga:
      'Servicio en el que se utiliza plancha u ondulador profesional para conseguir ondas o rizos definidos, con productos protectores de calor y fijación ligera. Duración aproximada: 45 minutos.',
    precio: 17000,
    img: serviceImages.onduladoPlancha,
  },
  {
    id: 'SERV-010',
    nombre: 'Adicional Plancha - Precio Desde',
    descCorta: 'Finalización del brushing con plancha profesional.',
    descLarga:
      'Servicio complementario al brushing para alisar o pulir el cabello con plancha profesional. El precio puede variar según el largo y tipo de cabello.',
    precio: 8000,
    img: serviceImages.brushingPlancha,
  },
  {
    id: 'SERV-011',
    nombre: 'Adicional Ondulado - Precio Desde',
    descCorta: 'Finalización del brushing con ondulador profesional.',
    descLarga:
      'Servicio complementario para definir rizos u ondas con ondulador profesional. El precio varía según el largo y densidad del cabello.',
    precio: 9000,
    img: serviceImages.brushingOndas,
  },

  // Tratamientos Capilares
  {
    id: 'SERV-012',
    nombre: 'Reestructuración de Rizos Evan Care - Precio Desde',
    descCorta: 'Tratamiento profundo para rizos definidos y saludables.',
    descLarga:
      'Tratamiento profesional diseñado para devolver la forma, elasticidad e hidratación a los rizos. Reestructura la fibra capilar desde el interior, fortaleciendo y mejorando la textura natural del cabello.',
    precio: 80000,
    img: serviceImages.restauracionRizos,
  },

  // Coloración
  {
    id: 'SERV-013',
    nombre: 'Visos o Mechas con Papel - Precio Desde',
    descCorta: 'Efecto de iluminación y dimensión del color.',
    descLarga:
      'Técnica de mechas tricotadas con papel para lograr reflejos e iluminación natural. El precio varía según el largo del cabello. Ideal para renovar el look con brillo y profundidad.',
    precio: 85500,
    img: serviceImages.visosConPapel,
  },
  {
    id: 'SERV-014',
    nombre: 'Color Completo - Precio Desde',
    descCorta: 'Coloración total desde la raíz hasta las puntas.',
    descLarga:
      'Servicio de coloración completa que cubre todo el largo del cabello. Incluye diagnóstico previo y aplicación de productos protectores. El precio varía según el largo del cabello.',
    precio: 48500,
    img: serviceImages.colorCompleto,
  },
  {
    id: 'SERV-015',
    nombre: 'Crecimiento',
    descCorta: 'Coloración de raíces hasta 2 cm.',
    descLarga:
      'Coloración profesional del crecimiento de cabello (hasta 2 cm), ideal para mantener un tono uniforme entre coloraciones completas. Incluye diagnóstico y aplicación personalizada.',
    precio: 35500,
    img: serviceImages.crecimientoTintura,
  },
  {
    id: 'SERV-016',
    nombre: 'Reflejos - Precio Desde',
    descCorta: 'Aclaración natural para crear contraste y brillo.',
    descLarga:
      'Servicio de aclaración sobre base natural, que crea contraste de color y luminosidad. Ideal para quienes buscan un acabado más sutil o efecto de sol. El precio varía según largo del cabello.',
    precio: 73500,
    img: serviceImages.reflejos,
  },

  // Manicure y Paquetes
  {
    id: 'SERV-017',
    nombre: 'Manicure Express',
    descCorta: 'Limpieza y esmaltado rápido.',
    descLarga:
      'Manicure rápida que incluye limado de uñas y esmaltado tradicional. Ideal para mantener tus manos impecables en poco tiempo.',
    precio: 9000,
    img: serviceImages.manicureExpress,
  },
  {
    id: 'SERV-018',
    nombre: 'Manicure Hombre',
    descCorta: 'Cuidado profesional de manos para hombres.',
    descLarga:
      'Manicure completo con limado, limpieza de cutículas, exfoliación y crema hidratante. Incluye brillo opcional. Perfecto para mantener una apariencia cuidada y profesional.',
    precio: 12000,
    img: serviceImages.manicureHombre,
  },
  {
    id: 'SERV-019',
    nombre: 'Manicure Niños',
    descCorta: 'Manicure para niños/as hasta 10 años.',
    descLarga:
      'Incluye limado suave, hidratación y esmaltado en color a elección. Servicio seguro y divertido para los más pequeños.',
    precio: 8000,
    img: serviceImages.manicureNinos,
  },
  {
    id: 'SERV-020',
    nombre: 'Manicure Tradicional Completa',
    descCorta: 'Tratamiento completo para manos impecables.',
    descLarga:
      'Incluye limado, limpieza de cutículas, exfoliación, masaje con crema hidratante y esmaltado en color a elección. Ideal para una experiencia completa de cuidado.',
    precio: 14000,
    img: serviceImages.manicureTradicional,
  },
  {
    id: 'SERV-021',
    nombre: 'Pack Manicure + Pedicure Tradicional',
    descCorta: 'Paquete completo de cuidado para manos y pies.',
    descLarga:
      'Incluye manicure y pedicure tradicional con limpieza, exfoliación, hidratación y esmaltado. Perfecto para una experiencia de spa completa.',
    precio: 34000,
    img: serviceImages.manicurePedicure,
  },

  // Cejas y Pestañas
  {
    id: 'SERV-022',
    nombre: 'Lifting/Ondulación de Pestañas',
    descCorta: 'Eleva y curva tus pestañas de forma natural.',
    descLarga:
      'Tratamiento que eleva (lifting) o curva (ondulación) las pestañas naturales según la preferencia del cliente. Mejora la forma del ojo y realza la mirada sin necesidad de máscara.',
    precio: 19000,
    img: serviceImages.liftingPestanas,
  },
  {
    id: 'SERV-023',
    nombre: 'Tinte de Pestañas o Cejas',
    descCorta: 'Color intenso para resaltar la mirada.',
    descLarga:
      'Tinte especializado para cejas o pestañas, ideal para disimular zonas despobladas o dar intensidad. Resultados naturales que duran varias semanas.',
    precio: 7000,
    img: serviceImages.tinteCejas,
  },
  {
    id: 'SERV-024',
    nombre: 'Perfilado de Cejas',
    descCorta: 'Diseño y modelado de cejas según tu rostro.',
    descLarga:
      'Técnica de perfilado profesional para definir la forma de las cejas de acuerdo con la estructura facial. Incluye limpieza y acabado con pinza o cera.',
    precio: 14000,
    img: serviceImages.perfiladoCejas,
  },
  {
    id: 'SERV-025',
    nombre: 'Laminado de Cejas',
    descCorta: 'Cejas definidas y peinadas por semanas.',
    descLarga:
      'Tratamiento que alisa y fija las cejas en la posición deseada, logrando un aspecto más denso y pulido. Incluye crema regeneradora para mantener la salud del vello.',
    precio: 22000,
    img: serviceImages.laminadoCejas,
  },
];
