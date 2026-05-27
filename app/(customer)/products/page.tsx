'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES } from '@/lib/constants';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  video: string | null;
  featured: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        const url = category
          ? `/api/products?category=${encodeURIComponent(category)}`
          : '/api/products';
        const res = await fetch(url);
        const data = await res.json();
        if (!mounted) return;
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // poll every 5s for near realtime updates
    return () => { mounted = false; clearInterval(interval); };
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="section-title mb-8">Our Products</h1>

          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="font-semibold text-gray-700">Filter by Category:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === ''
                    ? 'bg-[#6B4C9A] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-[#6B4C9A] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B4C9A] mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((product: Product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-20 bg-white rounded-lg shadow-sm">
                  No products found in this category.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
