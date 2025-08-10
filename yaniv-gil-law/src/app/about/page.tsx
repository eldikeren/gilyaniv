import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { pageSEO } from '@/lib/seo';
import { attorneys } from '@/lib/data';
import AttorneyCard from '@/components/AttorneyCard';
import Link from 'next/link';
import { ArrowLeft, Phone, MapPin, Clock, Award, Users, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: pageSEO.about.title,
  description: pageSEO.about.description,
};

export default function AboutPage() {
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
              אודות המשרד
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              מומחים בחדלות פירעון, דיני משפחה וסדר דין אזרחי
              <br />
              עם ניסיון של למעלה מ-15 שנה בהליכים משפטיים מורכבים
            </p>
          </motion.div>
        </div>
      </section>

      {/* Firm History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                ההיסטוריה שלנו
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                משרד עורכי דין יניב גיל הוקם בשנת 2008 על ידי עו"ד יניב גיל, 
                מתוך חזון לספק שירות משפטי מקצועי ואישי ללקוחות במגוון רחב של 
                תחומי משפט.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                לאורך השנים, המשרד התמחה בתחומי חדלות פירעון, דיני משפחה וסדר 
                דין אזרחי, תוך בניית מוניטין של מקצועיות, אמינות ומחויבות ללקוחות.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                כיום, המשרד ממשיך לגדול ולהתפתח, תוך שמירה על הערכים והעקרונות 
                שעליהם הוקם - מתן שירות משפטי איכותי, מקצועי ואישי לכל לקוח.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">2008</div>
                    <div className="text-sm text-gray-600">שנת הקמה</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">לקוחות מרוצים</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">אחוזי הצלחה</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600">שנות ניסיון</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              הערכים שלנו
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              אנו מאמינים בערכים הבאים כבסיס לעבודתנו המשפטית
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'מקצועיות',
                description: 'אנו מספקים שירות משפטי מקצועי ואיכותי, תוך שמירה על הסטנדרטים הגבוהים ביותר של המקצוע.',
                icon: '⚖️'
              },
              {
                title: 'אמינות',
                description: 'אנו מתחייבים לשקיפות מלאה עם לקוחותינו ולשמירה על אמונם לאורך כל ההליך המשפטי.',
                icon: '🤝'
              },
              {
                title: 'מחויבות',
                description: 'אנו מחויבים להשגת התוצאות הטובות ביותר עבור לקוחותינו, תוך שמירה על האינטרסים שלהם.',
                icon: '🎯'
              },
              {
                title: 'אישיות',
                description: 'אנו מאמינים במתן שירות אישי ומותאם לכל לקוח, תוך הבנת הצרכים הייחודיים שלו.',
                icon: '👤'
              },
              {
                title: 'חדשנות',
                description: 'אנו מתעדכנים בחידושים המשפטיים האחרונים ומשתמשים בטכנולוגיה מתקדמת לטובת לקוחותינו.',
                icon: '💡'
              },
              {
                title: 'יושרה',
                description: 'אנו פועלים ביושרה מלאה ובהתאם לכללי האתיקה המקצועית של עורכי הדין.',
                icon: '✨'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-right">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-right leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
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
              הצוות שלנו
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              פגשו את עורכי הדין המומחים שלנו
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Office Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                המשרד שלנו
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                המשרד ממוקם במרכז תל אביב, בבניין WE Tower, 
                ומספק סביבת עבודה מקצועית ונוחה ללקוחותינו.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">כתובת</div>
                    <div className="text-gray-600">רחוב ויצמן 123, תל אביב</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">טלפון</div>
                    <div className="text-gray-600">03-609-2414</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">שעות פעילות</div>
                    <div className="text-gray-600">א-ה: 09:00-18:00</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">ייעוץ ראשוני חינם</h3>
                <p className="text-blue-100 mb-6">
                  התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מנוסה
                </p>
                <a
                  href="tel:03-609-2414"
                  className="inline-flex items-center space-x-2 space-x-reverse bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  <span>03-609-2414</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
