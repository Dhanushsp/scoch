import React, { useEffect, useState } from 'react';
import banner from '../assets/banner.jpg'

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-white text-black overflow-hidden ">
      {/* Content */}
      <div className="relative z-10  ">
        <div className="text-center">
          <a href='#' className={`block mb-8 md:mb-12 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <img 
              src={banner} 
              className='w-full  shadow-lg hover:shadow-xl transition-all duration-500' 
              alt="Banner"
            />
          </a>
          <p className={`text-xl md:text-5xl my-6 md:my-8 max-w-4xl mx-auto text-black font-serif leading-tight font-medium transition-all duration-1000 ease-out delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className='italic'>Promoting Art through <span>Trend & Stitch</span></span>
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Banner;
