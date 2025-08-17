import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import FeaturedProducts from './components/FeaturedProducts';
import BestSelling from './components/BestSelling';
import DropOne from './components/DropOne';
import Perfumes from './components/Perfumes';
import Reviews from './components/Reviews';
// import ReturnPolicy from './components/ReturnPolicy';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CartPanel from './components/CartPanel';
import Checkout from './components/Checkout';
import AboutUs from './components/AboutUs';
import ShippingPolicy from './components/ShippingPolicy';
import ContactUs from './components/ContactUs';
import RefundPolicy from './components/RefundPolicy';
import { CartProvider } from './contexts/CartContext';

// Component to handle scroll to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const HomePage = () => (
    <>
      <Banner />
      <FeaturedProducts />
      <BestSelling />
      <DropOne />
      <Perfumes />
      <Reviews />
      
    </>
  );

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-soft-white">
          <ScrollToTop />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/product/:id" 
                element={<ProductDetail />} 
              />
              <Route 
                path="/checkout" 
                element={<Checkout />} 
              />
              <Route 
                path="/about" 
                element={<AboutUs />} 
              />
              <Route 
                path="/shipping-policy" 
                element={<ShippingPolicy />} 
              />
              <Route 
                path="/contact" 
                element={<ContactUs />} 
              />
              <Route 
                path="/refund-policy" 
                element={<RefundPolicy />} 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Cart Panel */}
          <CartPanel />
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
