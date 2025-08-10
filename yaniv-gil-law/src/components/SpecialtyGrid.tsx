'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PracticeArea } from '@/lib/data';

interface SpecialtyGridProps {
  practiceAreas: PracticeArea[];
  className?: string;
}

export default function SpecialtyGrid({ practiceAreas, className = '' }: SpecialtyGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {practiceAreas.map((specialty, index) => (
        <motion.div
          key={specialty.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link
            href={`/practiceareas/${specialty.slug}`}
            className="group block"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-200 transition-colors">
                    {specialty.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-right group-hover:text-blue-600 transition-colors">
                  {specialty.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 text-right leading-relaxed flex-grow">
                  {specialty.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center justify-between text-blue-600 group-hover:text-blue-700">
                  <span className="text-sm font-semibold">קרא עוד</span>
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
