import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { cartItems, handleCartClick } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const handleCategoryClick = (category) => {
    closeSidebar();
    // Scroll to the appropriate section on the homepage
    if (category === 'Volume I') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('[data-section="best-selling"]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (category === 'Volume II') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('[data-section="featured-products"]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (category === 'Drop - I') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('[data-section="drop-one"]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (category === 'Fragrances') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('[data-section="perfumes"]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="bg-primary shadow-sm border-b border-primary-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Spacer for left side */}
          <div className="flex-1"></div>

          {/* Centered Logo */}
          <div className="flex-shrink-0">
            <img src={logo} className='w-24 h-12 md:w-28 md:h-14' alt="Logo" />
          </div>

          {/* Cart Icon and Menu Toggle on the right */}
          <div className="flex-1 flex justify-end items-center space-x-2">
            {/* Menu Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 md:p-3 text-soft-white/90 hover:text-soft-white transition-colors duration-200"
              title="Open Menu"
            >
              <Menu size={24} className="md:w-6 md:h-6" />
            </button>
            
            {/* Cart Icon */}
            <button
              onClick={handleCartClick}
              className="relative p-2 md:p-3 text-soft-white/90 hover:text-soft-white transition-colors duration-200"
              title="View Cart"
            >
              <ShoppingCart size={24} className="md:w-6 md:h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Side Navigation Bar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
        
        {/* Sidebar */}
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-serif font-medium text-black">Menu</h2>
            <button
              onClick={closeSidebar}
              className="p-2 text-gray-500 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="p-6">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleCategoryClick('Volume I')}
                  className="w-full text-left p-4 text-lg font-medium text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  Volume I
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Volume II')}
                  className="w-full text-left p-4 text-lg font-medium text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  Volume II
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Drop - I')}
                  className="w-full text-left p-4 text-lg font-medium text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  Drop - I
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Fragrances')}
                  className="w-full text-left p-4 text-lg font-medium text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  Fragrances
                </button>
              </li>
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>
              
              {/* Additional Menu Items */}
              <li>
                <button
                  onClick={() => {
                    closeSidebar();
                    navigate('/contact');
                  }}
                  className="w-full text-left p-4 text-lg font-medium text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    closeSidebar();
                    navigate('/shipping-policy');
                  }}
                  className="w-full text-left p-4 text-lg font-medium text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                >
                  Shipping & Return Policy
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
