import React, { useEffect, useRef, useState } from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import { getFirstProductImageById, getProductImagesById } from '../utils/imageUtils';

const Perfumes = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'men', 'women'

  // Get all fragrance products
  const allPerfumeProducts = productsData.filter(product => 
    product.category === "Fragrances"
  );

  // Filter products based on active filter
  const perfumeProducts = allPerfumeProducts.filter(product => {
    if (activeFilter === 'all') return true;
    return product.subCategory === activeFilter;
  });

  // Helper functions for dynamic pricing
  const getDisplayPrice = (product) => {
    if (product.category === 'Fragrances' && product.sizes && product.sizes.length > 0) {
      // For fragrances, show the 10ml price (lowest price)
      const sortedSizes = [...product.sizes].sort((a, b) => {
        const sizeOrder = { '10ml': 1, '30ml': 2, '50ml': 3 };
        return (sizeOrder[a.size] || 0) - (sizeOrder[b.size] || 0);
      });
      return sortedSizes[0].price; // Return 10ml price
    }
    return product.price;
  };

  const getDisplayOriginalPrice = (product) => {
    if (product.category === 'Fragrances' && product.sizes && product.sizes.length > 0) {
      // For fragrances, show the 10ml original price (lowest original price)
      const sortedSizes = [...product.sizes].sort((a, b) => {
        const sizeOrder = { '10ml': 1, '30ml': 2, '50ml': 3 };
        return (sizeOrder[a.size] || 0) - (sizeOrder[b.size] || 0);
      });
      return sortedSizes[0].originalPrice; // Return 10ml original price
    }
    return product.originalPrice;
  };

  const getDisplayDiscount = (product) => {
    if (product.category === 'Fragrances' && product.sizes && product.sizes.length > 0) {
      const size = product.sizes[0];
      if (size.originalPrice > size.price) {
        return Math.round(((size.originalPrice - size.price) / size.originalPrice) * 100);
        }
      }
    return product.discount || 0;
  };

  // Function to get the 50ml image for display
  const getDisplayImage = (product) => {
    if (product.category === 'Fragrances' && product.sizes && product.sizes.length > 0) {
      // For fragrances, show the 50ml image (largest size)
      const sortedSizes = [...product.sizes].sort((a, b) => {
        const sizeOrder = { '10ml': 1, '30ml': 2, '50ml': 3 };
        return (sizeOrder[a.size] || 0) - (sizeOrder[b.size] || 0);
      });
      // Return the last image (50ml) from productImages
      const productImages = getProductImagesById(product.id);
      if (productImages && productImages.length > 0) {
        return productImages[productImages.length - 1]; // Return 50ml image
      }
    }
    // Fallback to default image
    return getFirstProductImageById(product.id);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (perfumeProducts.length === 0) {
    return null; // Don't render if no perfumes
  }

  return (
    <section ref={sectionRef} data-section="perfumes" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-lg md:text-xl font-serif font-medium text-gray-600 mb-6">
            Fragrances
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            Discover our exclusive collection of luxury fragrances
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="flex space-x-2 md:space-x-4 bg-gray-100 p-1 md:p-2 rounded-xl mb-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-600 hover:text-black hover:bg-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('Men')}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${
                activeFilter === 'Men'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-600 hover:text-black hover:bg-white'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setActiveFilter('Women')}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${
                activeFilter === 'Women'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-600 hover:text-black hover:bg-white'
              }`}
            >
              Women
            </button>
          </div>
          
          {/* Product Count */}
          <p className="text-sm text-gray-500 font-medium">
            {perfumeProducts.length} product{perfumeProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {/* Products Grid */}
        {perfumeProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {perfumeProducts.map((product, index) => (
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
                   src={getDisplayImage(product)}
                   alt={product.name}
                   className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110 mx-auto"
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
                
                {/* Subcategory Badge */}
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {product.subCategory}
                </div>
                
                {/* Size Indicator for Fragrances */}
                {/* {product.category === 'Fragrances' && (
                  <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3 ml-2">
                    50ml Display
                  </div>
                )} */}
                
                                 {/* Price */}
                 <div className="flex flex-col items-center space-y-2 mb-4">
                   {/* Starting from text for fragrances */}
                   {product.category === 'Fragrances' && (
                     <span className="text-sm text-gray-600 font-medium">
                       Starting from
                     </span>
                   )}
                   <div className="flex items-center justify-center space-x-3">
                     <span className="text-2xl font-bold text-black">
                       Rs. {getDisplayPrice(product).toLocaleString()}
                     </span>
                     {getDisplayOriginalPrice(product) && getDisplayOriginalPrice(product) > getDisplayPrice(product) && (
                       <span className="text-lg text-gray-500 line-through">
                         Rs. {getDisplayOriginalPrice(product).toLocaleString()}
                       </span>
                     )}
                   </div>
                 </div>
                 
                 {/* Savings Amount */}
                 {getDisplayOriginalPrice(product) && getDisplayOriginalPrice(product) > getDisplayPrice(product) && (
                   <div className="text-center mb-4">
                     <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                       Save Rs. {(getDisplayOriginalPrice(product) - getDisplayPrice(product)).toLocaleString()}
                     </span>
                   </div>
                 )}



              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 font-medium">
              No fragrances found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Perfumes;
