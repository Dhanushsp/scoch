// Centralized product images imports
// This file ensures all product images are properly imported and accessible

// Import logo as fallback
import logoImage from '../assets/logo.png';

// Import banner image
import bannerImage from '../assets/banner.jpg';

// Product Images - Volume II (these actually exist)
import satinRegentImage1 from '../assets/Volume-II/Satin Regent Co-ord/image13.jpg';
import satinRegentImage2 from '../assets/Volume-II/Satin Regent Co-ord/image21.jpg';
import satinRegentImage3 from '../assets/Volume-II/Satin Regent Co-ord/image22.jpg';

import shamrayEstateImage1 from '../assets/Volume-II/Shamray Estate Co-ord/1.1.jpg';
import shamrayEstateImage2 from '../assets/Volume-II/Shamray Estate Co-ord/1.2.jpg';
import shamrayEstateImage3 from '../assets/Volume-II/Shamray Estate Co-ord/1.3.jpg';

// Product Images - Volume I (these actually exist)
import heritageRebelImage1 from '../assets/Volume I/The heritage rebel/4.1.jpg';
import heritageRebelImage2 from '../assets/Volume I/The heritage rebel/4.2.jpg';
import heritageRebelImage3 from '../assets/Volume I/The heritage rebel/4.3.jpg';

import afsanayImage1 from '../assets/Volume I/Afsanay/3.1.jpg';
import afsanayImage2 from '../assets/Volume I/Afsanay/3.2.jpg';
import afsanayImage3 from '../assets/Volume I/Afsanay/3.3.jpg';

// Raah-e-manzil images (these actually exist)
import raahEManzilImage1 from '../assets/Volume I/Raah-e-manzil/2.1.jpg';
import raahEManzilImage2 from '../assets/Volume I/Raah-e-manzil/2.2.jpg';
import raahEManzilImage3 from '../assets/Volume I/Raah-e-manzil/2.3.jpg';

// Product Images - Perfumes (these actually exist)
import eclatRoyaleImage1 from '../assets/Perfumes/Éclat Royale-Impression of Creed Aventus/50ml.png';
import eclatRoyaleImage2 from '../assets/Perfumes/Éclat Royale-Impression of Creed Aventus/30ml.png';
import eclatRoyaleImage3 from '../assets/Perfumes/Éclat Royale-Impression of Creed Aventus/10ml.png';

import roselinaImage1 from '../assets/Perfumes/Roselina-Impression of Delina/50ml.png';
import roselinaImage2 from '../assets/Perfumes/Roselina-Impression of Delina/30ml.png';
import roselinaImage3 from '../assets/Perfumes/Roselina-Impression of Delina/10ml.png';

// Note: Only perfumes with actual images are included

// Export all product images
export const productImages = {
  // Volume II Products
  1: [satinRegentImage3, satinRegentImage2, satinRegentImage1], // Satin Regent Co-ord
  2: [shamrayEstateImage2, shamrayEstateImage1, shamrayEstateImage3], // Shamray Estate Co-ord
  
  // Volume I Products
  3: [heritageRebelImage1, heritageRebelImage2, heritageRebelImage3], // The Heritage Rebel
  4: [afsanayImage1, afsanayImage2, afsanayImage3], // Afsanay
  5: [raahEManzilImage1, raahEManzilImage2, raahEManzilImage3], // Raah-e-Manzil
  
  // Perfume Products
  6: [eclatRoyaleImage3, eclatRoyaleImage2, eclatRoyaleImage1], // Éclat Royale
  7: [roselinaImage3, roselinaImage2, roselinaImage1], // Roselina
};

// Export individual images
export const getProductImages = (productId) => {
  return productImages[productId] || [logoImage];
};

export const getFirstProductImage = (productId) => {
  const images = productImages[productId];
  return images && images.length > 0 ? images[0] : logoImage;
};

// Export other images
export { logoImage, bannerImage };
