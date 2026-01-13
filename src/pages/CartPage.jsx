import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | Exam Success Academy</title>
          <meta name="description" content="View and manage your course selections in the shopping cart." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Cart is Empty</h2>
              <p className="text-slate-600 mb-8">Start adding courses to your cart to begin your learning journey!</p>
              <Button
                onClick={() => navigate('/')}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Browse Courses
              </Button>
            </motion.div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${getCartCount()}) | Exam Success Academy`}</title>
        <meta name="description" content="Review your selected courses and proceed to checkout." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Discount</span>
                    <span className="text-green-600">₹0</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg font-semibold"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="lg"
                  className="w-full mt-3"
                >
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CartPage;