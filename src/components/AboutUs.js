import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Award, Truck, Package, Clock, CreditCard } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-2xl font-serif font-medium">About SOCH</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in opacity-0 transition-all duration-1000 ease-out">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-black mb-8">
              About Us – Soch
            </h1>
            <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-700 mb-8">
              Promoting Art through 'Print & Stitch'
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              At Soch, each design tells the story of Pakistan's rich textile heritage, reinterpreted for the modern soul. 
              Proudly Made in Pakistan, every piece is a celebration of meticulous craftsmanship, creative expression, 
              and the contemporary elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Our Essence Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mb-6">
              Our Essence
            </h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            {/* Cultural Roots */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-200">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-black mb-4">
                Cultural Roots, Modern Expression
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tradition isn't just revered—it's reimagined. From block prints to intricate embroideries, 
                our designs merge ancestral techniques with bold, trend-right silhouettes.
              </p>
            </div>

            {/* Crafted with Care */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-400">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-black mb-4">
                Crafted with Care
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our team collaborates with skilled artisans and local craftsmen, weaving legacy into each garment. 
                Quality is never compromised—every stitch, every fabric, every detail resonates with authenticity.
              </p>
            </div>

            {/* Empowerment Through Style */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-600">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-black mb-4">
                Empowerment Through Style
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fashion is more than attire—it's identity. By offering versatile, expressive pieces, 
                we empower women to feel confident, seen, and comfortable in their own narrative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Soch Story Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-200">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mb-8">
              The Soch Story
            </h2>
            <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Launched as a vision to elevate ethnic fashion, Soch blends regional artistry with global sensibilities. 
              Our collections have grown, but our mission remains unchanged: to create attire that bridges past and present—and 
              invites you to tell your own story.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mb-6">
              Our Commitment to You
            </h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Free Shipping */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-200">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders above $50</p>
            </div>

            {/* 7 Days Replacement */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-400">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black mb-2">7 Days Replacement</h3>
              <p className="text-gray-600">Easy returns and replacements within 7 days</p>
            </div>

            {/* 24 Hours Support */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-600">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black mb-2">24 Hours Support</h3>
              <p className="text-gray-600">Round the clock customer support available</p>
            </div>

            {/* Cash on Delivery */}
            <div className="text-center animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-800">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-black mb-2">Cash on Delivery</h3>
              <p className="text-gray-600">Pay when you receive your order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in opacity-0 transition-all duration-1000 ease-out delay-200">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mb-8">
              Get in Touch
            </h2>
            <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about our products or services? We'd love to hear from you.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Explore Our Collection
            </button>
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
