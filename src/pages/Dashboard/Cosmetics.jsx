import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';

const Cosmetics = ({ products, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortOption, priceRange, selectedBrands]);

  // Filter cosmetics from the products passed from parent
  const cosmeticsProducts = products.filter(p => p.category === 'cosmetics' || p.category === 'Cosmetics');
  
  // Get all unique brands
  const allBrands = [...new Set(cosmeticsProducts.map(p => p.brand))];

  // Apply filters
  const filteredProducts = cosmeticsProducts.filter(product => {
    const matchCategory = activeCategory === 'all' || 
                         product.subCategory.toLowerCase() === activeCategory.toLowerCase();
    const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchCategory && matchPrice && matchBrand;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return new Date(b.releaseDate) - new Date(a.releaseDate);
      default: return b.featured - a.featured;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '✨', description: 'Explore our complete cosmetics collection' },
    { id: 'makeup', name: 'Makeup', icon: '💄', description: 'Enhance your natural beauty with premium makeup' },
    { id: 'skincare', name: 'Skincare', icon: '🧴', description: 'Nourish and protect your skin' },
    { id: 'haircare', name: 'Haircare', icon: '🧖‍♀️', description: 'Professional products for healthy hair' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-16 md:py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cosmetics Collection</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover premium quality beauty products for your perfect look
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${
                activeCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 grid md:grid-cols-3 gap-6">
          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brands</label>
            <div className="flex flex-wrap gap-2">
              {allBrands.slice(0, 5).map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandToggle(brand)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedBrands.includes(brand)
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Info */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {categories.find(c => c.id === activeCategory)?.description}
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  badgeText={product.isNew ? 'New' : product.isBestSeller ? 'Bestseller' : ''}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === pageNum
                            ? 'bg-pink-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSortOption('featured');
                setPriceRange([0, 500]);
                setSelectedBrands([]);
              }}
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Beauty Tips */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Beauty Tips & Advice</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {getBeautyTips(activeCategory).map((tip) => (
              <div
                key={tip.title}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{tip.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
                <p className="text-gray-600 mb-4">{tip.content}</p>
                <button className="text-pink-600 font-medium hover:text-pink-700 flex items-center">
                  Read more <span className="ml-1">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function: Beauty Tips by Category
function getBeautyTips(activeCategory) {
  const tips = {
    makeup: [
      { icon: '👁️', title: 'Perfect Eyebrow Shaping', content: 'Step-by-step guide to shaping your brows.' },
      { icon: '👄', title: 'Long-Lasting Lip Color', content: 'Make your lipstick stay all day.' },
      { icon: '🌈', title: 'Color Matching Guide', content: 'Pick the right foundation for your skin tone.' },
    ],
    skincare: [
      { icon: '🌞', title: 'Sun Protection 101', content: 'Why SPF matters in your daily routine.' },
      { icon: '🧴', title: 'Serum Selection Guide', content: 'Choose serums for your skin concerns.' },
      { icon: '🌙', title: 'Nighttime Repair', content: 'Enhance skin recovery while you sleep.' },
    ],
    haircare: [
      { icon: '🚿', title: 'Proper Washing Technique', content: 'Avoid damage with the right technique.' },
      { icon: '🔥', title: 'Heat Styling Protection', content: 'Use tools safely with these tips.' },
      { icon: '💇‍♀️', title: 'Scalp Care Routine', content: 'Healthy hair starts with your scalp.' },
    ],
  };

  const defaultTips = [
    { icon: '💆‍♀️', title: 'Daily Skincare Routine', content: 'Essential AM/PM steps for healthy skin.' },
    { icon: '💄', title: 'Makeup Application Tips', content: 'Flawless foundation, eyes, lips.' },
    { icon: '🧖‍♀️', title: 'Hair Care Essentials', content: 'Wash, condition, style with care.' },
  ];

  return tips[activeCategory] || defaultTips;
}

export default Cosmetics;