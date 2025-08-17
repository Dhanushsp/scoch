import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary text-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} className='h-20 w-auto'/>
            
            <div className="flex space-x-4 md:space-x-6">
              {/* Instagram */}
              <a href="https://www.instagram.com/soch.pk_?igsh=cmJuZXgxOTk1MjZl" target="_blank" rel="noopener noreferrer" className="text-soft-white/80 hover:text-soft-white transition-colors duration-200">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a href="https://www.facebook.com/share/1ZJEPXATFv/" target="_blank" rel="noopener noreferrer" className="text-soft-white/80 hover:text-soft-white transition-colors duration-200">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* TikTok */}
              <a href="https://www.tiktok.com/@soch.pk?_t=ZS-8yw3GCQT3YI&_r=1" target="_blank" rel="noopener noreferrer" className="text-soft-white/80 hover:text-soft-white transition-colors duration-200">
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg md:text-xl font-serif font-semibold mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#" className="text-soft-white/80 hover:text-soft-white transition-colors duration-200 font-sans text-base md:text-lg">
                  View All Products
                </a>
              </li>
                          <li>
              <button
                onClick={() => navigate('/shipping-policy')}
                className="text-soft-white/80 hover:text-soft-white transition-colors duration-200 font-sans text-base md:text-lg text-left w-full"
              >
                Shipping Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/refund-policy')}
                className="text-soft-white/80 hover:text-soft-white transition-colors duration-200 font-sans text-base md:text-lg text-left w-full"
              >
                Refund Policy
              </button>
            </li>
                          <li>
              <button
                onClick={() => navigate('/contact')}
                className="text-soft-white/80 hover:text-soft-white transition-colors duration-200 font-sans text-base md:text-lg text-left w-full"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/refund-policy')}
                className="text-soft-white/80 hover:text-soft-white transition-colors duration-200 font-sans text-base md:text-lg text-left w-full"
              >
                Refund Policy
              </button>
            </li>
              
             
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg md:text-xl font-serif font-semibold mb-4 md:mb-6">Contact Us</h4>
            <ul className="space-y-2 md:space-y-3">
             
              <li className="flex items-center text-soft-white/80 font-sans text-base md:text-lg">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                muhibaamir2004@gmail.com
              </li>
              {/* <li className="flex items-center text-soft-white/80 font-sans text-base md:text-lg">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pakistan
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-light mt-8 md:mt-12 pt-8 md:pt-12 text-center">
          <p className="text-soft-white/60 text-sm md:text-base font-sans">
            © 2025 SOCH. All rights reserved. | 
            <a href="/privacy" className="text-soft-white/80 hover:text-soft-white ml-2 transition-colors duration-200">
              Privacy Policy
            </a> | 
            <a href="/terms" className="text-soft-white/80 hover:text-soft-white ml-2 transition-colors duration-200">
              Terms of Service
            </a> |
            <a className="text-soft-white/80 hover:text-soft-white ml-2 transition-colors duration-200">
              Made by <span><a href='https://www.instagram.com/dhanush_webdev/'>Dhanush</a></span>, India
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
