import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { pageSEO } from '@/lib/seo';
import { practiceAreas } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Phone, Scale, Users, Building, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: pageSEO.practiceAreas.title,
  description: pageSEO.practiceAreas.description,
};

const practiceAreaDetails = [
  {
    slug: 'bankruptcy',
    title: 'חדלות פירעון',
    icon: '🏦',
    description: 'פש"ר והוצל"פ - פתרונות מקיפים לחייבים ונושים',
    longDescription: 'אנו מתמחים בתחומי חדלות פירעון, פשיטת רגל והוצאה לפועל, ומספקים פתרונות מקיפים הן לחייבים והן לנושים. המשרד מלווה לקוחות בכל שלבי ההליך המשפטי, החל מייעוץ ראשוני ועד לסיום ההליך.',
    services: [
      'בקשות לפשיטת רגל',
      'התראות פשיטת רגל',
      'ערעורים בפשיטת רגל',
      'צווי כינוס נכסים',
      'הסדרי חובות',
      'התנגדויות להוצל"פ',
      'ייעוץ לנושים'
    ],
    features: [
      'ניסיון של למעלה מ-15 שנה בתחום',
      'הצלחה ב-95% מהתיקים',
      'ייעוץ ראשוני חינם',
      'ליווי אישי לאורך כל ההליך'
    ]
  },
  {
    slug: 'family-law',
    title: 'דיני משפחה',
    icon: '👨‍👩‍👧‍👦',
    description: 'גירושין, מזונות, משמורת ילדים וצוואות',
    longDescription: 'תחום דיני המשפחה הוא אחד התחומים הרגישים והמורכבים ביותר במשפט. אנו מספקים ייעוץ מקצועי ואישי בכל הנושאים הקשורים לדיני משפחה, תוך שמירה על רגישות וחמלה.',
    services: [
      'הליכי גירושין',
      'הסכמי גירושין',
      'מזונות ילדים',
      'משמורת ילדים',
      'חלוקת רכוש',
      'צוואות וירושות',
      'אימוץ ילדים',
      'הכרת אבהות'
    ],
    features: [
      'גישור ופתרון סכסוכים',
      'ניסיון בבתי דין רבניים',
      'ליווי רגשי ומקצועי',
      'הגנה על זכויות הילדים'
    ]
  },
  {
    slug: 'civil-procedure',
    title: 'סדר דין אזרחי',
    icon: '⚖️',
    description: 'תביעות אזרחיות, סכסוכים מסחריים ופתרון מחלוקות',
    longDescription: 'אנו מתמחים בתחומי סדר דין אזרחי ומסחרי, ומספקים ייעוץ וייצוג משפטי במגוון רחב של סכסוכים אזרחיים ומסחריים. המשרד מלווה לקוחות בכל שלבי ההליך המשפטי.',
    services: [
      'תביעות אזרחיות',
      'סכסוכים מסחריים',
      'הפרת חוזים',
      'נזיקין',
      'קניין רוחני',
      'דיני עבודה',
      'ערעורים אזרחיים',
      'בוררות וגישור'
    ],
    features: [
      'ניסיון בבתי משפט שונים',
      'התמחות בדיני חוזים',
      'פתרון מהיר ויעיל',
      'ייעוץ אסטרטגי'
    ]
  },
  {
    slug: 'real-estate-inheritance',
    title: 'מקרקעין / ירושה',
    icon: '🏠',
    description: 'סכסוכי מקרקעין, צוואות וירושות',
    longDescription: 'תחומי המקרקעין והירושה הם תחומים מורכבים הדורשים מומחיות מיוחדת. אנו מספקים ייעוץ וייצוג משפטי מקיף בכל הנושאים הקשורים למקרקעין וירושה.',
    services: [
      'סכסוכי מקרקעין',
      'העברת בעלות',
      'חכירה וחכירה משנה',
      'צוואות וירושות',
      'חלוקת עיזבון',
      'התנגדויות לצוואה',
      'ניהול עיזבון',
      'תכנון ירושה'
    ],
    features: [
      'מומחיות בדיני מקרקעין',
      'ניסיון בבתי משפט לענייני משפחה',
      'ייעוץ לתכנון ירושה',
      'ליווי בהליכי רישום'
    ]
  }
];

