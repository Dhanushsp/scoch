import React from 'react';

const ReturnPolicy = () => {
  return (
    <section className="py-16 bg-soft-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title">Return Policy</h2>
        
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-text-light leading-relaxed mb-6">
              We want you to love your purchase. If you're not completely satisfied with your order, 
              you can return it within 30 days of delivery for a full refund or exchange.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">30 Days</h3>
                <p className="text-sm text-text-light">Return window</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">Free Returns</h3>
                <p className="text-sm text-text-light">No restocking fees</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">Easy Process</h3>
                <p className="text-sm text-text-light">Simple returns</p>
              </div>
            </div>
            
            <button className="btn-primary">
              Learn More About Returns
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;
