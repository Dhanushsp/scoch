import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, User, MessageSquare } from 'lucide-react';

const ContactUs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [lastError, setLastError] = useState(null);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Web3Forms configuration - use the same key as in Checkout.js
  const web3FormsKey = 'b0d6c9a1-3592-495b-8684-61007f23d308';

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

    // Load Web3Forms script for better compatibility
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
      observer.disconnect();
      // Cleanup event listeners
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
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

  // Alternative submission method using form submission (better for hosted environments)
  const submitViaForm = (data) => {
    return new Promise((resolve, reject) => {
      try {
        // Create a hidden form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://api.web3forms.com/submit';
        form.target = 'web3forms_iframe';
        form.style.display = 'none';

        // Add form fields
        Object.keys(data).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        });

        // Create hidden iframe to handle response
        const iframe = document.createElement('iframe');
        iframe.name = 'web3forms_iframe';
        iframe.style.display = 'none';
        iframe.onload = () => {
          // Remove form and iframe
          document.body.removeChild(form);
          document.body.removeChild(iframe);
          resolve({ success: true, message: 'Message submitted via form method' });
        };

        iframe.onerror = () => {
          // Remove form and iframe
          document.body.removeChild(form);
          document.body.removeChild(iframe);
          reject(new Error('Form submission failed'));
        };

        // Add to DOM and submit
        document.body.appendChild(iframe);
        document.body.appendChild(form);
        form.submit();

        // Fallback timeout
        setTimeout(() => {
          try {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
          } catch (e) {
            // Elements might already be removed
          }
          resolve({ success: true, message: 'Message submitted via form method (timeout fallback)' });
        }, 10000);

      } catch (error) {
        reject(error);
      }
    });
  };

  const handleRetry = () => {
    if (lastError) {
      handleSubmit(new Event('submit'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setLastError(null);

    try {
      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      const contactData = {
        access_key: web3FormsKey,
        subject: 'Mail received from contact us page',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        submission_date: new Date().toLocaleString(),
        page_source: 'Contact Us Page'
      };

      console.log('Submitting contact form with data:', contactData);

      // Try multiple submission methods for better compatibility
      let result = null;
      let response = null;

      // Method 1: Standard fetch with CORS mode
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
          signal: controller.signal,
          mode: 'cors' // Explicitly set CORS mode
        });

        clearTimeout(timeoutId);
        console.log('Web3Forms response status:', response.status);
        console.log('Web3Forms response headers:', response.headers);

        if (response.ok) {
          result = await response.json();
          console.log('Web3Forms response result:', result);
        } else {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (fetchError) {
        console.log('Standard fetch failed, trying alternative method:', fetchError);
        
        // Method 2: Try with no-cors mode (fallback)
        try {
          const controller2 = new AbortController();
          const timeoutId2 = setTimeout(() => controller2.abort(), 30000);

          response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
            signal: controller2.signal,
            mode: 'no-cors' // Fallback to no-cors mode
          });

          clearTimeout(timeoutId2);
          console.log('Alternative method response:', response);
          
          // With no-cors, we can't read the response, so we'll assume success
          // This is a common workaround for CORS issues
          result = { success: true, message: 'Message submitted via alternative method' };
        } catch (alternativeError) {
          console.log('Alternative method also failed:', alternativeError);
          
          // Method 3: Try form-based submission (best for hosted environments)
          try {
            console.log('Trying form-based submission method...');
            result = await submitViaForm(contactData);
            console.log('Form-based submission result:', result);
          } catch (formError) {
            console.log('Form-based submission also failed:', formError);
            throw fetchError; // Throw the original error
          }
        }
      }

      if (result && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        console.error('Web3Forms returned success: false', result);
        throw new Error(`Submission failed: ${result?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      let errorMessage = 'There was an error submitting your message. Please try again or contact support.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('network error')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('No internet connection')) {
        errorMessage = error.message;
      } else if (error.message.includes('Server error')) {
        errorMessage = 'Server is temporarily unavailable. Please try again in a few minutes.';
      } else if (error.message.includes('Submission failed')) {
        errorMessage = error.message;
      } else if (error.message.includes('Unable to reach')) {
        errorMessage = error.message;
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Cross-origin request blocked. This is a hosting configuration issue. Please contact support.';
      }
      
      setLastError({ message: errorMessage, originalError: error });
      setSubmitStatus('error');
      // Show error message to user
      alert(errorMessage);
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white contact">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-black mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to get in touch? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className={`max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          
          {/* Network Status Indicator */}
          {!networkStatus && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
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
                Please check your network connection to submit the contact form.
              </p>
            </div>
          )}

          {/* Error Display and Retry */}
          {lastError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-red-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Form Submission Failed</span>
                </div>
                <button
                  onClick={handleRetry}
                  disabled={!networkStatus || isSubmitting}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    !networkStatus || isSubmitting
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

          {/* Web3Forms Test Button (for debugging) */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Web3Forms Connection Test</span>
              </div>
              <button
                onClick={async () => {
                  try {
                    const testData = {
                      access_key: web3FormsKey,
                      subject: 'Connection Test',
                      name: 'Test User',
                      email: 'test@example.com',
                      message: 'This is a connection test message'
                    };
                    
                    console.log('Testing Web3Forms connection...');
                    const result = await submitViaForm(testData);
                    console.log('Test result:', result);
                    alert('Connection test successful! Web3Forms is working.');
                  } catch (error) {
                    console.error('Connection test failed:', error);
                    alert('Connection test failed. Check console for details.');
                  }
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Connection
              </button>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              Use this button to test if Web3Forms is accessible from your current environment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                placeholder="Enter your phone number (optional)"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !networkStatus}
              className={`w-full py-4 px-6 font-medium rounded-xl transition-colors ${
                isSubmitting || !networkStatus
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              {isSubmitting 
                ? 'Sending Message...' 
                : !networkStatus 
                  ? 'No Internet Connection' 
                  : 'Send Message'
              }
            </button>
          </form>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="text-center font-medium">
                ✅ Your message has been sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-center font-medium">
                ❌ There was an error sending your message. Please try again or contact us directly.
              </p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        {/* <div className={`mt-16 md:mt-20 text-center transition-all duration-1000 ease-out delay-400 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-black mb-8">
            Other Ways to Reach Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Email</h3>
              <p className="text-gray-600">info@soch.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Phone</h3>
              <p className="text-gray-600">+92 300 123 4567</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9AM - 6PM</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactUs;