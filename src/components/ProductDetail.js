import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZoomIn, Truck, Package, Ruler, Star, ArrowLeft, Clock, CreditCard } from 'lucide-react';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';
import { getProductImagesById } from '../utils/imageUtils';

// Size chart image paths for specific products
const SIZE_CHART_IMAGES = {
  'Raah-e-Manzil': '/src/assets/Volume I/Raah-e-manzil/size-chart.jpg',
  'Afsanay': '/src/assets/Volume I/Afsanay/size-chart.jpg'
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Find product from universal data
  const product = productsData.find(p => p.id === parseInt(id));

  // Get current price based on selected size (for perfumes)
  const getCurrentPrice = () => {
    if (product.category === 'Perfumes' && selectedSize && product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === selectedSize);
      return sizeObj ? sizeObj.price : product.price;
    }
    return product.price;
  };

  // Get current original price based on selected size (for perfumes)
  const getCurrentOriginalPrice = () => {
    if (product.category === 'Perfumes' && selectedSize && product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === selectedSize);
      return sizeObj ? sizeObj.originalPrice : product.originalPrice;
    }
    return product.originalPrice;
  };

  // Get current discount based on selected size (for perfumes)
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
      if (sizeObj && sizeObj.image) {
        // If size has a specific image, use it
        return sizeObj.image;
      }
    }
    
    // For fragrances, use the imported images from productImages.js
    if (product.category === 'Fragrances') {
      const fragranceImages = getProductImagesById(product.id);
      console.log('Fragrance images for product', product.id, ':', fragranceImages);
      if (fragranceImages && fragranceImages.length > 0) {
        return fragranceImages[currentImageIndex] || fragranceImages[0];
      }
    }
    
    // Default to the first product image
    return getProductImagesById(product.id)[currentImageIndex] || getProductImagesById(product.id)[0];
  };

  // Get size chart image for specific products
  const getSizeChartImage = () => {
    return SIZE_CHART_IMAGES[product.name] || null;
  };

  // Handle size selection for fragrances and clothing
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    // Reset image index to 0 when size changes for fragrances
    if (product.category === 'Fragrances') {
      setCurrentImageIndex(0);
    }
  };

  // Size guide data - use product's specific size chart if available, otherwise use generic
  const sizeGuideData = product.sizeChart ? {
    measurements: Object.entries(product.sizeChart).map(([size, measurements]) => ({
      size,
      shirt: measurements.shirt,
      shorts: measurements.shorts
    })),
    instructions: [
      'Chest: Measure around the fullest part of your chest',
      'Length: Measure from shoulder to desired length',
      'Sleeves: Measure sleeve length from shoulder to end',
      'Sleeves Width: Measure around the fullest part of sleeve',
      'Shoulder: Measure across the back from shoulder to shoulder',
      'Waist: Measure around your natural waistline',
      'Bottom Width: Measure the width at the bottom of shorts',
      'Use a flexible measuring tape for accurate results',
      'Keep the tape snug but not tight'
    ]
  } : {
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

  // Auto-select first size for fragrances when component loads
  useEffect(() => {
    if (product.category === 'Fragrances' && product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product, selectedSize]);

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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    
    // Create cart item with all necessary information
    const cartItem = {
      id: product.id,
      name: product.name,
      price: getCurrentPrice(),
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };
    
    // Add to cart using context
    addToCart(cartItem);
    
    // Show success message
    alert('Product added to cart successfully!');
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }

    // Create cart item with all necessary information
    const cartItem = {
      id: product.id,
      name: product.name,
      price: getCurrentPrice(),
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
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
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white" />
              </div>
              
              {/* Size Label for Fragrances */}
              {product.category === 'Fragrances' && selectedSize && (
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {selectedSize}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.category === 'Fragrances' && selectedSize ? (
                // For fragrances with selected size, show size-specific image
                <button
                  className="w-20 h-20 rounded-lg overflow-hidden border-2 border-black transition-all"
                >
                  <img
                    src={getCurrentImage()}
                    alt={`${product.name} ${selectedSize}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ) : (
                // For clothing or fragrances without size selection, show all product images
                (() => {
                  const images = getProductImagesById(product.id);
                  if (product.category === 'Fragrances' && images && images.length > 0) {
                    // For fragrances, show all available images as thumbnails
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
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ));
                  } else {
                    // For clothing or other products, show all product images
                    return getProductImagesById(product.id).map((image, index) => (
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
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ));
                  }
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
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>
              
              {/* Price Display */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  Rs. {getCurrentPrice().toLocaleString()}
                </span>
                {getCurrentOriginalPrice() && getCurrentOriginalPrice() > getCurrentPrice() && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      Rs. {getCurrentOriginalPrice().toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {getCurrentDiscount()}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-black mb-4">
                {product.category === 'Fragrances' ? 'Select Size' : 'Select Size'}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {product.category === 'Fragrances' && product.sizes ? (
                  // For fragrances, show size with pricing
                  product.sizes.map((sizeObj) => (
                    <button
                      key={sizeObj.size}
                      onClick={() => handleSizeSelection(sizeObj.size)}
                      disabled={!product.inStock}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        selectedSize === sizeObj.size
                          ? 'border-black bg-black text-white'
                          : product.inStock 
                            ? 'border-gray-200 hover:border-gray-300' 
                            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="font-medium">{sizeObj.size}</div>
                      <div className="text-sm">
                        Rs. {getCurrentPrice().toLocaleString()}
                      </div>
                      {getCurrentOriginalPrice() && getCurrentOriginalPrice() > getCurrentPrice() && (
                        <div className="text-xs line-through opacity-75">
                          Rs. {getCurrentOriginalPrice().toLocaleString()}
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  // For clothing, show standard sizes
                  product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelection(size)}
                      disabled={!product.inStock}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : product.inStock 
                            ? 'border-gray-200 hover:border-gray-300' 
                            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Select Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 border-2 rounded-lg transition-all ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : product.inStock 
                          ? 'border-gray-200 hover:border-gray-300' 
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  className={`w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center transition-all ${
                    product.inStock 
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
                  className={`w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center transition-all ${
                    product.inStock 
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
            {product.features && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fragrance Notes for Perfumes */}
            {product.category === 'Perfumes' && product.notes && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Fragrance Notes</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-800">Top Notes: </span>
                    <span className="text-gray-600">{product.notes.top.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Heart Notes: </span>
                    <span className="text-gray-600">{product.notes.heart.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Base Notes: </span>
                    <span className="text-gray-600">{product.notes.base.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Fabric Information for Clothing */}
            {product.category === 'Clothes' && product.fabric && (
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Fabric & Care</h3>
                <p className="text-gray-600">{product.fabric}</p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {/* Free Shipping */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free shipping on all orders above $50</p>
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
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">24 Hours Support</h3>
                <p className="text-gray-600">Round the clock customer support available</p>
              </div>

              {/* Cash on Delivery */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Cash on Delivery</h3>
                <p className="text-gray-600">Pay when you receive your order</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal - Only for clothing */}
      {isSizeGuideOpen && product.category === 'Clothes' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-black">Size Guide</h2>
                  <p className="text-sm text-gray-600 mt-1">Size guide for {product.name}</p>
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Check if product has a size chart image */}
              {getSizeChartImage() ? (
                // Show size chart image for specific products
                <div className="text-center">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-black mb-3">Size Chart</h3>
                    <p className="text-gray-600 mb-4">
                      Below is the size chart for {product.name}. Use this guide to find your perfect fit.
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <img
                      src={getSizeChartImage()}
                      alt={`Size Chart for ${product.name}`}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '70vh' }}
                    />
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-black mb-2">How to Use This Size Chart</h4>
                    <ul className="text-sm text-gray-600 space-y-1 text-left max-w-md mx-auto">
                      <li>• Measure your chest, waist, and hips</li>
                      <li>• Compare your measurements with the chart</li>
                      <li>• Choose the size that best fits your measurements</li>
                      <li>• If between sizes, we recommend sizing up</li>
                    </ul>
                  </div>
                </div>
              ) : (
                // Show custom size guide for other products
                <div className="space-y-6">
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
                    {product.sizeChart && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          📏 <strong>Product-Specific Measurements:</strong> Below are the exact measurements for {product.name}
                        </p>
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      {product.sizeChart ? (
                        // Product-specific size chart
                        <div className="space-y-6">
                          {sizeGuideData.measurements.map((measurement, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-black mb-3 text-center">Size {measurement.size}</h4>
                              
                              {/* Shirt Measurements */}
                              <div className="mb-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Shirt</h5>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Chest:</span>
                                    <span className="font-medium">{measurement.shirt.chest}"</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Length:</span>
                                    <span className="font-medium">{measurement.shirt.length}"</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Sleeves:</span>
                                    <span className="font-medium">{measurement.shirt.sleeves}"</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Sleeves Width:</span>
                                    <span className="font-medium">{measurement.shirt.sleevesWidth}"</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Shoulder:</span>
                                    <span className="font-medium">{measurement.shirt.shoulder}"</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Shorts Measurements */}
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Shorts</h5>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Length:</span>
                                    <span className="font-medium">{measurement.shorts.length}"</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Waist:</span>
                                    <span className="font-medium">{measurement.shorts.waist}"</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Bottom Width:</span>
                                    <span className="font-medium">{measurement.shorts.bottomWidth}"</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Generic size chart fallback
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
                                <td className="px-4 text-gray-600">{measurement.waist}</td>
                                <td className="px-4 text-gray-600">{measurement.hips}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
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
                </div>
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
