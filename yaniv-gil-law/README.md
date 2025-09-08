


























# משרד עורכי דין יניב גיל - אתר אינטרנט

אתר אינטרנט מודרני ומקצועי למשרד עורכי דין יניב גיל, הבנוי עם Next.js 14, TypeScript, Tailwind CSS ו-Framer Motion.

## 🚀 תכונות עיקריות

- **עיצוב מודרני ומקצועי** - ממשק משתמש מתקדם עם אנימציות חלקות
- **תמיכה מלאה בעברית** - RTL layout עם טיפוגרפיה עברית מותאמת
- **SEO מותאם** - Meta tags, Open Graph, ו-Schema markup
- **ביצועים מעולים** - Next.js 14 עם App Router ו-optimization
- **רספונסיבי** - עובד מושלם על כל המכשירים
- **נגישות** - עומד בסטנדרטי WCAG 2.1

## 🛠 טכנולוגיות

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (מומלץ)

## 📁 מבנה הפרויקט

```
yaniv-gil-law/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # דף הבית
│   │   ├── about/             # דף אודות
│   │   ├── attorneys/         # דף עורכי דין
│   │   ├── practiceareas/     # דף תחומי התמחות
│   │   ├── articles/          # דף מאמרים
│   │   └── contact/           # דף צור קשר
│   ├── components/            # רכיבי React
│   │   ├── Header.tsx         # כותרת האתר
│   │   ├── Footer.tsx         # כותרת תחתונה
│   │   ├── Hero.tsx           # רכיב גיבור
│   │   ├── ArticleCard.tsx    # כרטיס מאמר
│   │   ├── AttorneyCard.tsx   # כרטיס עורך דין
│   │   └── SpecialtyGrid.tsx  # רשת תחומי התמחות
│   └── lib/                   # ספריות ונתונים
│       ├── data.ts            # נתוני האתר
│       ├── seo.ts             # הגדרות SEO
│       └── utils.ts           # פונקציות עזר
├── public/                    # קבצים סטטיים
└── package.json
```

## 🚀 התקנה והפעלה

### דרישות מקדימות

- Node.js 18+ 
- npm או yarn

### התקנה

1. **שכפול הפרויקט**
```bash
git clone <repository-url>
cd yaniv-gil-law
```

2. **התקנת תלויות**
```bash
npm install
```

3. **הפעלת שרת פיתוח**
```bash
npm run dev
```

4. **פתיחת הדפדפן**
```
http://localhost:3000
```

### בנייה לפרודקשן

```bash
npm run build
npm start
```

## 📄 דפי האתר

### דף הבית (/)
- Hero section עם אנימציית typewriter
- סקירה של תחומי ההתמחות
- הצגת המשרד
- מאמרים מומלצים
- Call-to-action

### אודות (/about)
- היסטוריית המשרד
- ערכי המשרד
- צוות עורכי הדין
- מידע על המשרד

### עורכי דין (/attorneys)
- פרופילים מפורטים של עורכי הדין
- תחומי התמחות
- ניסיון מקצועי
- פרטי התקשרות

### תחומי התמחות (/practiceareas)
- סקירה מקיפה של כל תחום
- שירותים ניתנים
- יתרונות המשרד
- ייעוץ ראשוני

### מאמרים (/articles)
- מאמרים מקצועיים
- סינון לפי קטגוריות
- קישורים חיצוניים
- עדכונים שוטפים

### צור קשר (/contact)
- טופס יצירת קשר
- פרטי התקשרות
- מפה וכווני הגעה
- שאלות נפוצות

## 🎨 התאמות עיצוב

### צבעים
- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#6b7280)
- **Background**: White (#ffffff)
- **Text**: Dark Gray (#111827)

### טיפוגרפיה
- **Hebrew Font**: Segoe UI, Tahoma, Geneva, Verdana
- **RTL Support**: Full right-to-left layout
- **Responsive**: Scales across all devices

## 📱 רספונסיביות

האתר מותאם לכל הגדלי מסך:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 התאמות נוספות

### SEO
- Meta tags לכל דף
- Open Graph tags
- Twitter Cards
- Schema markup
- Sitemap (ניתן להוסיף)

### ביצועים
- Image optimization
- Code splitting
- Lazy loading
- Bundle optimization

### אבטחה
- CSP headers
- XSS protection
- HTTPS enforcement

## 🚀 פריסה (Deployment)

### Vercel (מומלץ)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# העלאה של תיקיית .next
```

### AWS/GCP
```bash
npm run build
npm start
```

## 📊 אנליטיקס

ניתן להוסיף:
- Google Analytics 4
- Google Search Console
- Facebook Pixel
- Hotjar

## 🔄 עדכונים ותחזוקה

### עדכון תוכן
- עריכת `src/lib/data.ts` לעדכון מאמרים
- עריכת `src/lib/seo.ts` לעדכון SEO
- הוספת תמונות ל-`public/images/`

### עדכון עיצוב
- עריכת `src/app/globals.css`
- התאמת רכיבים ב-`src/components/`
- שינוי צבעים ב-Tailwind config

## 📞 תמיכה

לשאלות ותמיכה טכנית:
- **Email**: info@yanivgil.co.il
- **Phone**: 03-609-2414

## 📄 רישיון

© 2024 משרד עורכי דין יניב גיל. כל הזכויות שמורות.

---

**פותח עם ❤️ בישראל**
