import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SuccessPage = ({ onCartClick }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful return
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onCartClick={onCartClick} />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-lg w-full text-center border-t-4 border-green-500"
        >
          <div className="mb-6 bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
          <p className="text-slate-600 mb-8 text-lg">
            Thank you for your enrollment. A confirmation email with course access details has been sent to your registered email address.
          </p>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            >
              Back to Courses
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Download Invoice
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessPage;