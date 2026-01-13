import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('featured-courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master GK & GS for <span className="text-yellow-300">Government Exams</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Expert-led courses for UPSC, SSC, Railway, Banking, and other competitive examinations. 
              Join thousands of successful aspirants who achieved their dreams with us.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                size="lg"
                onClick={scrollToCourses}
                className="bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold text-lg px-8"
              >
                Explore Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8"
              >
                Free Demo Class
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50K+</div>
                <div className="text-sm text-blue-100">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">95%</div>
                <div className="text-sm text-blue-100">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100+</div>
                <div className="text-sm text-blue-100">Expert Faculty</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img 
                alt="Students studying for government exams"
                className="rounded-2xl shadow-2xl"
               src="https://images.unsplash.com/photo-1673974559269-b4146f81b5f5" />
              
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">99% Satisfaction</p>
                    <p className="text-sm text-slate-600">Student Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <Award className="h-10 w-10 text-yellow-300 mb-4" />
            <h3 className="font-bold text-lg mb-2">Certified Courses</h3>
            <p className="text-blue-100 text-sm">Industry-recognized certifications</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <Users className="h-10 w-10 text-yellow-300 mb-4" />
            <h3 className="font-bold text-lg mb-2">Expert Faculty</h3>
            <p className="text-blue-100 text-sm">Learn from the best mentors</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <TrendingUp className="h-10 w-10 text-yellow-300 mb-4" />
            <h3 className="font-bold text-lg mb-2">Latest Curriculum</h3>
            <p className="text-blue-100 text-sm">Updated syllabus coverage</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <CheckCircle className="h-10 w-10 text-yellow-300 mb-4" />
            <h3 className="font-bold text-lg mb-2">Proven Results</h3>
            <p className="text-blue-100 text-sm">Track record of success</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;