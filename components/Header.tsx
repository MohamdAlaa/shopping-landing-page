'use client';

import Link from 'next/link';
import CartButton from './CartButton';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold hover:text-blue-200 transition-colors duration-200 flex items-center">
          <Image src="/icon.jpg" alt="Premium Store" width={32} height={32} className='rounded-full'/>
          <p className='ml-2'>Premium Store</p>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition-colors duration-200">
              Home
            </Link>
            <a href="#products" className="hover:text-blue-200 transition-colors duration-200">
              Products
            </a>
            <a href="#categories" className="hover:text-blue-200 transition-colors duration-200">
              Categories
            </a>
            <Link href="/about" className="hover:text-blue-200 transition-colors duration-200">
              About
            </Link>
            <a href="#contact" className="hover:text-blue-200 transition-colors duration-200">
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button & Cart */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <CartButton />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-blue-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-700 bg-opacity-95 rounded-lg mb-4 py-4 px-4 space-y-2">
            <Link 
              href="/" 
              className="block py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <a 
              href="#products" 
              className="block py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Products
            </a>
            <a 
              href="#categories" 
              className="block py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Categories
            </a>
            <Link 
              href="/about" 
              className="block py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <a 
              href="#contact" 
              className="block py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </div>
        )}
        
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Premium Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing products for your lifestyle
          </p>
        </div>
      </div>
    </header>
  );
} 