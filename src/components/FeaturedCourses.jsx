import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/CourseCard';
import { coursesData } from '@/data/coursesData';

const FeaturedCourses = () => {
  return (
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
            Featured Courses
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive courses designed by experts to help you excel in government examinations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;