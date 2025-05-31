'use client';

import Link from 'next/link';
import CartContent from '@/components/CartContent';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:text-blue-200 transition-colors duration-200">
              ← Back to Premium Store
            </Link>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <div className="w-48"></div> 
          </div>
        </div>
      </header>

      {/* Main Content with Suspense */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CartContent />
      </main>
    </div>
  );
} 