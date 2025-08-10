import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { pageSEO } from '@/lib/seo';
import { articles } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { ArrowLeft, Phone, FileText, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: pageSEO.articles.title,
  description: pageSEO.articles.description,
};

const categories = [
  { id: 'all', name: 'כל המאמרים', count: articles.length },
  { id: 'bankruptcy', name: 'חדלות פירעון', count: articles.filter(a => a.category === 'bankruptcy').length },
  { id: 'enforcement', name: 'הוצל"פ', count: articles.filter(a => a.category === 'enforcement').length },
  { id: 'civilprocedure', name: 'סדר דין אזרחי', count: articles.filter(a => a.category === 'civilprocedure').length },
  { id: 'personalstatus', name: 'דיני משפחה', count: articles.filter(a => a.category === 'personalstatus').length },
];

export default function ArticlesPage() {
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
              מאמרים ופסיקה
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              מאמרים מקצועיים ופסיקה עדכנית בתחומי התמחותנו
              <br />
              עדכונים שוטפים על חידושים משפטיים ופסיקה חשובה
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={category.id === 'all' ? '/articles' : `/articles/${category.id}`}
                  className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
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
              כל המאמרים
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              מאמרים מקצועיים ופסיקה עדכנית בתחומי חדלות פירעון, דיני משפחה וסדר דין אזרחי
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.map((article, index) => (
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

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              טען עוד מאמרים
            </button>
          </motion.div>
        </div>
      </section>

      {/* Category Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              קטגוריות מאמרים
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              גשו לקטגוריות הספציפיות למאמרים מפורטים יותר
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/articles/${category.id}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-xl p-6 h-full hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {category.count}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      מאמרים מקצועיים ופסיקה עדכנית בתחום {category.name}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-semibold">קרא עוד</span>
                      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              הישארו מעודכנים
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              הירשמו לקבלת עדכונים על מאמרים חדשים ופסיקה עדכנית
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="הכנס את כתובת האימייל שלך"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold whitespace-nowrap">
                הרשמה
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              זקוקים לייעוץ משפטי?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מומחה
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:03-609-2414"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center space-x-2 space-x-reverse"
              >
                <Phone className="h-5 w-5" />
                <span>03-609-2414</span>
              </a>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg"
              >
                צור קשר
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
