import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem('examCourseCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('examCourseCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    const existingItem = cart.find(item => item.id === course.id);
    
    if (existingItem) {
      toast({
        title: "Already in Cart",
        description: `${course.title} is already in your cart.`,
      });
      return;
    }

    setCart([...cart, { ...course, quantity: 1 }]);
    toast({
      title: "Added to Cart",
      description: `${course.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
    toast({
      title: "Removed from Cart",
      description: "Course has been removed from your cart.",
    });
  };

  const updateQuantity = (courseId, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item => 
      item.id === courseId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};