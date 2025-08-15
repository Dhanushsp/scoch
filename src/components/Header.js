import React from 'react';
import { ShoppingCart } from 'lucide-react';
import logo from '../assets/logo.png';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { cartItems, handleCartClick } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

          {/* Cart Icon on the right */}
          <div className="flex-1 flex justify-end">
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
    </header>
  );
};

export default Header;
