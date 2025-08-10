import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { articles, getArticlesByCategory } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { ArrowLeft, Phone, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryNames: Record<string, string> = {
  bankruptcy: 'חדלות פירעון',
  enforcement: 'הוצל"פ',
  civilprocedure: 'סדר דין אזרחי',
  personalstatus: 'דיני משפחה'
};

const categoryDescriptions: Record<string, string> = {
  bankruptcy: 'מאמרים מקצועיים ופסיקה עדכנית בתחום חדלות פירעון ופשיטת רגל',
  enforcement: 'מאמרים מקצועיים ופסיקה עדכנית בתחום הוצאה לפועל',
  civilprocedure: 'מאמרים מקצועיים ופסיקה עדכנית בתחום סדר דין אזרחי',
  personalstatus: 'מאמרים מקצועיים ופסיקה עדכנית בתחום דיני משפחה'
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.category;
  const categoryName = categoryNames[category];
  
  if (!categoryName) {
    return {
      title: 'קטגוריה לא נמצאה',
    };
  }

  return {
    title: `${categoryName} - מאמרים ופסיקה | משרד עורכי דין יניב גיל`,
    description: categoryDescriptions[category] || `מאמרים מקצועיים ופסיקה עדכנית בתחום ${categoryName}`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryName = categoryNames[category];
  
  if (!categoryName) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(category);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {categoryName}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {categoryDescriptions[category]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 space-x-reverse text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              בית
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/articles" className="text-gray-500 hover:text-blue-600">
              מאמרים
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-semibold">{categoryName}</span>
          </nav>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              מאמרים ב{categoryName}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {categoryDescriptions[category]}
            </p>
          </motion.div>

          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {categoryArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">אין מאמרים זמינים</h3>
              <p className="text-gray-600 mb-6">כרגע אין מאמרים זמינים בקטגוריה זו</p>
              <Link
                href="/articles"
                className="inline-flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>חזור לכל המאמרים</span>
              </Link>
            </motion.div>
          )}

          {/* Back to All Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/articles"
              className="inline-flex items-center space-x-2 space-x-reverse bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>חזור לכל המאמרים</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              זקוקים לייעוץ בתחום {categoryName}?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מומחה בתחום
            </p>
            <a
              href="tel:03-609-2414"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center space-x-2 space-x-reverse"
            >
              <Phone className="h-5 w-5" />
              <span>03-609-2414</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
