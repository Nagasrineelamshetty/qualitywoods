
export const products = [
  {
    id: '1',
    name: 'Luxury King Size Bed',
    category: 'Beds',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'
    ],
    description: 'Handcrafted king size bed with premium teak wood finish. Features elegant headboard design and sturdy construction.',
    specifications: {
      material: 'Teak Wood',
      dimensions: '6ft x 6.5ft',
      warranty: '10 years'
    },
    customizations: {
      wood: ['Teak', 'Mahogany', 'Oak', 'Sheesham'],
      finish: ['Natural', 'Walnut', 'Cherry', 'Espresso'],
      dimensions: ['Single', 'Double', 'Queen', 'King']
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Sofa Set',
    category: 'Sofas',
    price: 65000,
    image: 'sofa.jpg',
    description: 'Contemporary sofa with premium fabric upholstery. Perfect for modern living rooms.',
    specifications: {
      material: 'Fabric & Wood Frame',
      dimensions: '8ft x 6ft',
      warranty: '5 years'
    },
    customizations: {
      wood: ['Teak', 'Pine', 'Oak'],
      finish: ['Natural', 'Walnut', 'White'],
      dimensions: ['2-Seater', '3-Seater', 'L-Shaped', 'U-Shaped']
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Modular Kitchen Set',
    category: 'Kitchen',
    price: 125000,
    image: 'dining_table.jpg',
    
    description: 'Complete modular kitchen solution with modern cabinets, countertops, and storage solutions.',
    specifications: {
      material: 'Plywood & Laminate',
      dimensions: 'Custom',
      warranty: '7 years'
    },
    customizations: {
      wood: ['Plywood', 'MDF', 'Solid Wood'],
      finish: ['Matte', 'Glossy', 'Textured'],
      dimensions: ['L-Shaped', 'U-Shaped', 'Straight', 'Island']
    },
    inStock: true
  },
  {
    id: '4',
    name: 'Executive Office Desk',
    category: 'Office',
    price: 35000,
    image: 'laptop_desk.jpg',
    
    description: 'Professional executive desk with ample storage and cable management. Perfect for home office.',
    specifications: {
      material: 'Engineered Wood',
      dimensions: '5ft x 2.5ft',
      warranty: '3 years'
    },
    customizations: {
      wood: ['Engineered Wood', 'Solid Wood', 'Metal Frame'],
      finish: ['Oak', 'Walnut', 'White', 'Black'],
      dimensions: ['Compact', 'Standard', 'Executive', 'L-Shaped']
    },
    inStock: true
  },
  {
    id: '5',
    name: '4-Door Wardrobe',
    category: 'Storage',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'
    ],
    description: 'Spacious 4-door wardrobe with hanging space, shelves, and drawers. Sliding door mechanism.',
    specifications: {
      material: 'Plywood',
      dimensions: '7ft x 2ft x 7ft',
      warranty: '5 years'
    },
    customizations: {
      wood: ['Plywood', 'MDF', 'Solid Wood'],
      finish: ['Natural', 'White', 'Walnut', 'Cherry'],
      dimensions: ['2-Door', '3-Door', '4-Door', '6-Door']
    },
    inStock: false
  },
  {
    id: '6',
    name: 'Dining Table Set',
    category: 'Dining',
    price: 42000,
    image: 'dining_table.jpg',
  
    description: '6-seater dining table set with matching chairs. Perfect for family gatherings.',
    specifications: {
      material: 'Solid Wood',
      dimensions: '6ft x 3ft',
      warranty: '8 years'
    },
    customizations: {
      wood: ['Teak', 'Mahogany', 'Oak', 'Pine'],
      finish: ['Natural', 'Dark Brown', 'Light Brown', 'Black'],
      dimensions: ['4-Seater', '6-Seater', '8-Seater', '10-Seater']
    },
    inStock: true
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely loved the custom bed design! The quality is exceptional and delivery was on time.',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'The modular kitchen exceeded our expectations. Professional team and excellent craftsmanship.',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Anjali Patel',
    rating: 4,
    comment: 'Beautiful furniture and great customer service. Highly recommend FurnitureCraft for custom designs.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop&crop=face'
  }
];

export const orders = [
  {
    id: 'FC2024001',
    status: 'In Production',
    customerName: 'John Doe',
    items: ['Luxury King Size Bed', 'Bedside Tables'],
    total: 52000,
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-02-15'
  },
  {
    id: 'FC2024002',
    status: 'Shipped',
    customerName: 'Jane Smith',
    items: ['Modern L-Shaped Sofa'],
    total: 65000,
    orderDate: '2024-01-10',
    estimatedDelivery: '2024-02-10'
  },
  {
    id: 'FC2024003',
    status: 'Delivered',
    customerName: 'Mike Johnson',
    items: ['Modular Kitchen Set'],
    total: 125000,
    orderDate: '2023-12-20',
    estimatedDelivery: '2024-01-20'
  }
];
