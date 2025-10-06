import React, { useState, useEffect } from 'react';
import logo1 from '../assets/logo1.png';

// Inline SVG for all icons to make the component self-contained
const SearchIcon = ({ className = '' }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

const XIcon = ({ className = '' }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

const CartIcon = ({ className = '' }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
);

const LogoutIcon = ({ className = '' }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
  </svg>
);

const LoginIcon = ({ className = '' }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);


const Header = ({ setView, cartItemCount, onLogout, searchTerm, onSearchChange }) => {
  // State to cycle through different placeholders
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  // Array of placeholder texts for animation
  const placeholders = [
    'Search for Products...',
    'Search for Apparels...',
    'Search for Electronics...',
    'Search for Home Goods...',
    'Search for Books...',
    'Search for Stationery...',
    'Search for Sports...',
    'Search for Toys...',
    'Search for Groceries...',
    'Search for Accessories...'
  ];

  // Effect to animate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000); // Change placeholder every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center py-4 gap-x-4 gap-y-3">

          {/* Logo and App Name */}
          <div
            className="flex items-center gap-3 cursor-pointer flex-shrink-0 order-1"
            onClick={() => setView({ name: 'products' })}
          >
            <img
              src={logo1}
              alt="Namma Kadai Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain animate-pulse rounded-full"
            />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Namma Kadai
            </h1>
          </div>

          {/* Icons Section */}
          <div className="flex items-center space-x-4 flex-shrink-0 order-2 sm:order-3">
             <button
              className="text-gray-600 hover:text-indigo-500 transition-colors"
              onClick={onLogout}
              aria-label="Login"
            >
              <LoginIcon />
            </button>
            <button
              className="relative text-gray-600 hover:text-indigo-500 transition-colors"
              onClick={() => setView({ name: 'cart' })}
              aria-label="View Cart"
            >
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Logout"
            >
              <LogoutIcon />
            </button>
          </div>

          {/* Unified Search Bar Section -- Refactored with Flexbox */}
          <div className="w-full sm:w-auto sm:flex-grow max-w-lg order-3 sm:order-2 flex items-center bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <SearchIcon className="text-gray-400 mx-3 pointer-events-none flex-shrink-0" />
            <input
              type="text"
              placeholder={placeholders[currentPlaceholderIndex]}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-full py-2 bg-transparent focus:outline-none text-gray-900"
            />
            {searchTerm && ( // Show cancel button only if there's text
              <button
                onClick={() => onSearchChange('')}
                className="text-gray-500 hover:text-red-500 p-1 mr-2 flex-shrink-0"
                aria-label="Clear search"
              >
                <XIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

