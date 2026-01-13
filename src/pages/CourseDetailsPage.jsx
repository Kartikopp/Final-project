import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Award, CheckCircle, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { coursesData } from '@/data/coursesData';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
  }, [id]);

  if (!course) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-slate-600">Course not found</p>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(course);
  };

  return (
    <>
      <Helmet>
        <title>{`${course.title} | Exam Success Academy`}</title>
        <meta name="description" content={course.description} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 w-fit">
                {course.category}
              </span>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-lg text-slate-600 mb-6">
                {course.description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="h-5 w-5" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Award className="h-5 w-5" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Course Highlights</h3>
                <ul className="space-y-3">
                  {course.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">₹{course.price.toLocaleString('en-IN')}</span>
                  {course.originalPrice && (
                    <span className="text-xl line-through text-blue-200">
                      ₹{course.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About This Course</h2>
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-4">
                This comprehensive {course.title} is specifically designed for aspirants preparing for 
                {course.category === 'UPSC' && ' UPSC Civil Services Examination'}
                {course.category === 'SSC' && ' SSC CGL, CHSL, and other SSC examinations'}
                {course.category === 'Railway' && ' Railway Recruitment Board examinations'}
                {course.category === 'Banking' && ' IBPS, SBI, and other Banking examinations'}
                . Our expert faculty with years of experience will guide you through the entire syllabus with 
                structured learning modules, practice tests, and personalized mentorship.
              </p>
              <p className="mb-4">
                The course covers all essential topics in General Knowledge and General Studies, including 
                Indian History, Geography, Polity, Economy, Science & Technology, Current Affairs, and more. 
                Each topic is explained with clarity using real-world examples, making complex concepts easy to understand.
              </p>
              <p>
                Join thousands of successful students who have cleared their dream government exams with our 
                proven teaching methodology and comprehensive study material.
              </p>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CourseDetailsPage;