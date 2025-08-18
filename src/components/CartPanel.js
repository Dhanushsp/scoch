import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPanel = () => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, closeCart, updateCartItemQuantity, removeFromCart } = useCart();
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateCartItemQuantity(itemId, size, newQuantity);
    }
  };

  const handleRemoveItem = (itemId, size) => {
    removeFromCart(itemId, size);
  };

  const handleCheckout = () => {
    // Navigate to checkout page with cart items
    navigate('/checkout');
    closeCart(); // Close cart panel when navigating to checkout
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
          onClick={closeCart}
        ></div>
      )}
      
      {/* Cart Panel */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-serif font-bold text-primary">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 text-text-dark hover:text-primary transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-text-dark mb-2">Your cart is empty</h3>
                <p className="text-text-light">Start shopping to add items to your cart</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <img
                      src={item.image || '/src/assets/logo.png'}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg flex-shrink-0 bg-gray-50"
                      onError={(e) => {
                        e.target.src = '/src/assets/logo.png';
                        e.target.onerror = null; // Prevent infinite loop
                      }}
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-dark text-sm leading-tight mb-1">
                        {item.name}
                      </h4>
                      <div className="text-xs text-text-light mb-2">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span> • </span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <p className="text-primary font-semibold text-sm">
                        Rs. {item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-text-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary and Actions */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 my-5 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-text-dark">Total:</span>
                <span className="text-xl font-bold text-primary">
                  Rs. {calculateTotal().toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={closeCart}
                className="w-full text-primary hover:text-primary-dark transition-colors duration-200 font-medium py-2"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPanel;
