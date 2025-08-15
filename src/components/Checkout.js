import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Lock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, closeCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Web3Forms configuration
  const web3FormsKey = 'b0d6c9a1-3592-495b-8684-61007f23d308'; // Replace with your actual key

  useEffect(() => {
    // Load Web3Forms script
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data for email
      const orderData = {
        access_key: web3FormsKey,
        subject: `New Order from ${formData.firstName} ${formData.lastName}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod: paymentMethod,
        orderDetails: cartItems.map(item => ({
          name: item.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: subtotal.toFixed(2),
        shipping: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        orderDate: new Date().toLocaleString()
      };

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Order placed successfully! You will receive a confirmation email shortly.');
        closeCart();
        navigate('/');
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error placing your order. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-black mb-4">No products in checkout</h1>
          <p className="text-gray-600 mb-6">Please add some products to your cart first.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-black mb-2">Checkout</h1>
              <p className="text-gray-600">Complete your purchase</p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-medium text-black mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                  required
                />
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                  required
                />
              </div>
              <div className="mt-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-medium text-black mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code *"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-medium text-black mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Cash on Delivery</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Credit/Debit Card</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-600">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-black mb-6">Order Summary</h2>
            </div>

            {/* Products */}
            <div className="space-y-4">
              {cartItems.map((product, index) => (
                <div key={`${product.id}-${product.size}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-black">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {product.size} | Color: {product.color}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-black">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-black">Total</span>
                  <span className="text-lg font-medium text-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">Shipping Information</span>
              </div>
              <p className="text-sm text-gray-600">
                Free shipping on All orders. Standard delivery takes 3-5 business days.
              </p>
            </div>

            {/* Return Policy */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Return Policy</span>
              </div>
              <p className="text-sm text-gray-600">
                7-days return policy. Easy returns and exchanges for unused items.
              </p>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 font-medium rounded-xl transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Processing Order...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

