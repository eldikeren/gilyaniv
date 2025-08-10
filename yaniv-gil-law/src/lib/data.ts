export interface Article {
  id: string;
  title: string;
  summary: string;
  category: 'bankruptcy' | 'enforcement' | 'civilprocedure' | 'personalstatus';
  slug: string;
  externalUrl?: string;
  date?: string;
}

export interface Attorney {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image?: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'חטפה את הילדים כדי שייעדרו מאירוע משפחתי...',
    summary: 'פסיקה מעניינת בנושא משמורת ילדים והשפעת התנהגות ההורים על הילדים',
    category: 'personalstatus',
    slug: 'kidnapping-children-family-event',
    externalUrl: 'https://www.psakdin.co.il/Document/קיבל-החזר-לצ-ק-45-אלף-ש-לגבר-שילדיו-נעדרו-מחתונת-אחיו'
  },
  {
    id: '2',
    title: 'הגרושה מול הנושים: מי יקבל את בית המגורים?',
    summary: 'פסיקה חשובה בנושא חלוקת נכסים בין גרושים ונושים',
    category: 'personalstatus',
    slug: 'divorced-wife-vs-creditors',
    externalUrl: 'https://www.ynet.co.il/economy/article/rk5ptfcac'
  },
  {
    id: '3',
    title: 'ביקשה לבטל הסכם גירושין: "נלחצתי וכאב לי הראש"',
    summary: 'בקשה לביטול הסכם גירושין על רקע לחץ נפשי',
    category: 'personalstatus',
    slug: 'cancel-divorce-agreement-pressure',
    externalUrl: 'https://www.ynet.co.il/news/article/bjh11tecc'
  },
  {
    id: '4',
    title: 'עו"ד תבע יורשת: "החזירי למרשי כספים..."',
    summary: 'תביעה של עורך דין נגד יורשת על החזרת כספים',
    category: 'civilprocedure',
    slug: 'lawyer-sues-heir-refund',
    externalUrl: 'https://www.ynet.co.il/news/article/sy1e0l9qq'
  },
  {
    id: '5',
    title: 'אקסית של אם ל‑3 הוכרה כאימא נוספת',
    summary: 'פסיקה פורצת דרך בהכרה בהורות נוספת',
    category: 'personalstatus',
    slug: 'ex-partner-recognized-additional-mother',
    externalUrl: 'https://www.ynet.co.il/news/article/ry3c4cwcc'
  },
  {
    id: '6',
    title: 'זכה בפיצוי ענק אחרי שקיבל הפטר...',
    summary: 'פסיקה מעניינת בנושא פיצויים לאחר הפטר',
    category: 'bankruptcy',
    slug: 'compensation-after-discharge',
    externalUrl: 'https://www.psakdin.co.il/Document/חייב-שקיבל-הפטר-זכה-בתביעה-נזיקית-—-6-מהפיצוי-יעוקל'
  },
  {
    id: '7',
    title: 'חייבים ביקשו להשתמש בצ\'קים עבור בית עם ממ"ד',
    summary: 'בקשה לשימוש בצ\'קים לשכירת דירה בטוחה',
    category: 'enforcement',
    slug: 'debtors-request-checks-safe-house',
    externalUrl: 'https://www.psakdin.co.il/Document/חייבים-ביקשו-לשלם-עם-צ-קים-כדי-לשכור-דירה-בטוחה'
  },
  {
    id: '8',
    title: 'נסגר תיק הוצל"פ של חברת נסיעות...',
    summary: 'סגירת תיק הוצל"פ על רקע הסכם קיים',
    category: 'enforcement',
    slug: 'travel-company-enforcement-closed',
    externalUrl: 'https://www.psakdin.co.il/Document/חברת-נסיעות-פתחה-תיק-הוצלפ-למרות-הסכם'
  },
  {
    id: '9',
    title: 'גבר קיבל פטור מכתובה כי אשתו נוחרת',
    summary: 'פטור מכתובה על רקע בעיות רפואיות',
    category: 'personalstatus',
    slug: 'man-exempted-ketubah-snoring-wife',
    externalUrl: 'https://www.psakdin.co.il/Document/האישה-נחרה-הדיינים-פטור'
  },
  {
    id: '10',
    title: '"מסעדת חליל" הפסידה במאבק על בלעדיות שמה',
    summary: 'פסיקה בנושא זכויות קניין רוחני ושמות מסחריים',
    category: 'civilprocedure',
    slug: 'halil-restaurant-trademark-battle',
    externalUrl: 'https://www.psakdin.co.il/Document/מסעדת-חליל-שם-מסחרי'
  },
  {
    id: '11',
    title: 'גבר ערער על השיקום הכלכלי של גרושתו',
    summary: 'ערעור על החלטת שיקום כלכלי',
    category: 'personalstatus',
    slug: 'man-appeals-ex-wife-rehabilitation',
    externalUrl: 'https://www.psakdin.co.il/Document/ערעור-נגד-שיקום'
  },
  {
    id: '12',
    title: 'אב לא קיים זמני שהות כי "הילד משתעמם"',
    summary: 'אי קיום זמני שהות על רקע שעמום הילד',
    category: 'personalstatus',
    slug: 'father-didnt-fulfill-visitation-child-bored',
    externalUrl: 'https://www.psakdin.co.il/Document/הילד-משתעמם-אב'
  },
  {
    id: '13',
    title: 'אב ל‑4 השאיר שתי צוואות – שתיהן תקוימנה',
    summary: 'פסיקה מעניינת בנושא צוואות מרובות',
    category: 'personalstatus',
    slug: 'father-4-children-two-wills-validated',
    externalUrl: 'https://www.psakdin.co.il/Document/שתי-צוואות-שנחתמו-בתקופות-שונות'
  },
  {
    id: '14',
    title: 'ביקשה לפסול שופטת... – ונדחתה',
    summary: 'בקשה לפסילת שופטת נדחתה',
    category: 'civilprocedure',
    slug: 'request-disqualify-judge-rejected',
    externalUrl: 'https://www.psakdin.co.il/Document/סירוב-לבקשת-אם-לעבור'
  },
  {
    id: '15',
    title: 'המשמורת משותפת, השכר זהה...',
    summary: 'פסיקה בנושא מזונות במשמורת משותפת',
    category: 'personalstatus',
    slug: 'joint-custody-same-salary',
    externalUrl: 'https://www.psakdin.co.il/Document/הפחתת-מזונות'
  },
  {
    id: '16',
    title: 'איך להתמודד עם מעבר דירה אחרי גירושים',
    summary: 'מדריך להתמודדות עם מעבר דירה לאחר גירושים',
    category: 'personalstatus',
    slug: 'how-deal-house-move-after-divorce',
    externalUrl: 'https://www.psakdin.co.il/Document/מעבר-עיר-אחרי-גירושין'
  },
  {
    id: '17',
    title: 'ההורים נגד הבן, הבן נגד אחותו: מי יזכה בדירה?',
    summary: 'סכסוך ירושה על דירה משפחתית',
    category: 'personalstatus',
    slug: 'parents-vs-son-son-vs-sister-inheritance',
    externalUrl: 'https://www.psakdin.co.il/Document/סכסוך-ירושה-דירה-משפחתית'
  },
  {
    id: '18',
    title: 'חדלות פירעון – האופציה האידיאלית...',
    summary: 'מדריך מקיף לחדלות פירעון 2020-2024',
    category: 'bankruptcy',
    slug: 'bankruptcy-ideal-option-2020-2024',
    externalUrl: 'https://www.psakdin.co.il/Document/חדלות-פירעון-2020-2024'
  },
  {
    id: '19',
    title: 'ביטול או הפחתת דמי מזונות...',
    summary: 'פסיקה עדכנית בנושא הפחתת מזונות',
    category: 'personalstatus',
    slug: 'cancellation-reduction-alimony-2020',
    externalUrl: 'https://www.psakdin.co.il/Document/הפחתת-מזונות-פסיקה-2020'
  },
  {
    id: '20',
    title: 'אלצהיימר בהזמנה...',
    summary: 'סכסוך משפחתי על רקע מחלת אלצהיימר',
    category: 'personalstatus',
    slug: 'alzheimers-by-invitation',
    externalUrl: 'https://www.psakdin.co.il/Document/אלצהיימר-וסכסוך-משפחתי'
  },
  {
    id: '21',
    title: 'עקב התיישנות: חוב של מאות אלפי שקלים לא ישולם',
    summary: 'פסיקה על התיישנות חובות',
    category: 'enforcement',
    slug: 'statute-limitations-hundreds-thousands-debt',
    externalUrl: 'https://www.psakdin.co.il/Document/חוב-שנמחק-בשל-התיישנות'
  },
  {
    id: '22',
    title: 'הסתה וניכור הוריים בהליך גירושין',
    summary: 'ניכור הורי בתהליך גירושין',
    category: 'personalstatus',
    slug: 'parental-alienation-divorce-process',
    externalUrl: 'https://www.psakdin.co.il/Document/ניכור-הורי-בתהליך-גירושין'
  },
  {
    id: '23',
    title: 'נתן לבנו דירה והתחרט בביהמ"ש: "אני סובל מאלצהיימר"',
    summary: 'התחרטות על מתנת דירה על רקע אלצהיימר',
    category: 'personalstatus',
    slug: 'gave-son-apartment-regretted-court-alzheimers',
    externalUrl: 'https://www.psakdin.co.il/Document/הורה-התחרט-על-מתנה-דירה'
  },
  {
    id: '24',
    title: 'פסיקה לעניין פיצוי סירוב גט',
    summary: 'פסיקה חשובה בנושא פיצוי סרבן גט',
    category: 'personalstatus',
    slug: 'ruling-compensation-get-refusal',
    externalUrl: 'https://www.psakdin.co.il/Document/פיצוי-סרבן-גט'
  }
];

