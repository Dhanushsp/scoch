import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShippingPolicy = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className={`transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-black mb-6">
              Shipping Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Thank you for choosing SOCH! We're committed to providing a great shopping experience.
            </p>
          </div>

          {/* Policy Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="space-y-8">
                {/* Processing Time */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Processing Time
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We typically process orders within 1-3 business days. During peak periods and holidays, processing may take a bit longer. If there's a delay, we'll notify you via email.
                  </p>
                </div>

                {/* Shipping Methods */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Shipping Methods
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We offer standard shipping, which takes 3-7 business days, and express shipping, which takes 1-2 business days. Delivery times may vary based on your location and the carrier.
                  </p>
                </div>

                {/* Shipping Fees */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Shipping Fees
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Standard shipping is free on all orders. Express shipping is available for an additional fee.
                  </p>
                </div>

                {/* Order Tracking */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Order Tracking
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    After your order ships, you'll receive an email with tracking information. Use the link in the email to track your package.
                  </p>
                </div>

                {/* International Shipping */}
                {/* <div className="pb-6">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    International Shipping
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We ship to select international destinations. International orders may incur customs fees, import taxes, or other charges, which are the customer's responsibility. For more details, contact your local customs office.
                  </p>
                </div> */}

                {/* Closing Statement */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-center italic">
                    We appreciate your business and are dedicated to providing exceptional service. Thank you for shopping with SOCH!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="bg-black text-white rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-serif font-medium mb-4">
                Questions About Shipping?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                If you have any questions about our shipping policy or need assistance with your order, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>muhibaamir2004@gmail.com</span>
                </div>
                {/* <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Pakistan</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
