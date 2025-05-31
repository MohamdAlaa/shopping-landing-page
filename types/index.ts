export type Product = {
    id: number;
    name: string;
    price: number;
    category?: string;
    description: string;
    image: string;
  };

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: (taxs?: number) => number;
  getTotalItems: () => number;
  isLoading: boolean;
};