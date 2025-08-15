// Image utility functions for handling product images
import { getProductImages as getProductImagesFromData, getFirstProductImage as getFirstProductImageFromData } from '../data/productImages';
import logoImage from '../assets/logo.png';

// Function to get the correct image path
export const getProductImage = (imagePath, productName) => {
  // If imagePath is null/undefined, return logo as fallback
  if (!imagePath) {
    return logoImage;
  }

  // If it's already an imported image, return it directly
  if (typeof imagePath === 'string' && imagePath.startsWith('src/assets/')) {
    // For now, return logo as fallback since src/assets paths don't work in img src
    // In the future, you can move these to public folder or import them directly
    return logoImage;
  }

  // If it's a public folder path (starts with /), return as is
  if (typeof imagePath === 'string' && imagePath.startsWith('/')) {
    return imagePath;
  }

  // Default fallback
  return logoImage;
};

// Function to get multiple product images
export const getProductImages = (images, productName) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return [logoImage];
  }

  return images.map(img => getProductImage(img, productName));
};

// Function to get first product image
export const getFirstProductImage = (images, productName) => {
  return getProductImage(images?.[0], productName);
};

// New functions that work with product IDs
export const getProductImagesById = getProductImagesFromData;
export const getFirstProductImageById = getFirstProductImageFromData;

// Default product image
export const defaultProductImage = logoImage;
