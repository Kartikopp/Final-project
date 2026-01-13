import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

const Header = ({ onCartClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Exam Success Academy
              </h1>
              <p className="text-sm text-slate-600">GK & GS for Government Exams</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              onClick={() => navigate('/')}
              className={location.pathname === '/' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              Courses
            </Button>
            
            <Button
              variant="outline"
              onClick={onCartClick}
              className="relative hover:bg-slate-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;