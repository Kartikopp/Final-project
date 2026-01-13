import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Gupta Classes</h3>
            <p className="text-slate-300 mb-4">
              Empowering aspirants to achieve their dreams through quality education and expert guidance.
            </p>
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="h-10 w-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="h-10 w-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">All Courses</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">Success Stories</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Exam Categories</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">UPSC Courses</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">SSC Courses</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">Railway Courses</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">Banking Courses</li>
              <li className="hover:text-yellow-300 transition-colors cursor-pointer">State PSC</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-yellow-300" />
                <span>123 Education Street, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-300" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-300" />
                <span>info@examsuccessacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Exam Success Academy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <span className="hover:text-yellow-300 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-yellow-300 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-yellow-300 transition-colors cursor-pointer">Refund Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;