export default function PracticeAreasPage() {
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
              תחומי התמחות
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              אנו מתמחים במגוון רחב של תחומי משפט עם ניסיון של למעלה מ-15 שנה
              <br />
              ומספקים פתרונות מקיפים ומקצועיים לכל בעיה משפטית
            </p>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas Overview */}
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
              תחומי ההתמחות שלנו
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              כל תחום התמחות מאויש על ידי עורכי דין מומחים עם ניסיון רב בתחום הספציפי
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/practiceareas/${area.slug}`}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-xl p-6 h-full hover:bg-blue-50 transition-colors">
                    <div className="text-4xl mb-4">{area.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Practice Areas */}
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
              פירוט תחומי ההתמחות
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              למדו יותר על השירותים שאנו מספקים בכל תחום התמחות
            </p>
          </motion.div>

          <div className="space-y-16">
            {practiceAreaDetails.map((area, index) => (
              <motion.div
                key={area.slug}
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
                      <div className="text-4xl">{area.icon}</div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{area.title}</h3>
                        <p className="text-blue-600 font-semibold">{area.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                          תיאור התחום
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-right">
                          {area.longDescription}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                          השירותים שלנו
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {area.services.map((service) => (
                            <div key={service} className="flex items-center space-x-2 space-x-reverse">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-gray-600 text-sm">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                          היתרונות שלנו
                        </h4>
                        <div className="space-y-2">
                          {area.features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2 space-x-reverse">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-gray-600 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">ייעוץ ראשוני חינם</h3>
                    <p className="text-blue-100 mb-6">
                      התקשרו עכשיו לייעוץ ראשוני חינם בתחום {area.title}
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Phone className="h-5 w-5 text-blue-200" />
                        <span>03-609-2414</span>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <FileText className="h-5 w-5 text-blue-200" />
                        <span>ייעוץ ראשוני ללא עלות</span>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Users className="h-5 w-5 text-blue-200" />
                        <span>מומחים בתחום</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <a
                        href="tel:03-609-2414"
                        className="block w-full bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
                      >
                        <Phone className="h-4 w-4 inline ml-2" />
                        התקשר עכשיו
                      </a>
                      <Link
                        href={`/practiceareas/${area.slug}`}
                        className="block w-full border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-center"
                      >
                        קרא עוד על התחום
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              למה לבחור בנו?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              היתרונות הייחודיים שלנו בשירות המשפטי
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Scale,
                title: 'מומחיות מקצועית',
                description: 'ניסיון של למעלה מ-15 שנה בתחומי המשפט השונים עם התמחות ספציפית בכל תחום.'
              },
              {
                icon: Users,
                title: 'שירות אישי',
                description: 'ליווי אישי ומקצועי לכל לקוח, תוך הבנת הצרכים הייחודיים שלו.'
              },
              {
                icon: Building,
                title: 'ניסיון מוכח',
                description: '95% אחוזי הצלחה בתיקים עם אלפי לקוחות מרוצים לאורך השנים.'
              },
              {
                icon: Phone,
                title: 'זמינות גבוהה',
                description: 'זמינות 24/7 ללקוחות עם תמיכה טלפונית ופגישות דחופות בעת הצורך.'
              },
              {
                icon: FileText,
                title: 'שקיפות מלאה',
                description: 'שקיפות מלאה בכל שלבי ההליך המשפטי עם עדכונים שוטפים ללקוח.'
              },
              {
                icon: ArrowLeft,
                title: 'תוצאות מהירות',
                description: 'מחויבות להשגת תוצאות מהירות ויעילות תוך שמירה על האינטרסים של הלקוח.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-right leading-relaxed">
                  {feature.description}
                </p>
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
              התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מומחה בתחום הרלוונטי
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
