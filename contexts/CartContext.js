import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
    // Automatically open cart when item is added
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (itemId, size, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.size === size ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === itemId && item.size === size))
    );
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    handleCartClick,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
