import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart';
import ShoppingCart from '@/components/ShoppingCart';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Routes>
            <Route path="/" element={<HomePage onCartClick={toggleCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage onCartClick={toggleCart} />} />
            <Route path="/success" element={<SuccessPage onCartClick={toggleCart} />} />
          </Routes>
          <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;