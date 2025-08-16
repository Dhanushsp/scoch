import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Truck, Package } from 'lucide-react';

// Import review images from assets
import reviewImage1 from '../assets/reviews/1.jpg';
import reviewImage2 from '../assets/reviews/2.jpg';
import reviewImage3 from '../assets/reviews/3.jpg';
import reviewImage4 from '../assets/reviews/4.jpg';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      image: reviewImage1,
      review: "Absolutely love the quality of their clothes! The fabric feels premium and the fit is perfect.",
      reviewImage: reviewImage1
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      image: reviewImage2,
      review: "Best perfume collection I've ever tried. Long-lasting fragrance and elegant packaging.",
      reviewImage: reviewImage2
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      image: reviewImage3,
      review: "Exceptional customer service and fast shipping. Will definitely shop here again!",
      reviewImage: reviewImage3
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 5,
      image: reviewImage4,
      review: "The attention to detail in their products is remarkable. Truly premium quality.",
            reviewImage: reviewImage4
    }
  ];

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

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-lg md:text-xl lg:text-6xl font-serif font-medium text-black mb-6">
            Customer Reviews
          </h2>
          <p className="text-xs md:text-base text-black max-w-2xl mx-auto">
            Discover what our valued customers have to say about their SOCH experience
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={nextReview}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Carousel Content */}
          <div 
            ref={carouselRef}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-2xl"
          >
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Review Content */}
              <div className={`transition-all duration-700 ease-out transform ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                

               
                {/* Review Image Section */}
                <div className="text-center">
                  <div className="inline-block">
                    <div className="relative group">
                      <img
                        src={reviews[currentReview].reviewImage}
                        alt={`${reviews[currentReview].name}'s review`}
                        className="w-auto h-96 sm:h-80 max-w-xs sm:max-w-sm  rounded-2xl shadow-lg border border-gray-100 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 md:mt-12 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-black scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Review Counter */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500 font-medium">
              {currentReview + 1} of {reviews.length}
            </span>
          </div>
        </div>
        
        {/* Bottom Text */}
        <div className={`text-center mt-16 md:mt-20 transition-all duration-1000 ease-out delay-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-gray-500 text-base md:text-lg font-medium">
            Join thousands of satisfied customers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 md:gap-12 my-8 px-4">
                    {/* Free Shipping */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Truck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-base font-medium text-black mb-2">Free Shipping</h3>
                      <p className="text-gray-600 text-sm">Free shipping on all orders above Rs. 5000</p>
                    </div>
      
                    {/* 7 Days Replacement */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-base font-medium text-black mb-2">7 Days Replacement</h3>
                      <p className="text-gray-600 text-sm">Easy returns and replacements within 7 days</p>
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
    </section>
  );
};

export default Reviews;
