'use client';

import { motion } from 'framer-motion';
import { Attorney } from '@/lib/data';
import Image from 'next/image';

interface AttorneyCardProps {
  attorney: Attorney;
  className?: string;
}

export default function AttorneyCard({ attorney, className = '' }: AttorneyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="p-6">
        {/* Image and Basic Info */}
        <div className="flex items-start space-x-4 space-x-reverse mb-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
              {attorney.image ? (
                <Image
                  src={attorney.image}
                  alt={attorney.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              ) : (
                attorney.name.split(' ').map(n => n[0]).join('')
              )}
            </div>
          </div>
          
          <div className="flex-1 text-right">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {attorney.name}
            </h3>
            <p className="text-blue-600 font-semibold mb-2">
              {attorney.title}
            </p>
          </div>
        </div>
        
        {/* Bio */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 text-right">
          {attorney.bio}
        </p>
        
        {/* Specialties */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 text-right">
            תחומי התמחות:
          </h4>
          <div className="flex flex-wrap gap-2 justify-end">
            {attorney.specialties.map((specialty, index) => (
              <motion.span
                key={specialty}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-200"
              >
                {specialty}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
