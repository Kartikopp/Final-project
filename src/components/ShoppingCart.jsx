import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/components/ui/use-toast';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Add some courses to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      clearCart();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast({
        title: 'Checkout Error',
        description: 'There was a problem initializing checkout. Please try again.',
        variant: 'destructive',
      });
    }
  }, [cartItems, clearCart, toast]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
                Your Cart
              </h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-slate-50 p-6 rounded-full mb-4">
                    <ShoppingCartIcon className="h-12 w-12 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Your cart is empty</h3>
                  <p className="text-slate-500 mb-6">Start adding courses to begin your learning journey.</p>
                  <Button onClick={() => setIsCartOpen(false)} variant="outline">
                    Continue Browsing
                  </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.variant.id} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                      <img
                        src={item.product.image || "https://placehold.co/100"}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-slate-900">
                          <h3 className="line-clamp-1">{item.product.title}</h3>
                          <p className="ml-4">{item.variant.sale_price_formatted || item.variant.price_formatted}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{item.variant.title}</p>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                            <button
                                className="p-1 hover:bg-slate-100 rounded-l-lg disabled:opacity-50"
                                onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="h-4 w-4 text-slate-600" />
                            </button>
                            <span className="px-2 font-medium text-slate-900">{item.quantity}</span>
                            <button
                                className="p-1 hover:bg-slate-100 rounded-r-lg"
                                onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                            >
                                <Plus className="h-4 w-4 text-slate-600" />
                            </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.variant.id)}
                          className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-slate-100 p-6 bg-slate-50">
                <div className="flex justify-between text-base font-medium text-slate-900 mb-4">
                  <p>Subtotal</p>
                  <p>{getCartTotal()}</p>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6"
                >
                  Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;