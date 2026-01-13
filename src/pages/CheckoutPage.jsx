import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [onlineStoreProducts, setOnlineStoreProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  useEffect(() => {
    fetchOnlineStoreProducts();
  }, []);

  const fetchOnlineStoreProducts = async () => {
    try {
      const response = await fetch('https://v1.appbackend.io/v1/rows/page_65e10db6c58d7', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOnlineStoreProducts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching Online Store products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleCheckout = async () => {
    toast({
      title: "🚧 Checkout Feature Coming Soon!",
      description: "The payment gateway integration will be available soon. Your cart items are saved.",
    });
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Exam Success Academy</title>
        <meta name="description" content="Complete your purchase securely and start your learning journey today." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Checkout</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-green-600" />
                  Secure Checkout
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  Payment Method
                </h2>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Online Store Integration</p>
                      <p className="text-sm text-slate-600">Secure payment processing</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">
                    Complete your purchase through our integrated payment gateway. All transactions are encrypted and secure.
                  </p>
                </div>
              </motion.div>

              {!isLoadingProducts && onlineStoreProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Online Store Products</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {onlineStoreProducts.slice(0, 4).map((product, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name || 'Product'} 
                            className="w-full h-32 object-cover rounded-md mb-3"
                          />
                        )}
                        <h3 className="font-semibold text-slate-900 mb-1">{product.name || 'Product'}</h3>
                        <p className="text-sm text-slate-600 mb-2">{product.description || 'No description available'}</p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{product.price ? product.price.toLocaleString('en-IN') : '0'}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.title} x{item.quantity}</span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18%)</span>
                    <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-2xl font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{Math.round(getCartTotal() * 1.18).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg font-semibold mb-4"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Complete Purchase
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <Lock className="h-4 w-4" />
                  <span>Secure SSL encrypted payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;