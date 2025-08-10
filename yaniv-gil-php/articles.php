<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>מאמרים ופסיקה - משרד עורכי דין יניב גיל</title>
    <meta name="description" content="מאמרים מקצועיים ופסיקה עדכנית בתחומי חדלות פירעון, דיני משפחה וסדר דין אזרחי">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="/">
                        <img src="/images/logo.png" alt="משרד עורכי דין יניב גיל" class="logo">
                    </a>
                </div>
                
                <div class="nav-menu" id="nav-menu">
                    <a href="/" class="nav-link">בית</a>
                    <a href="/about.php" class="nav-link">אודות</a>
                    <a href="/attorneys.php" class="nav-link">עורכי דין</a>
                    <a href="/practice-areas.php" class="nav-link">תחומי התמחות</a>
                    <a href="/articles.php" class="nav-link active">מאמרים</a>
                    <a href="/media.php" class="nav-link">תקשורת</a>
                    <a href="/contact.php" class="nav-link">צור קשר</a>
                </div>
                
                <div class="nav-contact">
                    <a href="tel:03-609-2414" class="phone-btn">
                        <span class="phone-icon">📞</span>
                        03-609-2414
                    </a>
                </div>
                
                <div class="nav-toggle" id="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <div class="page-header-content">
                <h1 class="page-title">מאמרים ופסיקה</h1>
                <p class="page-description">
                    מאמרים מקצועיים ופסיקה עדכנית בתחומי התמחותנו
                </p>
            </div>
        </div>
    </section>

    <!-- Articles Section -->
    <section class="articles-page">
        <div class="container">
            <div class="articles-filters">
                <button class="filter-btn active" data-filter="all">הכל</button>
                <button class="filter-btn" data-filter="family">דיני משפחה</button>
                <button class="filter-btn" data-filter="bankruptcy">חדלות פירעון</button>
                <button class="filter-btn" data-filter="civil">סדר דין אזרחי</button>
                <button class="filter-btn" data-filter="real-estate">מקרקעין</button>
            </div>
            
            <div class="articles-grid">
                <?php
                $allArticles = [
                    [
                        'title' => 'חטפה את הילדים כדי שייעדרו מאירוע משפחתי – ותפצה את האב',
                        'summary' => 'פסיקה מעניינת בנושא משמורת ילדים והשפעת התנהגות ההורים על הילדים',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/קיבל-החזר-לצ-ק-45-אלף-ש-לגבר-שילדיו-נעדרו-מחתונת-אחיו',
                        'external' => true,
                        'date' => '2024-01-15'
                    ],
                    [
                        'title' => 'הגרושה מול הנושים: מי יקבל את בית המגורים?',
                        'summary' => 'פסיקה חשובה בנושא חלוקת נכסים בין גרושים ונושים',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.ynet.co.il/economy/article/rk5ptfcac',
                        'external' => true,
                        'date' => '2024-01-10'
                    ],
                    [
                        'title' => 'ביקשה לבטל הסכם גירושין: "נלחצתי וכאב לי הראש"',
                        'summary' => 'בקשה לביטול הסכם גירושין על רקע לחץ נפשי',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.ynet.co.il/news/article/bjh11tecc',
                        'external' => true,
                        'date' => '2024-01-08'
                    ],
                    [
                        'title' => 'עו"ד תבע יורשת: "החזירי למרשי כספים שגביתי עבורו בהוצל"פ"',
                        'summary' => 'תביעה של עורך דין נגד יורשת על החזרת כספים',
                        'category' => 'civil',
                        'category_name' => 'סדר דין אזרחי',
                        'url' => 'https://www.ynet.co.il/news/article/sy1e0l9qq',
                        'external' => true,
                        'date' => '2024-01-05'
                    ],
                    [
                        'title' => 'אקסית של אם ל-3 הוכרה כאימא נוספת',
                        'summary' => 'פסיקה פורצת דרך בהכרה בהורות נוספת',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.ynet.co.il/news/article/ry3c4cwcc',
                        'external' => true,
                        'date' => '2024-01-03'
                    ],
                    [
                        'title' => 'זכה בפיצוי ענק אחרי שקיבל הפטר. יחזיר את החובות?',
                        'summary' => 'פסיקה מעניינת בנושא פיצויים לאחר הפטר',
                        'category' => 'bankruptcy',
                        'category_name' => 'חדלות פירעון',
                        'url' => 'https://www.psakdin.co.il/Document/חייב-שקיבל-הפטר-זכה-בתביעה-נזיקית-—-6-מהפיצוי-יעוקל',
                        'external' => true,
                        'date' => '2023-12-28'
                    ],
                    [
                        'title' => 'חייבים ביקשו להשתמש בצ\'קים עבור בית עם ממ"ד',
                        'summary' => 'פסיקה מעניינת בנושא שימוש בצ\'קים לתשלום שכירות',
                        'category' => 'bankruptcy',
                        'category_name' => 'חדלות פירעון',
                        'url' => 'https://www.psakdin.co.il/Document/חייבים-ביקשו-לשלם-עם-צ-קים-כדי-לשכור-דירה-בטוחה',
                        'external' => true,
                        'date' => '2023-12-25'
                    ],
                    [
                        'title' => 'למרות פסק דין לטובתה: נסגר תיק הוצל"פ של חברת נסיעות נגד חייב',
                        'summary' => 'פסיקה מעניינת בנושא סגירת תיקי הוצל"פ',
                        'category' => 'bankruptcy',
                        'category_name' => 'חדלות פירעון',
                        'url' => 'https://www.psakdin.co.il/Document/חברת-נסיעות-פתחה-תיק-הוצלפ-למרות-הסכם',
                        'external' => true,
                        'date' => '2023-12-20'
                    ],
                    [
                        'title' => 'גבר קיבל פטור מכתובה כי אשתו נוחרת',
                        'summary' => 'פסיקה מעניינת בנושא פטור מכתובה',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/האישה-נחרה-הדיינים-פטור',
                        'external' => true,
                        'date' => '2023-12-18'
                    ],
                    [
                        'title' => '"מסעדת חליל" הפסידה במאבק על בלעדיות שמה',
                        'summary' => 'פסיקה בנושא זכויות קניין רוחני ושמות מסחריים',
                        'category' => 'civil',
                        'category_name' => 'סדר דין אזרחי',
                        'url' => 'https://www.psakdin.co.il/Document/מסעדת-חליל-שם-מסחרי',
                        'external' => true,
                        'date' => '2023-12-15'
                    ],
                    [
                        'title' => 'גבר ערער על השיקום הכלכלי של גרושתו',
                        'summary' => 'פסיקה בנושא ערעור על שיקום כלכלי',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/ערעור-נגד-שיקום',
                        'external' => true,
                        'date' => '2023-12-12'
                    ],
                    [
                        'title' => 'אב לא קיים זמני שהות כי "הילד משתעמם"',
                        'summary' => 'פסיקה בנושא זמני שהות ומשמורת ילדים',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/הילד-משתעמם-אב',
                        'external' => true,
                        'date' => '2023-12-10'
                    ],
                    [
                        'title' => 'אב ל-4 השאיר שתי צוואות – שתיהן תקוימנה',
                        'summary' => 'פסיקה מעניינת בנושא צוואות וירושה',
                        'category' => 'real-estate',
                        'category_name' => 'מקרקעין',
                        'url' => 'https://www.psakdin.co.il/Document/שתי-צוואות-שנחתמו-בתקופות-שונות',
                        'external' => true,
                        'date' => '2023-12-08'
                    ],
                    [
                        'title' => 'ביקשה לפסול שופטת שלא אישרה לה לעבור דירה עם בנה – ונדחתה',
                        'summary' => 'פסיקה בנושא בקשה לפסול שופטת',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/סירוב-לבקשת-אם-לעבור',
                        'external' => true,
                        'date' => '2023-12-05'
                    ],
                    [
                        'title' => 'המשמורת משותפת, השכר זהה והאב נשאר כמעט בלי כלום',
                        'summary' => 'פסיקה בנושא משמורת משותפת ומזונות',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/הפחתת-מזונות',
                        'external' => true,
                        'date' => '2023-12-03'
                    ],
                    [
                        'title' => 'איך להתמודד עם מעבר דירה אחרי גירושים',
                        'summary' => 'מדריך מעשי למעבר דירה לאחר גירושים',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/מעבר-עיר-אחרי-גירושין',
                        'external' => true,
                        'date' => '2023-11-30'
                    ],
                    [
                        'title' => 'ההורים נגד הבן, הבן נגד אחותו: מי יזכה בדירה?',
                        'summary' => 'פסיקה בנושא סכסוך ירושה על דירה משפחתית',
                        'category' => 'real-estate',
                        'category_name' => 'מקרקעין',
                        'url' => 'https://www.psakdin.co.il/Document/סכסוך-ירושה-דירה-משפחתית',
                        'external' => true,
                        'date' => '2023-11-28'
                    ],
                    [
                        'title' => 'חדלות פירעון – האופציה האידיאלית לשיקום חייהם הכלכליים של החייבים',
                        'summary' => 'מאמר מקצועי על חדלות פירעון כפתרון כלכלי',
                        'category' => 'bankruptcy',
                        'category_name' => 'חדלות פירעון',
                        'url' => 'https://www.psakdin.co.il/Document/חדלות-פירעון-2020-2024',
                        'external' => true,
                        'date' => '2023-11-25'
                    ],
                    [
                        'title' => 'ביטול או הפחתת דמי מזונות: הפסיקה שמשפיעה על הורים שהתגרשו',
                        'summary' => 'פסיקה עדכנית בנושא הפחתת מזונות',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/הפחתת-מזונות-פסיקה-2020',
                        'external' => true,
                        'date' => '2023-11-22'
                    ],
                    [
                        'title' => 'אלצהיימר בהזמנה: כך יכול ליווי משפטי לסייע להסדיר סכסוכים משפחתיים',
                        'summary' => 'מאמר על ליווי משפטי בסכסוכים משפחתיים',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/אלצהיימר-וסכסוך-משפחתי',
                        'external' => true,
                        'date' => '2023-11-20'
                    ],
                    [
                        'title' => 'עקב התיישנות: חוב של מאות אלפי שקלים לא ישולם',
                        'summary' => 'פסיקה בנושא התיישנות חובות',
                        'category' => 'civil',
                        'category_name' => 'סדר דין אזרחי',
                        'url' => 'https://www.psakdin.co.il/Document/חוב-שנמחק-בשל-התיישנות',
                        'external' => true,
                        'date' => '2023-11-18'
                    ],
                    [
                        'title' => 'הסתה וניכור הוריים בהליך גירושין',
                        'summary' => 'מאמר על ניכור הורי בתהליך גירושין',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/ניכור-הורי-בתהליך-גירושין',
                        'external' => true,
                        'date' => '2023-11-15'
                    ],
                    [
                        'title' => 'נתן לבנו דירה והתחרט בביהמ"ש: "אני סובל מאלצהיימר"',
                        'summary' => 'פסיקה בנושא התחרטות על מתנה',
                        'category' => 'real-estate',
                        'category_name' => 'מקרקעין',
                        'url' => 'https://www.psakdin.co.il/Document/הורה-התחרט-על-מתנה-דירה',
                        'external' => true,
                        'date' => '2023-11-12'
                    ],
                    [
                        'title' => 'פסיקה לעניין פיצוי סירוב גט',
                        'summary' => 'פסיקה עדכנית בנושא פיצוי סרבן גט',
                        'category' => 'family',
                        'category_name' => 'דיני משפחה',
                        'url' => 'https://www.psakdin.co.il/Document/פיצוי-סרבן-גט',
                        'external' => true,
                        'date' => '2023-11-10'
                    ]
                ];
                
                foreach ($allArticles as $article): ?>
                    <article class="article-card" data-category="<?= $article['category'] ?>">
                        <div class="article-header">
                            <div class="article-category"><?= $article['category_name'] ?></div>
                            <div class="article-date"><?= date('d.m.Y', strtotime($article['date'])) ?></div>
                        </div>
                        <h3 class="article-title"><?= $article['title'] ?></h3>
                        <p class="article-summary"><?= $article['summary'] ?></p>
                        <a href="<?= $article['url'] ?>" class="article-link" <?= $article['external'] ? 'target="_blank" rel="noopener"' : '' ?>>
                            קרא עוד
                            <?php if ($article['external']): ?>
                                <span class="external-icon">↗</span>
                            <?php else: ?>
                                <span class="link-arrow">←</span>
                            <?php endif; ?>
                        </a>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <div class="cta-content">
                <div class="cta-badge">
                    <span class="badge-icon">🛡️</span>
                    <span>ייעוץ משפטי מקצועי</span>
                </div>
                
                <h2 class="cta-title">זקוקים לייעוץ משפטי?</h2>
                <p class="cta-description">
                    התקשרו עכשיו לייעוץ ראשוני חינם עם עורך דין מנוסה
                </p>
                
                <div class="cta-buttons">
                    <a href="tel:03-609-2414" class="btn btn-white btn-large">
                        <span class="btn-icon">📞</span>
                        03-609-2414
                    </a>
                    <a href="/contact.php" class="btn btn-outline btn-large">
                        צור קשר
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="/images/logo-white.png" alt="משרד עורכי דין יניב גיל" class="footer-logo-img">
                    </div>
                    <p class="footer-description">
                        מומחים בחדלות פירעון, דיני משפחה וסדר דין אזרחי
                    </p>
                    <div class="footer-contact">
                        <div class="contact-item">
                            <span class="contact-icon">📞</span>
                            <span>03-609-2414</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📧</span>
                            <span>info@yanivgil.co.il</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <span>תל אביב</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3 class="footer-title">קישורים מהירים</h3>
                    <ul class="footer-links">
                        <li><a href="/about.php">אודות המשרד</a></li>
                        <li><a href="/attorneys.php">עורכי דין</a></li>
                        <li><a href="/practice-areas.php">תחומי התמחות</a></li>
                        <li><a href="/articles.php">מאמרים</a></li>
                        <li><a href="/contact.php">צור קשר</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3 class="footer-title">תחומי התמחות</h3>
                    <ul class="footer-links">
                        <li><a href="/practice-areas.php#bankruptcy">חדלות פירעון</a></li>
                        <li><a href="/practice-areas.php#family">דיני משפחה</a></li>
                        <li><a href="/practice-areas.php#civil">סדר דין אזרחי</a></li>
                        <li><a href="/practice-areas.php#real-estate">מקרקעין</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3 class="footer-title">שעות פעילות</h3>
                    <div class="footer-hours">
                        <div class="hours-item">
                            <span>ראשון - חמישי:</span>
                            <span>09:00 - 18:00</span>
                        </div>
                        <div class="hours-item">
                            <span>שישי:</span>
                            <span>09:00 - 13:00</span>
                        </div>
                        <div class="hours-item">
                            <span>שבת:</span>
                            <span>סגור</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-copyright">
                    © 2024 משרד עורכי דין יניב גיל. כל הזכויות שמורות.
                </div>
                <div class="footer-social">
                    <a href="#" class="social-link">📘</a>
                    <a href="#" class="social-link">📷</a>
                    <a href="#" class="social-link">🐦</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="/js/main.js"></script>
    <script>
        // Articles filtering
        document.addEventListener('DOMContentLoaded', function() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const articles = document.querySelectorAll('.article-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter articles
                    articles.forEach(article => {
                        if (filter === 'all' || article.getAttribute('data-category') === filter) {
                            article.style.display = 'block';
                            article.classList.add('fade-in');
                        } else {
                            article.style.display = 'none';
                        }
                    });
                });
            });
        });
    </script>
</body>
</html>
