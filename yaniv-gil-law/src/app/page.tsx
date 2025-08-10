import { Metadata } from 'next';
import Hero from '@/components/Hero';
import SpecialtyGrid from '@/components/SpecialtyGrid';
import ArticleCard from '@/components/ArticleCard';
import { practiceAreas, articles } from '@/lib/data';
import { pageSEO } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft, Phone, Building, Users, Award, Scale, Gavel, Shield, Heart, Star, CheckCircle, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
};

export default function HomePage() {
  // Get featured articles (first 6)
  const featuredArticles = articles.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <Hero />

      {/* Services Highlights */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-6">
              <Star className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">תחומי התמחות מובילים</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                תחומי התמחות
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              אנו מתמחים במגוון רחב של תחומי משפט עם ניסיון של למעלה מ-15 שנה בהליכים משפטיים מורכבים
            </p>
          </div>

          <SpecialtyGrid practiceAreas={practiceAreas} />
        </div>
      </section>

      {/* Firm Introduction */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                <Building className="h-4 w-4 text-blue-300 mr-2" />
                <span className="text-blue-200 font-medium">אודות המשרד</span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                  אודות המשרד
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                משרד עורכי דין יניב גיל הוקם בשנת 2008 ומתמחה בתחומי חדלות פירעון, 
                דיני משפחה וסדר דין אזרחי. המשרד מלווה לקוחות במגוון רחב של הליכים 
                משפטיים מורכבים ומתמחה בפתרון סכסוכים משפטיים.
              </p>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                אנו מאמינים במתן שירות מקצועי ואישי לכל לקוח, תוך שמירה על 
                האינטרסים שלו והשגת התוצאות הטובות ביותר עבורו.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-blue-500/25">
                    <Building className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-blue-200 font-medium">שנות ניסיון</div>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-green-500/25">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">1000+</div>
                  <div className="text-blue-200 font-medium">לקוחות מרוצים</div>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-purple-500/25">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">95%</div>
                  <div className="text-blue-200 font-medium">אחוזי הצלחה</div>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 font-bold text-lg group"
              >
                <span>קרא עוד על המשרד</span>
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 text-white shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Glass Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold">ייעוץ ראשוני חינם</h3>
                  </div>
                  
                  <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                    התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מנוסה
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-lg">ייעוץ ראשוני ללא עלות</span>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-lg">ניסיון של למעלה מ-15 שנה</span>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-lg">שירות אישי ומקצועי</span>
                    </div>
                  </div>
                  
                  <div>
                    <a
                      href="tel:03-609-2414"
                      className="inline-flex items-center space-x-4 space-x-reverse bg-gradient-to-r from-white to-gray-100 text-gray-900 px-10 py-5 rounded-2xl hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-2xl group"
                    >
                      <Phone className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>03-609-2414</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 mb-6">
              <Gavel className="h-4 w-4 text-indigo-600 mr-2" />
              <span className="text-indigo-700 font-medium">מאמרים ופסיקה</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                מאמרים ופסיקה
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              מאמרים מקצועיים ופסיקה עדכנית בתחומי התמחותנו
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredArticles.map((article, index) => (
              <div key={article.id} className="group">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/articles"
              className="inline-flex items-center space-x-4 space-x-reverse bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25 font-bold text-xl group"
            >
              <span>צפה בכל המאמרים</span>
              <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Shield className="h-5 w-5 text-blue-200 mr-3" />
              <span className="text-blue-200 font-medium">ייעוץ משפטי מקצועי</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                זקוקים לייעוץ משפטי?
              </span>
            </h2>
            
            <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מנוסה
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:03-609-2414"
                className="bg-gradient-to-r from-white to-gray-100 text-gray-900 px-16 py-8 rounded-3xl font-bold text-2xl hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-6 space-x-reverse group"
              >
                <Phone className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span>03-609-2414</span>
              </a>
              <Link
                href="/contact"
                className="border-3 border-white text-white px-16 py-8 rounded-3xl font-bold text-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm group"
              >
                צור קשר
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 space-x-reverse text-blue-200">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>24/7 זמינות</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>תל אביב</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>ייעוץ חינם</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
