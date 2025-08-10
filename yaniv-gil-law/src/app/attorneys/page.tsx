import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { pageSEO } from '@/lib/seo';
import { attorneys } from '@/lib/data';
import AttorneyCard from '@/components/AttorneyCard';
import { Phone, Mail, Award, Users, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: pageSEO.attorneys.title,
  description: pageSEO.attorneys.description,
};

export default function AttorneysPage() {
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
              עורכי הדין שלנו
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              צוות עורכי הדין המומחים שלנו מתמחה במגוון רחב של תחומי משפט
              <br />
              עם ניסיון מצטבר של למעלה מ-25 שנה
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Overview */}
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
              הצוות המקצועי שלנו
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              כל עורך דין במשרד מביא עימו ניסיון ייחודי ומומחיות בתחומים ספציפיים, 
              המאפשרים לנו לספק פתרונות מקיפים ומקצועיים לכל בעיה משפטית.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Clock, value: '25+', label: 'שנות ניסיון מצטבר' },
              { icon: Users, value: '1000+', label: 'לקוחות מרוצים' },
              { icon: Award, value: '95%', label: 'אחוזי הצלחה' },
              { icon: Phone, value: '24/7', label: 'זמינות ללקוחות' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Attorneys Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <AttorneyCard attorney={attorney} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Attorney Profiles */}
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
              פרופילים מפורטים
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              למדו יותר על הניסיון, ההתמחויות והגישה של כל עורך דין
            </p>
          </motion.div>

          <div className="space-y-16">
            {attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center space-x-4 space-x-reverse mb-6">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                        {attorney.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{attorney.name}</h3>
                        <p className="text-blue-600 font-semibold">{attorney.title}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                          ביוגרפיה
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-right">
                          {attorney.bio}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                          תחומי התמחות
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {attorney.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-200"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                          ניסיון מקצועי
                        </h4>
                        <div className="space-y-3 text-right">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-600">ניסיון של למעלה מ-15 שנה בתחומי המשפט</span>
                          </div>
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-600">טיפול במאות תיקים מורכבים</span>
                          </div>
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-600">מומחיות בבתי משפט שונים ברחבי הארץ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">ייעוץ אישי</h3>
                    <p className="text-blue-100 mb-6">
                      התקשרו ישירות ל{attorney.name.split(' ')[0]} לייעוץ אישי ומקצועי
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Phone className="h-5 w-5 text-blue-200" />
                        <span>03-609-2414</span>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Mail className="h-5 w-5 text-blue-200" />
                        <span>info@yanivgil.co.il</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <a
                        href="tel:03-609-2414"
                        className="inline-flex items-center space-x-2 space-x-reverse bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        <Phone className="h-4 w-4" />
                        <span>התקשר עכשיו</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              זקוקים לייעוץ משפטי?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              התקשרו עכשיו לייעוץ ראשוני חינם עם אחד מעורכי הדין המומחים שלנו
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