export const attorneys: Attorney[] = [
  {
    id: '1',
    name: 'עו"ד יניב גיל',
    title: 'מייסד המשרד',
    bio: 'עו"ד יניב גיל הוא מייסד המשרד ומומחה בתחומי חדלות פירעון, דיני משפחה וסדר דין אזרחי. עם ניסיון של למעלה מ-15 שנה, הוא מלווה לקוחות במגוון רחב של הליכים משפטיים מורכבים.',
    specialties: ['חדלות פירעון', 'דיני משפחה', 'סדר דין אזרחי', 'הוצל"פ'],
    image: '/images/yaniv-gil.jpg'
  },
  {
    id: '2',
    name: 'עו"ד יריב דויטש',
    title: 'שותף',
    bio: 'עו"ד יריב דויטש הוא שותף במשרד ומומחה בתחומי דיני משפחה, ירושה ומקרקעין. הוא מתמחה בפתרון סכסוכים משפחתיים מורכבים ובניהול הליכי ירושה.',
    specialties: ['דיני משפחה', 'ירושה', 'מקרקעין', 'גירושין'],
    image: '/images/yariv-deutsch.jpg'
  }
];

export const practiceAreas: PracticeArea[] = [
  {
    id: '1',
    title: 'חדלות פרעון',
    description: 'פש"ר והוצל"פ - פתרונות מקיפים לחייבים ונושים',
    icon: '🏦',
    slug: 'bankruptcy'
  },
  {
    id: '2',
    title: 'דיני משפחה',
    description: 'גירושין, מזונות, משמורת ילדים וצוואות',
    icon: '👨‍👩‍👧‍👦',
    slug: 'family-law'
  },
  {
    id: '3',
    title: 'סדר דין אזרחי',
    description: 'תביעות אזרחיות, סכסוכים מסחריים ופתרון מחלוקות',
    icon: '⚖️',
    slug: 'civil-procedure'
  },
  {
    id: '4',
    title: 'מקרקעין / ירושה',
    description: 'סכסוכי מקרקעין, צוואות וירושות',
    icon: '🏠',
    slug: 'real-estate-inheritance'
  }
];

export const getArticlesByCategory = (category: string) => {
  return articles.filter(article => article.category === category);
};

export const getArticleBySlug = (category: string, slug: string) => {
  return articles.find(article => article.category === category && article.slug === slug);
};
