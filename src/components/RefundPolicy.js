import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RefundPolicy = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
      {/* Header with Back to Home button */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-black mb-6">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for shopping with Qaflah! We want you to be completely satisfied with your purchase.
          </p>
        </div>

        {/* Policy Content */}
        <div className={`space-y-8 md:space-y-12 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          
          {/* Introduction */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl">
            <p className="text-gray-700 leading-relaxed">
              If your items don't meet your expectations, we offer a straightforward return and exchange policy to ensure a hassle-free shopping experience.
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
                <a href="mailto:return@qaflah.com" className="text-black font-medium hover:underline">
                  return@qaflah.com
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
                <a href="mailto:exchange@qaflah.com" className="text-black font-medium hover:underline">
                  exchange@qaflah.com
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
                <a href="mailto:qaflahofficial@gmail.com" className="text-black font-medium hover:underline">
                  qaflahofficial@gmail.com
                </a>{' '}
                with photos of the item and a description of the issue.
              </p>
              <p>
                We will resolve the issue by providing a replacement or refund.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl text-center">
            <p className="text-gray-700 leading-relaxed">
              Thank you for choosing Qaflah. We value your business and look forward to providing you with exceptional service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
