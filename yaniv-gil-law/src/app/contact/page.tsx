'use client';

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { pageSEO } from '@/lib/seo';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              צור קשר
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              התקשרו עכשיו לייעוץ ראשוני חינם
              <br />
              או השאירו פרטים ונחזור אליכם בהקדם
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">שלחו לנו הודעה</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                >
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">ההודעה נשלחה בהצלחה!</h3>
                  <p className="text-green-700">נחזור אליכם בהקדם האפשרי</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        שם מלא *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        placeholder="הכנס את שמך המלא"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        אימייל *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        placeholder="הכנס את כתובת האימייל שלך"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        טלפון
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        placeholder="הכנס את מספר הטלפון שלך"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        נושא *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      >
                        <option value="">בחר נושא</option>
                        <option value="bankruptcy">חדלות פירעון</option>
                        <option value="family-law">דיני משפחה</option>
                        <option value="civil-procedure">סדר דין אזרחי</option>
                        <option value="real-estate">מקרקעין וירושות</option>
                        <option value="general">ייעוץ כללי</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      הודעה *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right resize-none"
                      placeholder="תאר את הבעיה או השאלה שלך..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>שולח...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>שלח הודעה</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">פרטי התקשרות</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">טלפון</h3>
                    <a href="tel:03-609-2414" className="text-blue-600 hover:text-blue-700 text-lg">
                      03-609-2414
                    </a>
                    <p className="text-gray-600 text-sm mt-1">ייעוץ ראשוני חינם</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">אימייל</h3>
                    <a href="mailto:info@yanivgil.co.il" className="text-blue-600 hover:text-blue-700">
                      info@yanivgil.co.il
                    </a>
                    <p className="text-gray-600 text-sm mt-1">נענה תוך 24 שעות</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">כתובת</h3>
                    <p className="text-gray-600">
                      רחוב ויצמן 123<br />
                      תל אביב, ישראל
                    </p>
                    <p className="text-gray-600 text-sm mt-1">בניין WE Tower</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">שעות פעילות</h3>
                    <p className="text-gray-600">
                      ראשון - חמישי: 09:00 - 18:00<br />
                      שישי: 09:00 - 13:00
                    </p>
                    <p className="text-gray-600 text-sm mt-1">פגישות דחופות בתיאום מראש</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact CTA */}
              <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">ייעוץ ראשוני חינם</h3>
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

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">איך להגיע אלינו</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              המשרד ממוקם במרכז תל אביב, בבניין WE Tower, עם נגישות קלה בתחבורה הציבורית
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">מפה תוצג כאן</p>
                <p className="text-sm text-gray-500 mt-2">רחוב ויצמן 123, תל אביב</p>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚇</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">רכבת</h3>
              <p className="text-gray-600 text-sm">תחנת תל אביב מרכז - 5 דקות הליכה</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚌</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">אוטובוס</h3>
              <p className="text-gray-600 text-sm">קווים 1, 4, 5, 10 - תחנה במרחק 2 דקות</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">רכב פרטי</h3>
              <p className="text-gray-600 text-sm">חניה זמינה בבניין ובסביבה</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">שאלות נפוצות</h2>
            <p className="text-lg text-gray-600">
              תשובות לשאלות נפוצות על השירותים שלנו
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'האם הייעוץ הראשוני באמת חינם?',
                answer: 'כן, אנו מספקים ייעוץ ראשוני חינם ללא כל התחייבות. זה מאפשר לכם להבין את המצב המשפטי שלכם ולקבל החלטה מושכלת.'
              },
              {
                question: 'כמה זמן לוקח לקבל תשובה?',
                answer: 'אנו מנסים לענות לכל פנייה תוך 24 שעות. במקרים דחופים, ניתן ליצור קשר טלפוני ישירות.'
              },
              {
                question: 'האם אתם מטפלים בתיקים בכל הארץ?',
                answer: 'כן, אנו מטפלים בתיקים בכל רחבי הארץ. המשרד ממוקם בתל אביב אך אנו מספקים שירותים בכל בתי המשפט בישראל.'
              },
              {
                question: 'איך מתחילים הליך משפטי?',
                answer: 'השלב הראשון הוא פגישה ראשונית בה נבחן את המקרה שלכם ונציע את הדרך הטובה ביותר לפעול. אנו נסביר את כל התהליך מראש.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-right">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-right leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
