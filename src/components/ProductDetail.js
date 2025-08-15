import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZoomIn, Truck, Package, Ruler, Star, ArrowLeft, Clock, CreditCard } from 'lucide-react';
import productsData from '../data/products.json';
import { useCart } from '../contexts/CartContext';

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
      price: product.price,
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
      price: product.price,
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

      {/* Size Guide Button */}
      <div className="absolute top-20 right-4 z-10">
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Ruler className="w-4 h-4" />
          <span className="text-sm font-medium">Size Guide</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white" />
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
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
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Brand and Name */}
            <div className="text-center lg:text-left">
              <p className="text-lg text-gray-600 font-medium mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-black mb-4">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <span className="text-3xl md:text-4xl font-serif font-medium text-black">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-lg bg-red-500 text-white px-3 py-1 rounded-lg">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                <h3 className="text-lg font-medium text-black">Size</h3>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-medium text-black mb-4">Color</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-black hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-medium text-black mb-4">Quantity</h3>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-medium text-black w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-6 bg-white border-2 border-black text-black font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Description */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-medium text-black mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-medium text-black mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center justify-center lg:justify-start">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-black mb-4">
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

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
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
