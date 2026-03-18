export const categories = [
  { id: '1', name: 'For Her', slug: 'for-her' },
  { id: '2', name: 'For Him', slug: 'for-him' },
  { id: '3', name: 'For Couples', slug: 'for-couples' },
  { id: '4', name: 'Sex Toys', slug: 'sex-toys' },
  { id: '5', name: 'KINK/BDSM', slug: 'kink-bdsm' },
  { id: '6', name: 'Sex Essentials', slug: 'sex-essentials' },
  { id: '7', name: 'Lingerie', slug: 'lingerie' },
  { id: '8', name: 'Sale', slug: 'sale' },
];

export const products = [
  // For Her
  { id: 'p1', categoryId: '1', name: 'Luxury Clitoral Vibrator - Rose Gold', slug: 'luxury-clitoral-vibrator', description: '', price: 2499, originalPrice: 3499, rating: 4.8, numReviews: 156, isFeatured: true, stock: 50, imageUrl: '/images/products/cat_for_her.png' },
  { id: 'p2', categoryId: '1', name: 'G-Spot Vibrator - Premium Edition', slug: 'g-spot-vibrator', description: '', price: 1999, originalPrice: 2799, rating: 4.7, numReviews: 98, isFeatured: false, stock: 40, imageUrl: '/images/products/cat_for_her.png' },
  { id: 'p3', categoryId: '1', name: 'Dual Action Vibrator', slug: 'dual-action-vibrator', description: '', price: 2199, originalPrice: null, rating: 4.6, numReviews: 127, isFeatured: false, stock: 60, imageUrl: '/images/products/cat_for_her.png' },
  { id: 'p4', categoryId: '1', name: 'Wand Massager - Professional', slug: 'wand-massager', description: '', price: 1799, originalPrice: 2499, rating: 4.9, numReviews: 203, isFeatured: true, stock: 30, imageUrl: '/images/products/cat_for_her.png' },
  // For Him
  { id: 'p5', categoryId: '2', name: 'Male Masturbator - Realistic', slug: 'male-masturbator', description: '', price: 1299, originalPrice: 1899, rating: 4.5, numReviews: 87, isFeatured: false, stock: 45, imageUrl: '/images/products/cat_for_him.png' },
  { id: 'p6', categoryId: '2', name: 'Penis Ring - Vibrating', slug: 'penis-ring-vibrating', description: '', price: 799, originalPrice: 1199, rating: 4.4, numReviews: 112, isFeatured: false, stock: 100, imageUrl: '/images/products/cat_for_him.png' },
  { id: 'p7', categoryId: '2', name: 'Prostate Massager', slug: 'prostate-massager', description: '', price: 1599, originalPrice: 2299, rating: 4.7, numReviews: 94, isFeatured: true, stock: 25, imageUrl: '/images/products/cat_for_him.png' },
  { id: 'p8', categoryId: '2', name: 'Penis Pump - Electric', slug: 'penis-pump', description: '', price: 2499, originalPrice: 3499, rating: 4.3, numReviews: 76, isFeatured: false, stock: 15, imageUrl: '/images/products/cat_for_him.png' },
  // For Couples
  { id: 'p9', categoryId: '3', name: 'Couples\' Vibrator - Remote Control', slug: 'couples-vibrator-remote', description: '', price: 1899, originalPrice: 2699, rating: 4.8, numReviews: 134, isFeatured: true, stock: 55, imageUrl: '/images/products/cat_couples.png' },
  { id: 'p10', categoryId: '3', name: 'Couples\' Vibrator - App Controlled', slug: 'couples-vibrator-app', description: '', price: 2299, originalPrice: 3299, rating: 4.7, numReviews: 118, isFeatured: false, stock: 35, imageUrl: '/images/products/cat_couples.png' },
  { id: 'p11', categoryId: '3', name: 'Couples\' Vibrator - Wearable Panty', slug: 'couples-vibrator-wearable', description: '', price: 1599, originalPrice: 2199, rating: 4.6, numReviews: 101, isFeatured: false, stock: 20, imageUrl: '/images/products/cat_couples.png' },
  { id: 'p12', categoryId: '3', name: 'Couples\' Vibrator - Dual Stimulation', slug: 'couples-vibrator-dual', description: '', price: 1999, originalPrice: 2799, rating: 4.5, numReviews: 89, isFeatured: false, stock: 40, imageUrl: '/images/products/cat_couples.png' },
  // Sex Toys
  { id: 'p13', categoryId: '4', name: 'Dildo - Glass Premium', slug: 'glass-dildo', description: '', price: 1299, originalPrice: 1799, rating: 4.7, numReviews: 142, isFeatured: true, stock: 80, imageUrl: '/images/products/cat_sex_toys.png' },
  { id: 'p14', categoryId: '4', name: 'Realistic Dildo - Silicone', slug: 'realistic-dildo', description: '', price: 999, originalPrice: 1499, rating: 4.4, numReviews: 97, isFeatured: false, stock: 60, imageUrl: '/images/products/cat_sex_toys.png' },
  { id: 'p15', categoryId: '4', name: 'Vibrating Dildo - Multi-Speed', slug: 'vibrating-dildo', description: '', price: 1499, originalPrice: 2099, rating: 4.6, numReviews: 115, isFeatured: false, stock: 45, imageUrl: '/images/products/cat_sex_toys.png' },
  { id: 'p16', categoryId: '4', name: 'Rabbit Vibrator - Deluxe', slug: 'rabbit-vibrator', description: '', price: 2099, originalPrice: 2999, rating: 4.8, numReviews: 167, isFeatured: true, stock: 30, imageUrl: '/images/products/cat_sex_toys.png' },
  // KINK/BDSM
  { id: 'p17', categoryId: '5', name: 'Handcuffs - Padded', slug: 'handcuffs', description: '', price: 699, originalPrice: 999, rating: 4.5, numReviews: 84, isFeatured: true, stock: 120, imageUrl: '/images/products/cat_bdsm.png' },
  { id: 'p18', categoryId: '5', name: 'Bondage Rope - Premium', slug: 'bondage-rope', description: '', price: 599, originalPrice: 899, rating: 4.6, numReviews: 73, isFeatured: false, stock: 150, imageUrl: '/images/products/cat_bdsm.png' },
  { id: 'p19', categoryId: '5', name: 'Whip - Leather', slug: 'leather-whip', description: '', price: 1299, originalPrice: 1799, rating: 4.4, numReviews: 56, isFeatured: false, stock: 50, imageUrl: '/images/products/cat_bdsm.png' },
  { id: 'p20', categoryId: '5', name: 'Bondage Kit - Starter', slug: 'bondage-kit', description: '', price: 1999, originalPrice: 2999, rating: 4.7, numReviews: 128, isFeatured: true, stock: 25, imageUrl: '/images/products/cat_bdsm.png' },
  // Sex Essentials
  { id: 'p21', categoryId: '6', name: 'Lubricant - Water-Based', slug: 'lube-water', description: '', price: 349, originalPrice: 499, rating: 4.8, numReviews: 234, isFeatured: true, stock: 300, imageUrl: '/images/products/cat_essentials.png' },
  { id: 'p22', categoryId: '6', name: 'Lubricant - Silicone-Based', slug: 'lube-silicone', description: '', price: 399, originalPrice: 599, rating: 4.7, numReviews: 187, isFeatured: false, stock: 250, imageUrl: '/images/products/cat_essentials.png' },
  { id: 'p23', categoryId: '6', name: 'Condoms - Premium Pack', slug: 'condoms-premium', description: '', price: 299, originalPrice: 449, rating: 4.6, numReviews: 156, isFeatured: true, stock: 400, imageUrl: '/images/products/cat_essentials.png' },
  { id: 'p24', categoryId: '6', name: 'Toy Cleaner - Antibacterial', slug: 'toy-cleaner', description: '', price: 249, originalPrice: 399, rating: 4.5, numReviews: 92, isFeatured: false, stock: 150, imageUrl: '/images/products/cat_essentials.png' },
  // Lingerie
  { id: 'p25', categoryId: '7', name: 'Lingerie Set - Lace', slug: 'lingerie-lace', description: '', price: 1299, originalPrice: 1899, rating: 4.7, numReviews: 143, isFeatured: true, stock: 80, imageUrl: '/images/products/cat_lingerie.png' },
  { id: 'p26', categoryId: '7', name: 'Babydoll - Sheer', slug: 'babydoll-sheer', description: '', price: 899, originalPrice: 1299, rating: 4.6, numReviews: 118, isFeatured: false, stock: 95, imageUrl: '/images/products/cat_lingerie.png' },
  { id: 'p27', categoryId: '7', name: 'Bodystocking - Fishnet', slug: 'bodystocking-fishnet', description: '', price: 699, originalPrice: 999, rating: 4.5, numReviews: 97, isFeatured: false, stock: 110, imageUrl: '/images/products/cat_lingerie.png' },
  // Sale
  { id: 'p28', categoryId: '8', name: 'Vibrator Bundle - Best Sellers', slug: 'vibrator-bundle', description: '', price: 3999, originalPrice: 6699, rating: 4.8, numReviews: 201, isFeatured: true, stock: 15, imageUrl: '/images/products/cat_sale.png' },
  { id: 'p29', categoryId: '8', name: 'Couples\' Starter Pack', slug: 'couples-starter-pack', description: '', price: 2499, originalPrice: 4299, rating: 4.7, numReviews: 156, isFeatured: true, stock: 25, imageUrl: '/images/products/cat_sale.png' },
  { id: 'p30', categoryId: '8', name: 'Mystery Box - Premium', slug: 'mystery-box', description: '', price: 1999, originalPrice: 5000, rating: 4.9, numReviews: 89, isFeatured: true, stock: 10, imageUrl: '/images/products/cat_sale.png' },
];

export const MOCK_DB = {
  products,
  categories,
};
