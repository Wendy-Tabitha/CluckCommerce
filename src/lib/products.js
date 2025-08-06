const products = [
  {
    id: 'eggs-dozen',
    name: 'Farm Fresh Eggs (Dozen)',
    description: 'A dozen of our finest, organically-fed, free-range chicken eggs.',
    longDescription: 'Our hens are free to roam in open pastures, foraging on a natural diet supplemented with organic, non-GMO feed. This results in eggs with rich, golden yolks and a taste that\'s simply unparalleled. Perfect for breakfast, baking, or any meal of the day.',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    price: 3.99,
    type: 'eggs',
    stock: 150,
    quantity: 12,
    freshness: 'today',
    featured: true,
  },
  {
    id: 'eggs-half-dozen',
    name: 'Farm Fresh Eggs (Half Dozen)',
    description: 'Six of our finest, organically-fed, free-range chicken eggs.',
    longDescription: 'Our hens are free to roam in open pastures, foraging on a natural diet supplemented with organic, non-GMO feed. This results in eggs with rich, golden yolks and a taste that\'s simply unparalleled. Perfect for a smaller household.',
    images: ['https://placehold.co/600x400.png'],
    price: 2.29,
    type: 'eggs',
    stock: 100,
    quantity: 6,
    freshness: 'today',
  },
  {
    id: 'slaughtered-whole',
    name: 'Whole Slaughtered Chicken',
    description: 'A whole, ready-to-cook chicken, raised ethically on our farm.',
    longDescription: 'Our chickens are raised with the utmost care, free from antibiotics and hormones. This whole chicken is expertly prepared and ready for your favorite recipes. Ideal for roasting, it offers tender, juicy meat that the whole family will love.',
    images: ['https://placehold.co/600x400.png'],
    price: 12.5,
    type: 'slaughtered-meat',
    stock: 50,
    weight: 1.5,
    featured: true,
  },
  {
    id: 'slaughtered-breast',
    name: 'Chicken Breast (2-pack)',
    description: 'Two succulent, boneless, skinless chicken breasts.',
    longDescription: 'The leanest and most versatile cut, our chicken breasts are perfect for grilling, baking, or slicing into stir-fries. They are tender, flavorful, and a healthy choice for any meal.',
    images: ['https://placehold.co/600x400.png'],
    price: 7.99,
    type: 'slaughtered-meat',
    stock: 80,
    weight: 0.5,
  },
  {
    id: 'slaughtered-thighs',
    name: 'Chicken Thighs (4-pack)',
    description: 'Four juicy, bone-in, skin-on chicken thighs.',
    longDescription: 'Known for their rich flavor and moist meat, our chicken thighs are a favorite for stews, braises, and grilling. The skin crisps up beautifully, adding texture and taste.',
    images: ['https://placehold.co/600x400.png'],
    price: 6.49,
    type: 'slaughtered-meat',
    stock: 70,
    weight: 0.8,
  },
  {
    id: 'alive-hen',
    name: 'Live Laying Hen',
    description: 'A healthy, young hen, ready to join your backyard flock.',
    longDescription: 'Start your own backyard egg production with one of our healthy, vaccinated laying hens. These birds are docile, great foragers, and will provide you with fresh eggs for years to come. We provide a care guide with every purchase.',
    images: ['https://placehold.co/600x400.png'],
    price: 25.0,
    type: 'alive-chicken',
    stock: 20,
    featured: true,
  },
  {
    id: 'alive-rooster',
    name: 'Live Rooster',
    description: 'A vibrant and healthy rooster for your flock.',
    longDescription: 'Introduce a handsome and protective rooster to your flock. Our roosters are known for their beautiful plumage and watchful nature. Please be aware of local regulations regarding roosters.',
    images: ['https://placehold.co/600x400.png'],
    price: 20.0,
    type: 'alive-chicken',
    stock: 15,
  },
   {
    id: 'eggs-tray',
    name: 'Farm Fresh Eggs (Tray of 30)',
    description: 'A full tray of 30 farm fresh eggs, perfect for families or avid bakers.',
    longDescription: 'Never run out of eggs again! This tray of 30 eggs offers the best value and the same great taste and quality as our smaller packs. Our hens\' diet ensures every egg is packed with flavor and nutrients.',
    images: ['https://placehold.co/600x400.png'],
    price: 8.99,
    type: 'eggs',
    stock: 50,
    quantity: 30,
    freshness: 'yesterday',
    featured: true,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
