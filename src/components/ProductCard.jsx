const ProductCard = ({ product, addToCart, badgeText }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col items-center h-full">
      {/* Badge */}
      {badgeText && (
        <span className="self-end bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2">
          {badgeText}
        </span>
      )}

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
        loading="lazy"
      />

      {/* Product Name */}
      <h2 className="text-lg font-semibold mb-1 text-center">{product.name}</h2>

      {/* Price */}
      <p className="text-gray-700 mb-3">${product.price.toFixed(2)}</p>

      {/* Rating (if available) */}
      {product.rating && (
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < Math.floor(product.rating) ? '★' : '☆'}
            </span>
          ))}
          <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;