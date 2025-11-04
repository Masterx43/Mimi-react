export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
}


export const products: Product[] = [
    {
        id: 'SKU-001',
        name: 'Mascarilla Capilar Hidratante',
        description:
            'Nutre tu cabello con extractos naturales y brillo duradero. Ideal para cabellos secos o dañados.',
        price: 12990,
        image: '/assets/img/MascarillaCapilar.webp',
        category: 'Tratamiento',
    },
    {
        id: 'SKU-002',
        name: 'Serum Capilar de Keratina',
        description: 'Repara las puntas abiertas y protege del calor de planchas y secadores.',
        price: 18990,
        image: '/assets/img/serumCapilar.webp',
        category: 'Cuidado Diario',
    },
    {
        id: 'SKU-003',
        name: 'TermoProtector Profesional',
        description: 'Protege tu cabello hasta 230°C, evitando quiebre y pérdida de hidratación.',
        price: 15990,
        image: '/assets/img/TermoProtector.webp',
        category: 'Styling',
    },
    {
        id: 'SKU-004',
        name: 'Crema de Peinar para Rizos',
        description: 'Define tus rizos y controla el frizz sin dejar residuos. Enriquecida con aceites naturales.',
        price: 10990,
        image: '/assets/img/crema_de_peinar_rizos.webp',
        category: 'Styling',
    },
    {
        id: 'SKU-005',
        name: 'Cepillo Desenredante Profesional',
        description: 'Cerdas flexibles que desenredan sin dolor. Ideal para todo tipo de cabello.',
        price: 4590,
        image: '/assets/img/cepillo_desenredante_crespo.webp',
        category: 'Accesorios',
    },
    {
        id: 'SKU-006',
        name: 'Shampoo con Keratina y Argán',
        description: 'Limpieza profunda y nutrición intensa, sin sulfatos ni parabenos.',
        price: 9990,
        image: '/assets/img/shampoo_keratina.webp',
        category: 'Cuidado Diario',
    },
    {
        id: 'SKU-007',
        name: 'Aceite Capilar de Coco',
        description: 'Aporta brillo natural y suavidad, ideal para uso diario.',
        price: 8990,
        image: '/assets/img/aceite_coco.webp',
        category: 'Tratamiento',
    },
    {
        id: 'SKU-008',
        name: 'Peine de Madera Antiestático',
        description: 'Previene el frizz y cuida el cuero cabelludo. 100% natural.',
        price: 4990,
        image: '/assets/img/peine_madera.webp',
        category: 'Accesorios',
    },
]