export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: 'משרד עורכי דין יניב גיל - מומחים בחדלות פירעון, דיני משפחה וסדר דין אזרחי',
  description: 'משרד עורכי דין יניב גיל מתמחה בחדלות פירעון, דיני משפחה, סדר דין אזרחי ומקרקעין. ייעוץ ראשוני חינם - התקשר עכשיו: 03-609-2414',
  keywords: 'עורך דין, חדלות פירעון, דיני משפחה, גירושין, הוצל"פ, סדר דין אזרחי, מקרקעין, ירושה',
  ogImage: '/images/og-image.jpg',
  canonical: 'https://www.yanivgil.co.il'
};

export const generateSEO = (data: Partial<SEOData> = {}): SEOData => {
  return {
    ...defaultSEO,
    ...data
  };
};

export const pageSEO = {
  home: generateSEO({
    title: 'משרד עורכי דין יניב גיל - ייעוץ ראשוני חינם',
    description: 'ייעוץ ראשוני עם עורך דין מנוסה - התקשר עכשיו! מומחים בחדלות פירעון, דיני משפחה וסדר דין אזרחי. טלפון: 03-609-2414'
  }),
  about: generateSEO({
    title: 'אודות המשרד - משרד עורכי דין יניב גיל',
    description: 'למדו על המשרד, ערכינו וניסיוננו בתחומי חדלות פירעון, דיני משפחה וסדר דין אזרחי'
  }),
  attorneys: generateSEO({
    title: 'עורכי הדין - משרד עורכי דין יניב גיל',
    description: 'פגשו את עורכי הדין המומחים שלנו: עו"ד יניב גיל ועו"ד יריב דויטש'
  }),
  practiceAreas: generateSEO({
    title: 'תחומי התמחות - משרד עורכי דין יניב גיל',
    description: 'תחומי ההתמחות שלנו: חדלות פירעון, דיני משפחה, סדר דין אזרחי ומקרקעין'
  }),
  articles: generateSEO({
    title: 'מאמרים ופסיקה - משרד עורכי דין יניב גיל',
    description: 'מאמרים מקצועיים ופסיקה עדכנית בתחומי חדלות פירעון, דיני משפחה וסדר דין אזרחי'
  }),
  contact: generateSEO({
    title: 'צור קשר - משרד עורכי דין יניב גיל',
    description: 'צרו קשר עם משרד עורכי דין יניב גיל לייעוץ ראשוני חינם. טלפון: 03-609-2414'
  })
};
