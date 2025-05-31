'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/components/CartContext';

const tax = 10;

// Loading component for Suspense fallback
function CartLoadingFallback() {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading your cart...</h2>
        <p className="text-gray-600">Please wait while we load your items.</p>
      </div>
    </div>
  );
}

// Component that renders cart content
function CartContentInner() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart, getTotalItems, isLoading } = useCartContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Show loading fallback while cart is loading
  if (isLoading) {
    return <CartLoadingFallback />;
  }

  const handlePurchase = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Purchase successful! Thank you for your order.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const handleQuantityInput = (productId: number, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleQuantityBlur = (productId: number, value: string) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) {
      updateQuantity(productId, 1);
    }
  };

  return (
    <>
      {items.length === 0 ? (
        /* Empty Cart */
        <div className="text-center py-16">
          <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        /* Cart with Items */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cart Items ({getTotalItems()})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                            {item.product.category && (
                              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                {item.product.category}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Price */}
                          <div>
                            <p className="text-2xl font-bold text-green-600">${item.product.price}</p>
                            <p className="text-sm text-gray-600">
                              ${item.product.price} × {item.quantity} = 
                              <span className="font-bold text-green-600 ml-1">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div>
                            <div className="flex items-center rounded-lg border-gray-200 p-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="w-10 h-10 rounded-md bg-black flex items-center justify-center text-white font-bold transition-colors border hover:bg-gray-700"
                              >
                                −
                              </button>
                              
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityInput(item.product.id, e.target.value)}
                                onBlur={(e) => handleQuantityBlur(item.product.id, e.target.value)}
                                className="w-16 text-center font-bold text-blue-600 bg-transparent border-none outline-none"
                              />
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-10 h-10 rounded-md bg-black hover:bg-gray-700 flex items-center justify-center text-white font-bold transition-colors border"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({getTotalItems()})</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${tax}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${getTotalPrice(tax).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePurchase}
                  disabled={isCheckingOut}
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 font-semibold text-lg"
                >
                  {isCheckingOut ? 'Processing...' : `Checkout (${getTotalItems()} items)`}
                </button>
                
                <Link href="/">
                  <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main CartContent component - simple wrapper, no Suspense needed since we handle loading internally
export default function CartContent() {
  return <CartContentInner />;
} 