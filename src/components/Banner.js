import React from 'react';

const Banner = () => {
  return (
    <section className="relative bg-black text-primary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Fashion background"
          className="w-full h-full object-cover"
        /> */}
        {/* Mild Overlay */}
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-primary">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-text-light">
            Experience the perfect blend of elegance and contemporary fashion.
            Our curated collection brings you the latest trends with timeless sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Shop Now
            </button>
            <button className="btn-secondary">
              View Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
