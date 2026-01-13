import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(course);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
          {course.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-slate-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-blue-600">
              ₹{course.price.toLocaleString('en-IN')}
            </span>
            {course.originalPrice && (
              <span className="text-lg line-through text-slate-400 ml-2">
                ₹{course.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            onClick={() => navigate(`/course/${course.id}`)}
            variant="outline"
            className="hover:bg-slate-100"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;