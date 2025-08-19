import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZoomIn, Truck, Package, Ruler, Star, ArrowLeft, Clock, CreditCard } from 'lucide-react';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';
import { getProductImagesById } from '../utils/imageUtils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

  // Find product from universal data
  const product = productsData.find(p => p.id === parseInt(id));
  
  // Debug: Log product structure to help identify issues
  console.log('Product found:', product);
  console.log('Product ID:', id);
  console.log('Product category:', product?.category);
  if (product && product.sizes) {
    console.log('Product sizes:', product.sizes);
    console.log('Sizes type:', typeof product.sizes);
    console.log('Is array:', Array.isArray(product.sizes));
    if (Array.isArray(product.sizes)) {
      product.sizes.forEach((size, index) => {
        console.log(`Size ${index}:`, size);
        console.log(`Size ${index} type:`, typeof size);
        console.log(`Size ${index} keys:`, Object.keys(size));
      });
    }
  }

  // Get current price based on selected size (for fragrances)
  const getCurrentPrice = () => {
    if (product.category === 'Fragrances' && selectedSize && product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === selectedSize);
      return sizeObj ? sizeObj.price : product.price;
    }
    return product.price;
  };

  // Get current original price based on selected size (for fragrances)
  const getCurrentOriginalPrice = () => {
    if (product.category === 'Fragrances' && selectedSize && product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === selectedSize);
      return sizeObj ? sizeObj.originalPrice : product.originalPrice;
    }
    return product.originalPrice;
  };

  // Get current discount based on selected size (for fragrances)
  const getCurrentDiscount = () => {
    const currentPrice = getCurrentPrice();
    const currentOriginalPrice = getCurrentOriginalPrice();
    if (currentOriginalPrice && currentPrice) {
      return Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);
    }
    return product.discount;
  };

  // Get current image based on selected size (for fragrances)
  const getCurrentImage = () => {
    if (product.category === 'Fragrances' && selectedSize && product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === selectedSize);
      if (sizeObj && sizeObj.size) {
        // Map size to the correct image index from productImages
        const sizeOrder = { '10ml': 0, '30ml': 1, '50ml': 2 };
        const imageIndex = sizeOrder[sizeObj.size];
        const productImages = getProductImagesById(product.id);
        if (productImages && productImages[imageIndex]) {
          return productImages[imageIndex];
        }
      }
    }
    
    // Fallback to product images
    const productImages = getProductImagesById(product.id);
    if (productImages && productImages.length > 0) {
      return productImages[currentImageIndex] || productImages[0];
    }
    return product.images && product.images[0] ? product.images[0] : '';
  };

  // Size guide data
  const sizeGuideData = {
    measurements: [
      { size: 'XS', chest: '32-34"', waist: '26-28"', hips: '34-36"' },
      { size: 'S', chest: '34-36"', waist: '28-30"', hips: '36-38"' },
      { size: 'M', chest: '36-38"', waist: '30-32"', hips: '38-40"' },
      { size: 'L', chest: '38-40"', waist: '32-34"', hips: '40-42"' },
      { size: 'XL', chest: '40-42"', waist: '34-36"', hips: '42-44"' },
      { size: 'XXL', chest: '42-44"', waist: '36-38"', hips: '44-46"' }
    ],
    instructions: [
      'Chest: Measure around the fullest part of your chest',
      'Waist: Measure around your natural waistline',
      'Hips: Measure around the fullest part of your hips',
      'Use a flexible measuring tape for accurate results',
      'Keep the tape snug but not tight'
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-select first size for fragrances when component loads (10ml first)
  useEffect(() => {
    if (product && product.category === 'Fragrances' && product.sizes && product.sizes.length > 0 && !selectedSize) {
      // Sort sizes to ensure 10ml is first, then 30ml, then 50ml
      const sortedSizes = [...product.sizes].sort((a, b) => {
        const sizeOrder = { '10ml': 1, '30ml': 2, '50ml': 3 };
        return (sizeOrder[a.size] || 0) - (sizeOrder[b.size] || 0);
      });
      setSelectedSize(sortedSizes[0].size);
    }
    
    // Set loading to false once product is loaded
    if (product) {
      setIsLoading(false);
    }
  }, [product, selectedSize]);

  // Update current image when selected size changes for fragrances
  useEffect(() => {
    if (product && product.category === 'Fragrances' && selectedSize) {
      const sizeOrder = { '10ml': 0, '30ml': 1, '50ml': 2 };
      const imageIndex = sizeOrder[selectedSize];
      if (imageIndex !== undefined) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [selectedSize, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-black mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-black mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  // Additional safety check for product structure
  if (!product.sizes || !Array.isArray(product.sizes)) {
    console.error('Product sizes are not properly structured:', product.sizes);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-black mb-4">Product data error</h1>
          <p className="text-gray-600 mb-4">Product sizes are not properly configured</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Create cart item with all necessary information
    const currentPrice = getCurrentPrice();
    const productImages = getProductImagesById(product.id);
    const cartItem = {
      id: product.id,
      name: product.name,
      price: typeof currentPrice === 'number' ? currentPrice : product.price,
      image: productImages && productImages.length > 0 ? productImages[0] : (product.images && product.images[0] ? product.images[0] : ''),
      size: selectedSize || '',
      color: 'Default',
      quantity: quantity || 1
    };

    // Add to cart using context
    addToCart(cartItem);

    // Show success message
    alert('Product added to cart successfully!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Create cart item with all necessary information
    const currentPrice = getCurrentPrice();
    const productImages = getProductImagesById(product.id);
    const cartItem = {
      id: product.id,
      name: product.name,
      price: typeof currentPrice === 'number' ? currentPrice : product.price,
      image: productImages && productImages.length > 0 ? productImages[0] : (product.images && product.images[0] ? product.images[0] : ''),
      size: selectedSize || '',
      color: 'Default',
      quantity: quantity || 1
    };

    // Add to cart first
    addToCart(cartItem);

    // Then navigate to checkout
    navigate('/checkout');
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Size Guide Button - Only show for clothing */}
      {product.category === 'Clothes' && (
        <div className="absolute top-20 right-4 z-10">
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Ruler className="w-4 h-4" />
            <span className="text-sm font-medium">Size Guide</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={getCurrentImage()}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-contain rounded-2xl shadow-lg bg-gray-50"
              />

              {/* Size indicator for fragrances */}
              {product.category === 'Fragrances' && selectedSize && (
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedSize}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.category === 'Fragrances' && product.sizes && Array.isArray(product.sizes) ? (
                // For fragrances, show size-specific images as thumbnails
                product.sizes.map((sizeObj, index) => {
                  if (!sizeObj || typeof sizeObj !== 'object') return null;
                  
                  return (
                    <button
                      key={`size-${String(sizeObj.size)}`}
                      onClick={() => setSelectedSize(String(sizeObj.size))}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all relative ${
                        selectedSize === String(sizeObj.size) ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={(() => {
                          const sizeOrder = { '10ml': 0, '30ml': 1, '50ml': 2 };
                          const imageIndex = sizeOrder[sizeObj.size];
                          const productImages = getProductImagesById(product.id);
                          return productImages && productImages[imageIndex] ? productImages[imageIndex] : '';
                        })()}
                        alt={`${product.name} ${sizeObj.size}`}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                        {sizeObj.size}
                      </div>
                    </button>
                  );
                })
              ) : (
                // For other products, show standard image thumbnails
                (() => {
                  const images = getProductImagesById(product.id);
                  if (images && images.length > 0) {
                    return images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index ? 'border-black' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-contain bg-gray-50"
                        />
                      </button>
                    ));
                  }
                  return null;
                })()
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-black">
                  {product.name}
                </h1>
                {/* Sold Out Badge */}
                {!product.inStock && (
                  <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full">
                    Sold Out
                  </span>
                )}
              </div>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                {product.longDescription}
              </p>

              {/* Price Display */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  Rs. {typeof getCurrentPrice() === 'number' ? getCurrentPrice().toLocaleString() : 'N/A'}
                </span>
                {getCurrentOriginalPrice() && typeof getCurrentOriginalPrice() === 'number' && getCurrentOriginalPrice() > getCurrentPrice() && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      Rs. {getCurrentOriginalPrice().toLocaleString()}
                    </span>
                    {/* Discount Badge - Hidden for perfumes */}
                    {product.category !== 'Fragrances' && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {typeof getCurrentDiscount() === 'number' ? getCurrentDiscount() : 0}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>
              
              {/* Savings Amount - Hidden for perfumes */}
              {product.category !== 'Fragrances' && getCurrentOriginalPrice() && typeof getCurrentOriginalPrice() === 'number' && getCurrentPrice() && typeof getCurrentPrice() === 'number' && getCurrentOriginalPrice() > getCurrentPrice() && (
                <div className="mb-6">
                  <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg text-lg font-medium">
                    🎉 Save Rs. {(getCurrentOriginalPrice() - getCurrentPrice()).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-black mb-4">
                {product.category === 'Fragrances' ? 'Select Variant' : 'Select Size'}
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {product.category === 'Fragrances' && product.sizes && Array.isArray(product.sizes) ? (
                  // For perfumes, show size with pricing - reordered: 10ml, 30ml, 50ml
                  (() => {
                    console.log('Product sizes before sorting:', product.sizes);
                    const sortedSizes = [...product.sizes].sort((a, b) => {
                      // Sort sizes: 10ml first, then 30ml, then 50ml
                      const sizeOrder = { '10ml': 1, '30ml': 2, '50ml': 3 };
                      return (sizeOrder[a.size] || 0) - (sizeOrder[b.size] || 0);
                    });
                    console.log('Product sizes after sorting:', sortedSizes);
                    
                    return sortedSizes.map((sizeObj, index) => {
                      // Safety check to ensure sizeObj has required properties
                      if (!sizeObj || typeof sizeObj !== 'object') {
                        console.log('Invalid sizeObj:', sizeObj);
                        return null;
                      }
                      
                      // Additional safety check for required properties
                      if (!sizeObj.size || !sizeObj.price) {
                        console.log('SizeObj missing required properties:', sizeObj);
                        return null;
                      }
                      
                      // Debug logging for each size object
                      console.log('Rendering sizeObj:', sizeObj);
                      console.log('sizeObj.size:', sizeObj.size);
                      console.log('sizeObj.price:', sizeObj.price);
                      console.log('sizeObj type:', typeof sizeObj);
                      console.log('sizeObj keys:', Object.keys(sizeObj));
                      
                                          return (
                      <button
                        key={`size-${String(sizeObj.size) || index}`}
                        onClick={() => setSelectedSize(String(sizeObj.size))}
                        disabled={!product.inStock}
                        className={`p-2 sm:p-4 border-2 rounded-lg text-center transition-all ${selectedSize === String(sizeObj.size)
                          ? 'border-black bg-black text-white'
                          : product.inStock
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                          }`}
                      >
                        <div className="font-medium">{String(sizeObj.size || 'N/A')}</div>
                      </button>
                    );
                    });
                  })()
                ) : product.sizes && Array.isArray(product.sizes) ? (
                  // For clothing, show standard sizes
                  product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!product.inStock}
                      className={`p-2 sm:p-4 border-2 rounded-lg text-center transition-all ${selectedSize === size
                        ? 'border-black bg-black text-white'
                        : product.inStock
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                        }`}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  // Fallback when no sizes are available
                  <div className="col-span-3 text-center py-4 text-gray-500">
                    No sizes available for this product
                  </div>
                )}
              </div>
            </div>



            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className={`w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center transition-all ${product.inStock
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'bg-gray-100 cursor-not-allowed opacity-50'
                    }`}
                >
                  -
                </button>
                <span className="text-lg font-medium w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className={`w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center transition-all ${product.inStock
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'bg-gray-100 cursor-not-allowed opacity-50'
                    }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {product.inStock ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 px-6 border-2 border-black text-black font-medium rounded-xl hover:bg-black hover:text-white transition-colors"
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <div className="w-full py-4 px-6 bg-red-500 text-white font-medium rounded-xl text-center">
                  Sold Out
                </div>
              )}
            </div>

            {/* Product Features */}
            {product.features && Array.isArray(product.features) && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">{String(feature || 'N/A')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fragrance Notes for Fragrances */}
            {product.category === 'Fragrances' && product.notes && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Fragrance Notes</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-800">Top Notes: </span>
                    <span className="text-gray-600">
                      {Array.isArray(product.notes.top) ? product.notes.top.join(', ') : String(product.notes.top || 'N/A')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Heart Notes: </span>
                    <span className="text-gray-600">
                      {Array.isArray(product.notes.heart) ? product.notes.heart.join(', ') : String(product.notes.heart || 'N/A')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Base Notes: </span>
                    <span className="text-gray-600">
                      {Array.isArray(product.notes.base) ? product.notes.base.join(', ') : String(product.notes.base || 'N/A')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Fabric Information for Clothing */}
            {product.category === 'Clothes' && product.fabric && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Fabric</h3>
                <p className="text-gray-600">{product.fabric}</p>
              </div>
            )}

            {/* Care Instructions for Clothing */}
            {product.category === 'Clothes' && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Care Instructions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-600">Machine wash cold with similar colors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-600">Do not bleach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-600">Tumble dry on low or hang dry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-600">Iron inside out on low heat (avoid direct contact with print)</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 py-16 md:py-20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-black mb-6">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing you with the best shopping experience
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {/* Free Shipping */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free shipping on all orders</p>
              </div>

              {/* 7 Days Replacement */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">7 Days Replacement</h3>
                <p className="text-gray-600">Easy returns and replacements within 7 days</p>
              </div>

              {/* 24 Hours Support */}
              {/* <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">24 Hours Support</h3>
                <p className="text-gray-600">Round the clock customer support available</p>
              </div> */}

              {/* Cash on Delivery */}
              {/* <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Cash on Delivery</h3>
                <p className="text-gray-600">Pay when you receive your order</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal - Only for clothing */}
      {isSizeGuideOpen && product.category === 'Clothes' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-medium text-black">Size Guide</h2>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Check if this product should show both shirt and shorts size charts (Volume II) */}
              {(product.id === 1 || product.id === 2) ? (
                // Show both shirt and shorts size charts for Volume II products (Satin Regent Co-ord and Shamray Estate Co-ord)
                <div className="space-y-8">
                  {/* Shirt Size Chart */}
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Shirt Size Chart</h3>
                    
                    {/* Shirt Size Chart Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">SIZE</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">LENGTH</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">CHEST</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">SLEEVES</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">SHOULDER</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">M</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">30</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">21</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">6</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">16</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">L</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">32</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">24</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">7</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">18</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">XL</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">34</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">26</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">8</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">19</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Shirt Chart Information */}
                    <div className="mt-6 space-y-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-black">FOR SHIRT</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-black">SOCH</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-black">SIZE IN CENTIMETER</p>
                      </div>
                    </div>
                  </div>

                  {/* Shorts Size Chart */}
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Shorts Size Chart</h3>
                    
                    {/* Shorts Size Chart Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">SIZE</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">LENGTH</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">WAIST</th>
                            <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">BOTTOM WIDTH</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">M</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">22</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">34</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">7</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">L</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">24</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">36</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">8</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">XL</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">26</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">38</td>
                            <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">9</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Shorts Chart Information */}
                    <div className="mt-6 space-y-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-black">FOR SHORTS</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-black">SOCH</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-black">SIZE IN CENTIMETER</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (product.id === 4 || product.id === 5) ? (
                // Show shirt size chart for Volume I products (Afsanay and Raah-e-Manzil)
                <div>
                  <h3 className="text-lg font-medium text-black mb-3">Size Chart</h3>
                  
                  {/* Size Chart Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">SIZE</th>
                          <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">CHEST</th>
                          <th className="border border-gray-300 py-3 px-4 font-bold text-black text-center">LENGTH</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">S</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">20</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">27</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">M</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">21</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">28</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">L</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">22</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">29</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 py-3 px-4 font-medium text-black text-center">XL</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">23</td>
                          <td className="border border-gray-300 py-3 px-4 text-gray-600 text-center">30</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Chart Information */}
                  <div className="mt-6 space-y-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-black">FOR SHIRT</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-black">SIZE IN CENTIMETER</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Show custom size guide for other clothing products
                <>
                  {/* How to Measure */}
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">How to Measure</h3>
                    <ul className="space-y-2">
                      {sizeGuideData.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Size Chart */}
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Size Chart</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-4 font-medium text-black">Size</th>
                            <th className="text-left py-2 px-4 font-medium text-black">Chest</th>
                            <th className="text-left py-2 px-4 font-medium text-black">Waist</th>
                            <th className="text-left py-2 px-4 font-medium text-black">Hips</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuideData.measurements.map((measurement, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="py-2 px-4 font-medium text-black">{measurement.size}</td>
                              <td className="py-2 px-4 text-gray-600">{measurement.chest}</td>
                              <td className="py-2 px-4 text-gray-600">{measurement.waist}</td>
                              <td className="py-2 px-4 text-gray-600">{measurement.hips}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <h3 className="text-lg font-medium text-black mb-3">Tips</h3>
                    <p className="text-gray-600">
                      If you're between sizes, we recommend sizing up for a more comfortable fit.
                      All measurements are in inches. For the most accurate fit, have someone help you measure.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-full py-3 px-6 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
