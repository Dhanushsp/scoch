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
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [lastError, setLastError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = 0; // Free shipping for all products
  const total = subtotal + shipping;

  // Web3Forms configuration
  const web3FormsKey = 'b0d6c9a1-3592-495b-8684-61007f23d308'; // Replace with your actual key

  useEffect(() => {
    // Load Web3Forms script
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    document.body.appendChild(script);

    // Network status listeners
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }

      // Cleanup event listeners
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRetry = () => {
    if (lastError) {
      handleSubmit(new Event('submit'));
    }
  };

  const testNetworkConnectivity = async () => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setLastError(null); // Clear previous errors

    try {
      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      // Test API connectivity
      const isApiReachable = await testNetworkConnectivity();
      if (!isApiReachable) {
        throw new Error('Unable to reach the order processing service. Please check your internet connection and try again.');
      }

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
        orderDetails: cartItems.map(item =>
          `${item.name} (Size: ${item.size}, Color: ${item.color}) Quantity: ${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n'),  // 👈 Convert to string
        subtotal: subtotal.toFixed(2),
        shipping: 'Free',
        total: total.toFixed(2),
        orderDate: new Date().toLocaleString()
      };

      // Submit to Web3Forms with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setOrderSuccess(true);
        setLastError(null);
        // Clear all form fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Pakistan'
        });
        // Don't navigate immediately, let user see success message
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);

      let errorMessage = 'There was an error placing your order. Please try again or contact support.';

      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('network error')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('No internet connection')) {
        errorMessage = error.message;
      } else if (error.message.includes('Server error')) {
        errorMessage = 'Server is temporarily unavailable. Please try again in a few minutes.';
      }

      setLastError({ message: errorMessage, originalError: error });
      alert(errorMessage);
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

            {/* Network Status Indicator */}
            {!networkStatus && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">No Internet Connection</span>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Refresh
                  </button>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  Please check your network connection to complete your order.
                </p>
              </div>
            )}

            {/* Error Display and Retry */}
            {lastError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">Order Submission Failed</span>
                  </div>
                  <button
                    onClick={handleRetry}
                    disabled={!networkStatus || isSubmitting}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${!networkStatus || isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                  >
                    {isSubmitting ? 'Retrying...' : 'Retry'}
                  </button>
                </div>
                <p className="text-sm text-red-600 mt-2">{lastError.message}</p>
              </div>
            )}

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
                  disabled={orderSuccess}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                  required
                  disabled={orderSuccess}
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
                  disabled={orderSuccess}
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
                  disabled={orderSuccess}
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
                  disabled={orderSuccess}
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
                    disabled={orderSuccess}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                    required
                    disabled={orderSuccess}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code *"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                    required
                    disabled={orderSuccess}
                  />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                  disabled={orderSuccess}
                >

                  <option value="Pakistan">Pakistan</option>

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
                    disabled={orderSuccess}
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Cash on Delivery</span>
                  </div>
                </label>
                {/* <label className="flex items-center space-x-3 cursor-pointer">
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
                </label> */}
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
                    src={product.image || '/src/assets/logo.png'}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                    onError={(e) => {
                      e.target.src = '/src/assets/logo.png';
                      e.target.onerror = null; // Prevent infinite loop
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-black">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {product.size} | Color: {product.color}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">Rs. {(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black">
                  {shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-black">Total</span>
                  <span className="text-lg font-medium text-black">Rs. {total.toFixed(2)}</span>
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
                Free shipping on all orders. Standard delivery takes 3-5 business days.
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

            {/* Success Message */}
            {orderSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Order Placed Successfully!</span>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/');
                    }}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  You will receive a confirmation email shortly. Thank you for your order!
                </p>
              </div>
            )}

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !networkStatus}
              className={`w-full py-4 px-6 font-medium rounded-xl transition-colors ${isSubmitting || !networkStatus
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              {isSubmitting
                ? 'Processing Order...'
                : !networkStatus
                  ? 'No Internet Connection'
                  : `Place Order - Rs. ${total.toFixed(2)}`
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

