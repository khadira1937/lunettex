// Types
export interface Variant {
  id: string;
  name: string;
  color: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  category: 'men' | 'women';
  collectionId: string;
  badge?: 'Best Seller' | 'New' | 'Limited';
  variants: Variant[];
  specs: {
    frameType: string;
    lensType: string;
    material: string;
  };
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

export interface Retailer {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
}

// Mock Data
export const collections: Collection[] = [
  {
    id: 'limited-drops',
    slug: 'limited-drops',
    name: 'Limited Drops',
    description: 'Exclusive, small-batch releases',
    image: '/images/rayban-3.png',
  },
  {
    id: 'everyday-classics',
    slug: 'everyday-classics',
    name: 'Everyday Classics',
    description: 'Timeless styles for daily wear',
    image: '/images/rayban-4.png',
  },
  {
    id: 'active-outdoor',
    slug: 'active-outdoor',
    name: 'Active & Outdoor',
    description: 'Built for movement and adventure',
    image: '/images/rayban-5.png',
  },
  {
    id: 'tech-editions',
    slug: 'tech-editions',
    name: 'Tech Editions',
    description: 'Advanced features for modern life',
    image: '/placeholder-collection.jpg',
  },
  {
    id: 'new-arrivals',
    slug: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Just in this season',
    image: '/placeholder-collection.jpg',
  },
  {
    id: 'bestsellers',
    slug: 'bestsellers',
    name: 'Best Sellers',
    description: 'Most loved by our community',
    image: '/placeholder-collection.jpg',
  },
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'wayfarer-matte-black',
    name: 'Ray-Ban Meta — Wayfarer',
    description:
      'The iconic silhouette, reimagined with Ray-Ban Meta technology. Smart glass camera with hands-free recording, open ear audio, and live streaming capabilities. Perfect for capturing life as you live it.',
    price: 2800,
    image: '/images/ray-ban-1.png',
    gallery: ['/images/ray-ban-1.png', '/images/ray-ban-1.png'],
    category: 'men',
    collectionId: 'bestsellers',
    badge: 'Best Seller',
    variants: [
      { id: 'v1', name: 'Matte Black', color: '#1C1B19', price: 2800 },
      { id: 'v2', name: 'Shiny Black', color: '#000000', price: 2800 },
      { id: 'v3', name: 'Tortoise', color: '#8B6914', price: 2800 },
    ],
    specs: {
      frameType: 'Full Rim',
      lensType: 'Polarized',
      material: 'Nylon & Metal',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 142,
  },
  {
    id: '2',
    slug: 'headliner-shiny-black',
    name: 'Ray-Ban Meta — Headliner',
    description:
      'A bold, contemporary style with timeless appeal. Features integrated smart technology with 12MP camera, spatial audio, and real-time translation. Designed for the modern explorer.',
    price: 2800,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'men',
    collectionId: 'tech-editions',
    badge: 'New',
    variants: [
      { id: 'v1', name: 'Shiny Black', color: '#000000', price: 2800 },
      { id: 'v2', name: 'Brushed Gold', color: '#D4AF37', price: 2800 },
      { id: 'v3', name: 'Matte Blue', color: '#1E3A8A', price: 2800 },
    ],
    specs: {
      frameType: 'Full Rim',
      lensType: 'Gradient',
      material: 'Titanium & Nylon',
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: '3',
    slug: 'skyler-warm-stone',
    name: 'Ray-Ban Meta — Skyler',
    description:
      'Feminine elegance meets cutting-edge innovation. Lightweight frame with advanced lens technology and integrated AI assistant. Your perfect daily companion for work and play.',
    price: 2800,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'women',
    collectionId: 'bestsellers',
    variants: [
      { id: 'v1', name: 'Warm Stone', color: '#D4C5B9', price: 2800 },
      { id: 'v2', name: 'Rose Gold', color: '#B76E79', price: 2800 },
      { id: 'v3', name: 'Mint', color: '#A8D8DA', price: 2800 },
    ],
    specs: {
      frameType: 'Cat Eye',
      lensType: 'Photochromic',
      material: 'Acetate',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 167,
  },
  {
    id: '4',
    slug: 'ranger-matte-olive',
    name: 'Ray-Ban Meta — Ranger',
    description:
      'Built for adventure. Rugged construction with anti-reflective lenses and impact-resistant frame. Perfect for outdoor enthusiasts and active lifestyles.',
    price: 2950,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'men',
    collectionId: 'active-outdoor',
    badge: 'Limited',
    variants: [
      { id: 'v1', name: 'Matte Olive', color: '#556B2F', price: 2950 },
      { id: 'v2', name: 'Desert Sand', color: '#EDC9AF', price: 2950 },
    ],
    specs: {
      frameType: 'Full Rim',
      lensType: 'Polarized',
      material: 'TR-90 & Metal',
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 73,
  },
  {
    id: '5',
    slug: 'empress-rose-gold',
    name: 'Ray-Ban Meta — Empress',
    description:
      'Statement-making sophistication. Oversized frame with premium materials and gradient lenses. Designed for those who lead with style and confidence.',
    price: 2900,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'women',
    collectionId: 'everyday-classics',
    variants: [
      { id: 'v1', name: 'Rose Gold', color: '#B76E79', price: 2900 },
      { id: 'v2', name: 'Silver', color: '#C0C0C0', price: 2900 },
      { id: 'v3', name: 'Gold', color: '#D4AF37', price: 2900 },
    ],
    specs: {
      frameType: 'Oversized',
      lensType: 'Gradient',
      material: 'Gold Plated',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 129,
  },
  {
    id: '6',
    slug: 'aviator-titanium',
    name: 'Ray-Ban Meta — Aviator',
    description:
      'The legendary silhouette with smart glass innovation. Durable titanium construction and premium optics. A timeless choice that transcends trends.',
    price: 3100,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'men',
    collectionId: 'limited-drops',
    badge: 'Limited',
    variants: [
      { id: 'v1', name: 'Titanium', color: '#878787', price: 3100 },
      { id: 'v2', name: 'Gold Titanium', color: '#D4AF37', price: 3100 },
    ],
    specs: {
      frameType: 'Teardrop',
      lensType: 'Premium Glass',
      material: 'Titanium',
    },
    inStock: false,
    rating: 4.9,
    reviewCount: 201,
  },
  {
    id: '7',
    slug: 'clubmaster-havana',
    name: 'Ray-Ban Meta — Clubmaster',
    description:
      'Vintage inspiration meets modern technology. Iconic browline style with smart features integrated seamlessly. Classic appeal with contemporary edge.',
    price: 2750,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'men',
    collectionId: 'bestsellers',
    variants: [
      { id: 'v1', name: 'Havana', color: '#8B4513', price: 2750 },
      { id: 'v2', name: 'Black', color: '#1C1B19', price: 2750 },
      { id: 'v3', name: 'Light Havana', color: '#CD853F', price: 2750 },
    ],
    specs: {
      frameType: 'Clubmaster',
      lensType: 'Standard',
      material: 'Acetate',
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '8',
    slug: 'round-rose-tint',
    name: 'Ray-Ban Meta — Round',
    description:
      'Retro elegance for the modern era. Circular lenses with rose tint option and smart connectivity. Stand out with understated sophistication.',
    price: 2600,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'women',
    collectionId: 'everyday-classics',
    badge: 'New',
    variants: [
      { id: 'v1', name: 'Gold with Rose Tint', color: '#FFB6C1', price: 2600 },
      { id: 'v2', name: 'Black with Blue', color: '#00008B', price: 2600 },
      { id: 'v3', name: 'Silver with Green', color: '#90EE90', price: 2600 },
    ],
    specs: {
      frameType: 'Round',
      lensType: 'Tinted',
      material: 'Titanium',
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 84,
  },
  {
    id: '9',
    slug: 'square-gradient',
    name: 'Ray-Ban Meta — Square',
    description:
      'Geometric precision with contemporary flair. Strong angular lines and gradient lenses. Perfect for making a bold statement with subtle sophistication.',
    price: 2850,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'men',
    collectionId: 'tech-editions',
    variants: [
      { id: 'v1', name: 'Black Gradient', color: '#2F4F4F', price: 2850 },
      { id: 'v2', name: 'Brown Gradient', color: '#8B4513', price: 2850 },
    ],
    specs: {
      frameType: 'Square',
      lensType: 'Gradient',
      material: 'Acetate',
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: '10',
    slug: 'hexagonal-light',
    name: 'Ray-Ban Meta — Hexagonal',
    description:
      'Unique geometry for the discerning eye. Six-sided frame design with cutting-edge smart technology. Express your individuality with style.',
    price: 2700,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'women',
    collectionId: 'active-outdoor',
    variants: [
      { id: 'v1', name: 'Light Gray', color: '#D3D3D3', price: 2700 },
      { id: 'v2', name: 'Champagne', color: '#F7E7CE', price: 2700 },
    ],
    specs: {
      frameType: 'Hexagonal',
      lensType: 'Polarized',
      material: 'TR-90',
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: '11',
    slug: 'butterfly-jet',
    name: 'Ray-Ban Meta — Butterfly',
    description:
      'Feminine power in a timeless shape. Curved butterfly silhouette with premium gradient lenses. Elegance that celebrates individuality.',
    price: 2750,
    image: '/images/ray-ban-2.png',
    gallery: ['/images/ray-ban-2.png', '/images/ray-ban-2.png'],
    category: 'women',
    collectionId: 'bestsellers',
    badge: 'Best Seller',
    variants: [
      { id: 'v1', name: 'Jet Black', color: '#000000', price: 2750 },
      { id: 'v2', name: 'Tortoise', color: '#8B6914', price: 2750 },
    ],
    specs: {
      frameType: 'Butterfly',
      lensType: 'Gradient',
      material: 'Acetate',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: '12',
    slug: 'sport-wrap-matte',
    name: 'Ray-Ban Meta — Sport Wrap',
    description:
      'Performance-driven design for active pursuits. Wraparound frame with ventilation and grip coating. Technology that keeps pace with your lifestyle.',
    price: 3050,
    image: '/placeholder-product.jpg',
    gallery: ['/placeholder-product.jpg', '/placeholder-product.jpg'],
    category: 'men',
    collectionId: 'active-outdoor',
    variants: [
      { id: 'v1', name: 'Matte Black', color: '#1C1B19', price: 3050 },
      { id: 'v2', name: 'Matte Red', color: '#8B0000', price: 3050 },
    ],
    specs: {
      frameType: 'Wraparound',
      lensType: 'Polarized',
      material: 'TR-90 & Rubber',
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 76,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Fatima M.',
    rating: 5,
    title: 'Absolutely love them!',
    content:
      'These glasses are incredibly well-made. The smart features are so seamless to use, and they look premium in person. Worth every dirham.',
    verified: true,
  },
  {
    id: '2',
    author: 'Hassan K.',
    rating: 5,
    title: 'Best investment for my lifestyle',
    content:
      'Perfect for recording and sharing my adventures. The build quality is exceptional and the customer service was outstanding.',
    verified: true,
  },
  {
    id: '3',
    author: 'Zainab L.',
    rating: 4,
    title: 'Great style and functionality',
    content:
      'Love the design and how the tech features work. Took a couple days to get used to, but now I cannot imagine life without them.',
    verified: true,
  },
  {
    id: '4',
    author: 'Mohammed A.',
    rating: 5,
    title: 'Premium quality',
    content:
      'The lenses are crystal clear and the frame feels solid. Highly recommend to anyone looking for smart glasses with real style.',
    verified: true,
  },
  {
    id: '5',
    author: 'Leila H.',
    rating: 4,
    title: 'Elegant and smart',
    content:
      'Beautiful design that does not feel tech-heavy. Comfortable for all-day wear and the battery lasts impressively long.',
    verified: true,
  },
  {
    id: '6',
    author: 'Omar S.',
    rating: 5,
    title: 'Next level eyewear',
    content:
      'This is the future of glasses. The integration of style and technology is seamless. Already ordered a second pair for backup.',
    verified: true,
  },
];

export const retailers: Retailer[] = [
  {
    id: '1',
    name: 'Ray-Ban Meta - Casablanca Flagship',
    city: 'Casablanca',
    address: '123 Boulevard Zerktouni, Casablanca 20000',
    phone: '+212 5 22 29 51 00',
  },
  {
    id: '2',
    name: 'Vision Plus - Casablanca',
    city: 'Casablanca',
    address: '45 Avenue des FAR, Casablanca 20000',
    phone: '+212 5 22 26 47 89',
  },
  {
    id: '3',
    name: 'Luxe Optics - Rabat',
    city: 'Rabat',
    address: '78 Avenue Mohammed V, Rabat 10000',
    phone: '+212 5 37 20 15 30',
  },
  {
    id: '4',
    name: 'Eye Style - Rabat',
    city: 'Rabat',
    address: '22 Rue Ghazza, Rabat 10000',
    phone: '+212 5 37 21 92 45',
  },
  {
    id: '5',
    name: 'Medina Eyewear - Marrakech',
    city: 'Marrakech',
    address: '56 Rue Bab Agnaou, Marrakech 40000',
    phone: '+212 5 24 39 01 23',
  },
  {
    id: '6',
    name: 'Atlas Vision - Marrakech',
    city: 'Marrakech',
    address: '15 Avenue Mohammed VI, Marrakech 40000',
    phone: '+212 5 24 43 45 67',
  },
  {
    id: '7',
    name: 'Tangier Optics - Tangier',
    city: 'Tangier',
    address: '89 Rue de Fez, Tangier 90000',
    phone: '+212 5 39 33 89 01',
  },
  {
    id: '8',
    name: 'Mediterranean Eyeglasses - Tangier',
    city: 'Tangier',
    address: '34 Boulevard Mohammed V, Tangier 90000',
    phone: '+212 5 39 37 22 16',
  },
];
