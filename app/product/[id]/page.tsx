'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/components/CartContext';
import productsData from '@/data/products.json';
import { Product } from '@/types';

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);
  
  const product: Product | undefined = productsData.find(
    (p) => p.id === parseInt(resolvedParams.id)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-xl font-bold hover:text-blue-200">
            ← Back to Premium Store
          </Link>
        </div>
      </header>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl font-bold text-green-600">
              ${product.price}
            </div>

            {/* Description */}
            <div className="prose prose-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Premium quality materials</li>
                <li>• Fast and free shipping</li>
                <li>• 30-day money-back guarantee</li>
                <li>• Excellent customer support</li>
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isAdded ? '✓ Added to Cart!' : `Add ${quantity} to Cart`}
              </button>

              <div className="text-center text-sm text-gray-600">
                Total: ${(product.price * quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 