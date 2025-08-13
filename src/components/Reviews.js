import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      review: "Absolutely love the quality of their clothes! The fabric feels premium and the fit is perfect.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      review: "Best perfume collection I've ever tried. Long-lasting fragrance and elegant packaging.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Davis",
      review: "Exceptional customer service and fast shipping. Will definitely shop here again!",
      rating: 5
    },
    {
      id: 4,
      name: "David Wilson",
      review: "The attention to detail in their products is remarkable. Truly premium quality.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      review: "Found my perfect summer dress here. The design is timeless and elegant.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Customer Reviews</h2>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* Duplicate reviews for seamless scrolling */}
            {[...reviews, ...reviews].map((review, index) => (
                             <div
                 key={`${review.id}-${index}`}
                 className="flex-shrink-0 w-80 md:w-96 mx-4 bg-soft-white rounded-xl p-6 shadow-md border border-gray-100"
               >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-soft-white font-semibold text-lg mr-4">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">{review.name}</h4>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-text-light leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-text-light text-sm">
            Scroll to see more customer experiences
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
