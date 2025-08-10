'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">י</span>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold">עו"ד יניב גיל</h3>
                <p className="text-gray-400 text-sm">משרד עורכי דין</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 text-right">
              מומחים בחדלות פירעון, דיני משפחה וסדר דין אזרחי
              <br />
              עם ניסיון של למעלה מ-15 שנה בהליכים משפטיים מורכבים
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-right">ניווט מהיר</h4>
            <ul className="space-y-2 text-right">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  בית
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  אודות המשרד
                </Link>
              </li>
              <li>
                <Link href="/attorneys" className="text-gray-300 hover:text-white transition-colors">
                  עורכי דין
                </Link>
              </li>
              <li>
                <Link href="/practiceareas" className="text-gray-300 hover:text-white transition-colors">
                  תחומי התמחות
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-300 hover:text-white transition-colors">
                  מאמרים
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-right">תחומי התמחות</h4>
            <ul className="space-y-2 text-right">
              <li>
                <Link href="/practiceareas/bankruptcy" className="text-gray-300 hover:text-white transition-colors">
                  חדלות פירעון
                </Link>
              </li>
              <li>
                <Link href="/practiceareas/family-law" className="text-gray-300 hover:text-white transition-colors">
                  דיני משפחה
                </Link>
              </li>
              <li>
                <Link href="/practiceareas/civil-procedure" className="text-gray-300 hover:text-white transition-colors">
                  סדר דין אזרחי
                </Link>
              </li>
              <li>
                <Link href="/practiceareas/real-estate-inheritance" className="text-gray-300 hover:text-white transition-colors">
                  מקרקעין וירושות
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-right">צור קשר</h4>
            <div className="space-y-3 text-right">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="tel:03-609-2414" className="text-gray-300 hover:text-white transition-colors">
                  03-609-2414
                </a>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@yanivgil.co.il" className="text-gray-300 hover:text-white transition-colors">
                  info@yanivgil.co.il
                </a>
              </div>
              <div className="flex items-start space-x-2 space-x-reverse">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300 text-sm">
                  רחוב ויצמן 123
                  <br />
                  תל אביב, ישראל
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  א-ה: 09:00-18:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-right">
              © {new Date().getFullYear()} משרד עורכי דין יניב גיל. כל הזכויות שמורות.
            </div>
            <div className="flex space-x-6 space-x-reverse">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                תנאי שימוש
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
