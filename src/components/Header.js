import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = ({ cartItems, onCartClick }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-primary shadow-sm border-b border-primary-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold text-soft-white">
                SOCH
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#clothes"
                className="text-soft-white/90 hover:text-soft-white transition-colors duration-200 font-medium"
              >
                Clothes
              </a>
              <a
                href="#perfumes"
                className="text-soft-white/90 hover:text-soft-white transition-colors duration-200 font-medium"
              >
                Perfumes
              </a>
              <a
                href="#accessories"
                className="text-soft-white/90 hover:text-soft-white transition-colors duration-200 font-medium"
              >
                Accessories
              </a>
            </nav>

            {/* Cart Icon and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onCartClick}
                className="relative p-2 text-soft-white/90 hover:text-soft-white transition-colors duration-200"
                title="View Cart"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={toggleSideNav}
                className="md:hidden p-2 text-soft-white/90 hover:text-soft-white transition-colors duration-200"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Navigation */}
      <div className={`fixed inset-0 z-50 md:hidden ${isSideNavOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300"
          onClick={toggleSideNav}
        ></div>

        {/* Side Navigation Panel */}
        <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${isSideNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-serif font-bold text-primary">Menu</h2>
            <button
              onClick={toggleSideNav}
              className="p-2 text-text-dark hover:text-primary transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="p-6 space-y-4">
            <a
              href="#clothes"
              className="block text-text-dark hover:text-primary transition-colors duration-200 font-medium text-lg py-3 border-b border-gray-100"
              onClick={toggleSideNav}
            >
              Clothes
            </a>
            <a
              href="#perfumes"
              className="block text-text-dark hover:text-primary transition-colors duration-200 font-medium text-lg py-3 border-b border-gray-100"
              onClick={toggleSideNav}
            >
              Perfumes
            </a>
            <a
              href="#accessories"
              className="block text-text-dark hover:text-primary transition-colors duration-200 font-medium text-lg py-3 border-b border-gray-100"
              onClick={toggleSideNav}
            >
              Accessories
            </a>
            <a
              href="#sale"
              className="block text-text-dark hover:text-primary transition-colors duration-200 font-medium text-lg py-3 border-b border-gray-100"
              onClick={toggleSideNav}
            >
              Sale
            </a>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <button className="p-2 text-text-dark hover:text-primary transition-colors duration-200">
                <ShoppingCart size={24} />
              </button>
              <span className="text-text-dark font-medium">Cart (0)</span>
            </div>
            <button className="btn-primary w-full">
              View Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
