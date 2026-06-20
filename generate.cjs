const fs = require('fs');
const path = require('path');

const baseDir = 'public/product-images';
const dirs = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

const catMapping = {
  'bed': 'Bedroom',
  'coffeetable': 'Living',
  'diningtable': 'Dining',
  'door': 'Doors & Windows',
  'modular kitchen': 'Kitchen',
  'round table plain': 'Tables & Stools',
  'sofa': 'Living',
  'Teak Cane Panel Cabinet': 'Living',
  'Teak Elegance Console Table': 'Living',
  'teak round table dark polished': 'Tables & Stools',
  'teakwood desk with drawers': 'Office',
  'teakWood mosaic block tablestool square shaped': 'Tables & Stools',
  'teakwood round designed table': 'Tables & Stools',
  'teakWood round mosaic stool designed': 'Tables & Stools',
  'teatable': 'Tables & Stools',
  'tv unit': 'Living',
  'wardrobe': 'Bedroom',
  'windows': 'Doors & Windows',
  'woodenchair': 'Seating'
};

const categories = [...new Set(Object.values(catMapping))];

const products = dirs.map((dir, idx) => {
  const files = fs.readdirSync(path.join(baseDir, dir)).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp'));
  const gallery = files.map(f => `/product-images/${dir}/${f}`);
  const image = gallery[0];
  
  let name = dir.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    id: idx + 1,
    name: name,
    category: catMapping[dir] || 'Custom',
    rating: parseFloat((Math.random() * (5.0 - 4.5) + 4.5).toFixed(1)),
    reviews: Math.floor(Math.random() * 200) + 20,
    image: image,
    gallery: gallery,
    tags: ['Premium Quality', 'Handcrafted'],
    photosCount: gallery.length,
    description: `A premium handcrafted ${name.toLowerCase()} that brings warmth, elegance, and durability to your space. Meticulously designed with high-quality materials to ensure longevity and timeless beauty.`,
    features: [
      { label: 'Material', value: 'Solid Wood / Premium Plywood' },
      { label: 'Finish', value: 'Custom Polish / Laminate' },
      { label: 'Craftsmanship', value: 'Handcrafted' },
      { label: 'Quality', value: 'Export Grade' }
    ],
    badges: ['100% Quality Assured', 'Handcrafted', 'Delivery Available', 'Custom Sizes']
  };
});

const content = `export const categories = ${JSON.stringify(categories)};\n\nexport const allProducts = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync('src/data/products.js', content);
console.log('Successfully generated src/data/products.js with 19 products!');
