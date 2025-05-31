'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import SearchAndFilter from '@/components/SearchAndFilter';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export default function Home() {
  const allProducts: Product[] = productsData;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchAndFilter 
          products={allProducts} 
          onFilteredProducts={setFilteredProducts} 
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}
