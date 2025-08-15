import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';

const BestSelling = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([false, false]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  
  // Get next 2 products as best selling products
  const bestSellingProducts = productsData.slice(2, 4);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            } else {
              const index = cardRefs.current.indexOf(entry.target);
              if (index !== -1) {
                setVisibleCards(prev => {
                  const newCards = [...prev];
                  newCards[index] = true;
                  return newCards;
                });
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((cardRef) => {
      if (cardRef) {
        observer.observe(cardRef);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className={`text-2xl md:text-4xl font-serif font-medium text-gray-600 mb-12 md:mb-16 text-center transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Best Selling
        </h2>
        
        <div className="grid grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {bestSellingProducts.map((product, index) => (
            <div 
              key={product.id} 
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group transition-all duration-1000 ease-out transform ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden cursor-pointer rounded-2xl" onClick={() => handleProductClick(product.id)}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-6 right-6">
                  <span className="text-sm md:text-base font-medium bg-white/90 text-black px-4 py-2 rounded-xl backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
                {product.discount > 0 && (
                  <div className="absolute top-6 left-6">
                    <span className="text-sm md:text-base font-medium bg-red-500 text-white px-3 py-1 rounded-lg">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 md:mt-6 text-center">
                <h3 className="text-xl md:text-2xl font-serif font-medium text-black mb-3 md:mb-4">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-2xl md:text-3xl font-serif font-medium text-black">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                </div>
                {/* <div className="flex gap-4">
                  <button className="flex-1 py-3 md:py-4 px-6 bg-black text-white font-sans font-medium rounded-xl hover:bg-gray-800 transition-colors duration-200">
                    Add to Cart
                  </button>
                  <button className="flex-1 py-3 md:py-4 px-6 bg-white border-2 border-black text-black font-sans font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    Quick View
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
