import React, { useEffect, useState, useRef } from 'react';

const ReturnPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState([false, false, false, false, false]);
  const sectionRef = useRef(null);
  const elementRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            } else {
              const index = elementRefs.current.indexOf(entry.target);
              if (index !== -1) {
                setVisibleElements(prev => {
                  const newElements = [...prev];
                  newElements[index] = true;
                  return newElements;
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

    elementRefs.current.forEach((elementRef) => {
      if (elementRef) {
        observer.observe(elementRef);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-black mb-16 md:mb-20 text-center transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Return Policy
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <p className={`text-lg md:text-xl text-gray-600 leading-relaxed mb-8 md:mb-12 font-sans transition-all duration-1000 ease-out delay-200 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              We want you to love your purchase. If you're not completely satisfied with your order, 
              you can return it within 30 days of delivery for a full refund or exchange.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
              <div 
                ref={(el) => (elementRefs.current[0] = el)}
                className={`text-center transition-all duration-1000 ease-out transform ${
                  visibleElements[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif font-medium text-black mb-3 md:mb-4 text-lg md:text-xl">30 Days</h3>
                <p className="text-base md:text-lg text-gray-600 font-sans">Return window</p>
              </div>
              
              <div 
                ref={(el) => (elementRefs.current[1] = el)}
                className={`text-center transition-all duration-1000 ease-out transform ${
                  visibleElements[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-serif font-medium text-black mb-3 md:mb-4 text-lg md:text-xl">Free Returns</h3>
                <p className="text-base md:text-lg text-gray-600 font-sans">No restocking fees</p>
              </div>
              
              <div 
                ref={(el) => (elementRefs.current[2] = el)}
                className={`text-center transition-all duration-1000 ease-out transform ${
                  visibleElements[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-serif font-medium text-black mb-3 md:mb-4 text-lg md:text-xl">Easy Process</h3>
                <p className="text-base md:text-lg text-gray-600 font-sans">Simple returns</p>
              </div>
            </div>
            
            <button className={`py-4 px-8 md:px-10 bg-black text-white font-sans font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 text-base md:text-lg transition-all duration-1000 ease-out delay-750 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Learn More About Returns
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;
