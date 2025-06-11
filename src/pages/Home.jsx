import React from 'react';
import ProductCard from '../components/ProductCard';

const Home = ({ products = [], addToCart }) => {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">No Products Available</h2>
          <p className="text-gray-600">Check back soon for our latest offerings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our high-quality selection</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
