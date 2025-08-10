'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Article } from '@/lib/data';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export default function ArticleCard({ article, className = '' }: ArticleCardProps) {
  const isExternal = !!article.externalUrl;

  const CardContent = () => (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="p-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
            {getCategoryDisplayName(article.category)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 text-right">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-right leading-relaxed">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
            {isExternal && <ExternalLink className="h-4 w-4" />}
            <span>קרא עוד</span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse text-blue-600 group-hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={article.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <Link
      href={`/articles/${article.category}/${article.slug}`}
      className="group block"
    >
      <CardContent />
    </Link>
  );
}

function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    bankruptcy: 'חדלות פירעון',
    enforcement: 'הוצל"פ',
    civilprocedure: 'סדר דין אזרחי',
    personalstatus: 'דיני משפחה'
  };
  
  return categoryMap[category] || category;
}
