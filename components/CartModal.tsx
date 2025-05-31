'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartContext } from './CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart, getTotalItems } = useCartContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Purchase successful! Thank you for your order.');
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  const handleQuantityInput = (productId: number, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(productId, quantity);
    } else if (value === '' || quantity === 0) {
      // Allow empty input temporarily, will default to 1 on blur
    }
  };

  const handleQuantityBlur = (productId: number, value: string) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) {
      updateQuantity(productId, 1); // Default to 1 if invalid
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-lg">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-green-600">Shopping Cart</h2>
              
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">{item.product.name}</h3>
                        <p className="text-green-600 font-bold text-lg">${item.product.price}</p>
                        
                        {/* Quantity Counter */}
                        <div className="mt-3">
                          <label className="text-xs text-gray-600 font-medium">Quantity:</label>
                          <div className="flex items-center mt-1 bg-white rounded-lg border-2 border-gray-200 p-1 max-w-32">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityInput(item.product.id, e.target.value)}
                              onBlur={(e) => handleQuantityBlur(item.product.id, e.target.value)}
                              className="flex-1 text-center font-bold text-blue-600 bg-transparent border-none outline-none w-12"
                            />
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Price Calculation */}
                        <div className="mt-2 text-sm">
                          <p className="text-gray-600">
                            ${item.product.price} × {item.quantity} = 
                            <span className="font-bold text-green-600 ml-1">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
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
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4 border border-green-200">
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-700">Total Price:</span>
                    <span className="text-2xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={handlePurchase}
                    disabled={isCheckingOut}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 font-semibold"
                  >
                    {isCheckingOut ? 'Processing...' : `Purchase (${getTotalItems()} items)`}
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 