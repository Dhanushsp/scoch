import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import productsData from '../data/products.json';
import { getFirstProductImageById } from '../utils/imageUtils';

const BestSelling = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Get best selling products (all Volume I products)
  const bestSellingProducts = productsData.filter(product => product.subCategory === "Volume I");

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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getDisplayPrice = (product) => {
    if (product.category === 'Perfumes' && product.sizes && product.sizes.length > 0) {
      // For perfumes, show the lowest price
      const lowestPrice = Math.min(...product.sizes.map(s => s.price));
      return lowestPrice;
    }
    return product.price;
  };

  const getDisplayOriginalPrice = (product) => {
    if (product.category === 'Perfumes' && product.sizes && product.sizes.length > 0) {
      // For perfumes, show the lowest original price
      const lowestOriginalPrice = Math.min(...product.sizes.map(s => s.originalPrice));
      return lowestOriginalPrice;
    }
    return product.originalPrice;
  };

  const getDisplayDiscount = (product) => {
    const currentPrice = getDisplayPrice(product);
    const currentOriginalPrice = getDisplayOriginalPrice(product);
    if (currentOriginalPrice && currentPrice) {
      return Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);
    }
    return product.discount;
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-600 mb-6">
            Best Selling
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Our most loved and highly rated products
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {bestSellingProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-2xl mb-6 group cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <img
                  src={getFirstProductImageById(product.id)}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Discount Badge */}
                {getDisplayDiscount(product) > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {getDisplayDiscount(product)}% OFF
                  </div>
                )}
                
                {/* Sold Out Badge */}
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sold Out
                  </div>
                  )}
                
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Eye className="w-5 h-5 text-black" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-black" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-black mb-3 group-hover:text-gray-700 transition-colors cursor-pointer" onClick={() => handleProductClick(product.id)}>
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-2xl font-bold text-black">
                    Rs. {getDisplayPrice(product).toLocaleString()}
                  </span>
                  {getDisplayOriginalPrice(product) && getDisplayOriginalPrice(product) > getDisplayPrice(product) && (
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {getDisplayOriginalPrice(product).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Category Badge */}
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.category}
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
