import { useState } from 'react';
import { useMemo } from 'react';
import ProductCard from '../../components/ProductCard';

const Clothes = ({ products, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter clothes from the products passed from parent
  const allClothes = useMemo(() => 
    products.filter((p) => p.category?.toLowerCase() === 'clothes'),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let filtered = [...allClothes];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.subCategory?.toLowerCase() === activeCategory);
    }

    switch (priceFilter) {
      case 'under50':
        filtered = filtered.filter(p => p.price < 50);
        break;
      case '50to100':
        filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
        break;
      case 'over100':
        filtered = filtered.filter(p => p.price > 100);
        break;
      default:
        break;
    }

    return filtered;
  }, [allClothes, activeCategory, priceFilter]);

  const menClothes = allClothes.filter((p) => p.subCategory?.toLowerCase() === 'men');
  const womenClothes = allClothes.filter((p) => p.subCategory?.toLowerCase() === 'women');
  const childrenClothes = allClothes.filter((p) => p.subCategory?.toLowerCase() === 'children');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Garissa Fashion Collection</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['all', 'men', 'women', 'children'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Clothing' : `${cat.charAt(0).toUpperCase() + cat.slice(1)}'s Wear`}
          </button>
        ))}
      </div>

      {/* Price Filter */}
      <div className="flex justify-center mb-8">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="px-4 py-2 rounded-full bg-gray-200"
        >
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="over100">Over $100</option>
        </select>
      </div>

      {/* Product Count */}
      <div className="text-center text-gray-600 mb-4">
        Showing {filteredProducts.length} items
      </div>

      {/* Filtered Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products match your filters.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setPriceFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Optional Collections if 'all' */}
      {activeCategory === 'all' && (
        <>
          {menClothes.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Men's Collection</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {menClothes.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </section>
          )}

          {womenClothes.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Women's Collection</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {womenClothes.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </section>
          )}

          {childrenClothes.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Children's Collection</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {childrenClothes.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Clothes;