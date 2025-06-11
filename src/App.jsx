import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Clothes from './pages/Dashboard/Clothes';
import Cosmetics from './pages/Dashboard/Cosmetics';
import Electronics from './pages/Dashboard/Electronics';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products.json once when the app loads
  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Invalid product format');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Cart logic
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Show loading or error globally if needed
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItems={cartItems} />
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={<Home products={products} addToCart={addToCart} />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cartItems}
                clearCart={clearCart}
              />
            } 
          />
          <Route path="/products" element={<DashboardLayout />}>
            <Route 
              path="clothes" 
              element={<Clothes products={products} addToCart={addToCart} />} 
            />
            <Route 
              path="cosmetics" 
              element={<Cosmetics products={products} addToCart={addToCart} />} 
            />
            <Route 
              path="electronics" 
              element={<Electronics products={products} addToCart={addToCart} />} 
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;