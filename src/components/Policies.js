import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Truck, Package, Shield, Clock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Policies = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('shipping'); // 'shipping' or 'refund'
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
        {/* Page Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-black mb-6">
            Policies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about our shipping and refund policies to ensure a great shopping experience.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'shipping'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-600 hover:text-black hover:bg-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Shipping Policy</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('refund')}
              className={`px-6 py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'refund'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-600 hover:text-black hover:bg-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Refund Policy</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '400ms' }}>
          
          {/* Shipping Policy Content */}
          {activeTab === 'shipping' && (
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

                {/* Closing Statement */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-center italic">
                    We appreciate your business and are dedicated to providing exceptional service. Thank you for shopping with SOCH!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Refund Policy Content */}
          {activeTab === 'refund' && (
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    Thank you for shopping with Soch! We want you to be completely satisfied with your purchase. If your items don't meet your expectations, we offer a straightforward return and exchange policy to ensure a hassle-free shopping experience.
                  </p>
                </div>

                {/* Returns Section */}
                <div className="border-l-4 border-black pl-6 md:pl-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Returns
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      If you are not completely satisfied with your purchase, you may return any unworn, unwashed, and unaltered items within 7 days of purchase. All original tags and packaging must be included.
                    </p>
                    <p>
                      To initiate a return, please email our customer service team at{' '}
                      <a href="muhibaamir2004@gmail.com" className="text-black font-medium hover:underline">
                        muhibaamir2004@gmail.com
                      </a>{' '}
                      with your order number and the reason for the return.
                    </p>
                    <p>
                      Once we receive your return, we will process your refund within 5-7 business days. Note that you are responsible for the return shipping charges.
                    </p>
                  </div>
                </div>

                {/* Exchanges Section */}
                <div className="border-l-4 border-black pl-6 md:pl-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Exchanges
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      If you need a different size or color, we're happy to help. To initiate an exchange, please email our customer service team at{' '}
                      <a href="muhibaamir2004@gmail.com" className="text-black font-medium hover:underline">
                        muhibaamir2004@gmail.com
                      </a>{' '}
                      with your order number, the item you want to exchange, and the desired size/color.
                    </p>
                    <p>
                      Send the package back via any courier. Upon receipt and inspection, we will dispatch the replacement item within 7-10 business days.
                    </p>
                    <p>
                      Note that exchanges are only accepted for items that are unworn, unwashed, and unaltered, with all original tags and packaging included. You are responsible for the shipping charges. If the item you want to exchange is out of stock, we will issue you a refund.
                    </p>
                  </div>
                </div>

                {/* Note Section */}
                <div className="bg-yellow-50 border border-yellow-200 p-6 md:p-8 rounded-2xl">
                  <h2 className="text-xl md:text-2xl font-serif font-medium text-black mb-4">
                    Note
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    No exchanges or refunds will be issued for items purchased during a sale event. This policy ensures fairness and consistency in our sales and return processes.
                  </p>
                </div>

                {/* Damaged Items Section */}
                <div className="border-l-4 border-red-500 pl-6 md:pl-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-4">
                    Damaged or Defective Items
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      If your item arrives damaged or defective, please email us immediately at{' '}
                      <a href="mailto:muhibaamir2004@gmail.com" className="text-black font-medium hover:underline">
                        muhibaamir2004@gmail.com
                      </a>{' '}
                      with photos of the item and a description of the issue.
                    </p>
                    <p>
                      We will resolve the issue by providing a replacement or refund.
                    </p>
                  </div>
                </div>

                {/* Closing */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 text-center">
                  <p className="text-gray-700 leading-relaxed">
                    Thank you for choosing Soch. We value your business and look forward to providing you with exceptional service.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="bg-black text-white rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-serif font-medium mb-4">
                Questions About Our Policies?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                If you have any questions about our shipping or refund policies, please don't hesitate to contact us.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
