'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const typewriterText = 'ייעוץ ראשוני עם עורך דין מנוסה – התקשר עכשיו!';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < typewriterText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + typewriterText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30 shadow-2xl">
              <span className="text-5xl font-bold text-white drop-shadow-lg">י</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              משרד עורכי דין
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-100">
              יניב גיל
            </h2>
          </motion.div>

          {/* Typewriter Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-blue-100 min-h-[3rem] flex items-center justify-center">
              <span className="text-right">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            מומחים בחדלות פירעון, דיני משפחה, סדר דין אזרחי ומקרקעין
            <br />
            עם ניסיון של למעלה מ-15 שנה בהליכים משפטיים מורכבים
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="tel:03-609-2414"
              className="group bg-white text-blue-900 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-3 space-x-reverse backdrop-blur-sm"
            >
              <Phone className="h-6 w-6" />
              <span>התקשר עכשיו</span>
            </Link>
            
            <Link
              href="/contact"
              className="group border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-3 space-x-reverse"
            >
              <span>לתיאום פגישה</span>
              <ArrowLeft className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Phone Number Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="mt-8"
          >
            <div className="text-blue-100 text-lg">
              <span className="font-semibold">טלפון: </span>
              <span className="text-white font-bold text-xl">03-609-2414</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
