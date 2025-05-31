import { useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set client flag after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage only on client
  useEffect(() => {
    if (isClient) {
      // Add a small delay to ensure smooth loading
      const loadCart = async () => {
        try {
          const savedCart = localStorage.getItem('shopping-cart');
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
        
        // Ensure minimum loading time to prevent flash
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
      };
      
      loadCart();
    }
  }, [isClient]);

  // Save cart to localStorage whenever items change (only on client)
  useEffect(() => {
    if (isClient && !isLoading) {
      localStorage.setItem('shopping-cart', JSON.stringify(items));
    }
  }, [items, isClient, isLoading]);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = (taxs?: number) => {
    const baseTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    if (taxs) {
      return baseTotal - taxs;
    }
    return baseTotal;
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoading,
  };
} 