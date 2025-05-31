'use client';

import { useState } from 'react';
import { useCartContext } from './CartContext';
import CartModal from './CartModal';
import Link from 'next/link';

export default function CartButton() {
  const { getTotalItems } = useCartContext();
  const totalItems = getTotalItems();

  return (
    <>
      <Link
        href="/cart"
        
        className="relative bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
        </svg>
        Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>

    </>
  );
} 