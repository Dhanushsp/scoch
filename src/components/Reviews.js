import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-600 mb-6">
            Customer Reviews
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
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
                {/* Customer Image and Info */}
                <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                  <div className="relative mb-6">
                    <img
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].name}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-black mb-3">
                    {reviews[currentReview].name}
                  </h3>
                  
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star
                          key={i}
                        className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="text-center mb-8 md:mb-12">
                  <blockquote className="text-lg md:text-xl text-gray-600 leading-relaxed italic">
                    "{reviews[currentReview].review}"
                  </blockquote>
                </div>

                {/* Review Image Section */}
                <div className="text-center">
                  <div className="inline-block">
                    <div className="relative group">
                      <img
                        src={reviews[currentReview].reviewImage}
                        alt={`${reviews[currentReview].name}'s review`}
                        className="w-full h-48 sm:h-56 md:h-64 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-lg border border-gray-100 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-3 font-medium">
                      {reviews[currentReview].name}'s Experience
                    </p>
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
    </section>
  );
};

export default Reviews;
