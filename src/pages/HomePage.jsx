import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsList from '@/components/ProductsList';
import Footer from '@/components/Footer';

const HomePage = ({ onCartClick }) => {
  return (
    <>
      <Helmet>
        <title>GK & GS Courses for Government Exams | Exam Success Academy</title>
        <meta name="description" content="Master General Knowledge and General Studies for UPSC, SSC, Railway, and other government exams with our comprehensive online courses. Expert faculty, structured curriculum, and proven results." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header onCartClick={onCartClick} />
        <HeroSection />
        
        <section id="featured-courses" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Available Courses
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive courses designed by experts to help you excel in government examinations
              </p>
            </motion.div>

            <ProductsList />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;