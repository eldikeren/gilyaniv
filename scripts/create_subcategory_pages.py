#!/usr/bin/env python3
"""
Create all missing sub-category pages with unique content
"""

import os

# Template based on divorce-law.html structure
def create_page(filename, title, meta_description, keywords, h1_title, h2_subtitle, content_sections, category):
    """Generate a complete HTML page for a practice area sub-category"""

    template = f'''<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1ES9G9LMG6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-1ES9G9LMG6');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | עו"ד יניב גיל ושות' - תל אביב</title>
    <meta name="description" content="{meta_description}">
    <meta name="keywords" content="{keywords}">
    <meta property="og:title" content="{title} | עו״ד יניב גיל">
    <meta property="og:description" content="{meta_description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.yanivgil.co.il/{filename}">
    <meta property="og:image" content="https://www.yanivgil.co.il/images/new-logo.png">
    <link rel="canonical" href="https://www.yanivgil.co.il/{filename}">
    <link rel="icon" type="image/png" href="images/new-logo.png">
    <link rel="stylesheet" href="css/tailwind.css">
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        body {{ font-family: 'Heebo', sans-serif; direction: rtl; }}
        .header-logo {{ height: 60px; width: auto; transition: all 0.3s ease-in-out; }}
        .header-text-logo {{ width: 220px; height: auto; transition: all 0.3s ease-in-out; }}
        .scrolled .header-logo {{ height: 40px; }}
        .scrolled .header-text-logo {{ width: 170px; }}
        /* Full-screen mobile menu */
        .mobile-menu-overlay {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }}
        .mobile-menu-overlay.active {{
            transform: translateX(0);
        }}
        .mobile-menu-close {{
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            color: #333;
            cursor: pointer;
        }}
        .mobile-menu-content {{
            padding: 2rem;
            padding-top: 4rem;
        }}
        .mobile-menu-links {{
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }}
        .mobile-menu-links a {{
            display: block;
            padding: 1rem;
            background: #1a1a1a;
            color: #c9a55c;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s ease;
            font-size: 1rem;
        }}
        .mobile-menu-links a:hover {{
            background: #c9a55c;
            color: #1a1a1a;
        }}
        /* Floating WhatsApp Button */
        .whatsapp-float {{
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 20px;
            left: 20px;
            background-color: #25D366;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-size: 30px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-decoration: none;
        }}
        .whatsapp-float:hover {{
            background-color: #20BA5A;
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }}
        .whatsapp-float svg {{
            width: 35px;
            height: 35px;
        }}
        @media (max-width: 768px) {{
            .whatsapp-float {{
                width: 56px;
                height: 56px;
                bottom: 15px;
                left: 15px;
            }}
            .whatsapp-float svg {{
                width: 32px;
                height: 32px;
            }}
        }}
        /* Accessibility floating button */
        .accessibility-btn {{
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            width: 60px;
            height: 60px;
            background: #005fcc;
            color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-decoration: none;
        }}
        .accessibility-btn:hover {{
            background: #004499;
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }}
        .accessibility-btn svg {{
            width: 30px;
            height: 30px;
            fill: currentColor;
        }}
        @media (max-width: 768px) {{
            .accessibility-btn {{
                width: 50px;
                height: 50px;
                bottom: 15px;
                right: 15px;
            }}
            .accessibility-btn svg {{
                width: 24px;
                height: 24px;
            }}
        }}
        /* Footer text visibility fix */
        footer, footer * {{
            color: #d1d5db !important;
        }}
        footer h3, footer h4 {{
            color: #ffffff !important;
        }}
        footer a:hover {{
            color: #c9a55c !important;
        }}
        /* Content styling */
        .content-section {{
            margin-bottom: 2rem;
        }}
        .content-section h3 {{
            color: #1a1a1a;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            border-right: 4px solid #c9a55c;
            padding-right: 1rem;
        }}
        .content-section p {{
            color: #4a5568;
            line-height: 1.8;
            margin-bottom: 1rem;
        }}
        .content-section ul {{
            list-style-type: disc;
            padding-right: 1.5rem;
            color: #4a5568;
        }}
        .content-section li {{
            margin-bottom: 0.5rem;
            line-height: 1.6;
        }}
    </style>
</head>
<body class="bg-gray-50 text-gray-800">
    <!-- Header -->
    <header class="site-header fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ease-in-out py-6 shadow-md" role="banner" id="site-header">
        <div class="container mx-auto px-4 flex justify-between items-center transition-all duration-300 ease-in-out">
            <div style="display: flex; align-items: center; gap: 15px;">
                <a href="index.html">
                    <img src="images/new-logo.png" alt="לוגו משרד עו״ד יניב גיל" class="header-logo" style="margin-left: 10px; display: block;">
                </a>
                <a href="index.html" class="flex items-center gap-2 text-gray-800 transition-all duration-300 ease-in-out">
                    <img src="images/Yaniv-Gil-Law-Office-Notary_text.avif" alt="משרד עו״ד יניב גיל ושות׳" class="header-text-logo">
                </a>
            </div>
            <nav class="hidden md:flex flex-1 justify-center">
                <ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">
                    <li><a href="index.html" class="hover:text-[#b8941f] transition-colors duration-200">בית</a></li>
                    <li><a href="index.html#about" class="hover:text-[#b8941f] transition-colors duration-200">אודות המשרד</a></li>
                    <li><a href="attorneys.html" class="hover:text-[#b8941f] transition-colors duration-200">עורכי דין</a></li>
                    <li><a href="practice-areas.html" class="hover:text-[#b8941f] transition-colors duration-200">תחומי התמחות</a></li>
                    <li><a href="articles.html" class="hover:text-[#b8941f] transition-colors duration-200">פרסומים מקצועיים</a></li>
                    <li><a href="blog.html" class="hover:text-[#b8941f] transition-colors duration-200">בלוג</a></li>
                    <li><a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" class="hover:text-[#b8941f] transition-colors duration-200" target="_blank" rel="noopener">ביקורות מלקוחות</a></li>
                    <li><a href="contact.html" class="hover:text-[#b8941f] transition-colors duration-200">צור קשר</a></li>
                </ul>
            </nav>
            <button id="mobile-menu-button" class="md:hidden flex items-center p-2 rounded-md text-gray-600 hover:text-[#b8941f] focus:outline-none" aria-label="פתח תפריט">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div class="hidden md:flex items-center space-x-4 space-x-reverse">
                <a class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-5 py-3 text-base font-medium text-[#b8941f] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a]" href="tel:0548184581">
                    התקשר עכשיו
                </a>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="mobile-menu-overlay">
            <button id="close-mobile-menu" class="mobile-menu-close" aria-label="סגור תפריט">&times;</button>
            <div class="mobile-menu-content">
                <div class="mobile-menu-links">
                    <a href="index.html">בית</a>
                    <a href="index.html#about">אודות המשרד</a>
                    <a href="attorneys.html">עורכי דין</a>
                    <a href="practice-areas.html">תחומי התמחות</a>
                    <a href="articles.html">פרסומים מקצועיים</a>
                    <a href="blog.html">בלוג</a>
                    <a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" target="_blank" rel="noopener">ביקורות מלקוחות</a>
                    <a href="contact.html">צור קשר</a>
                </div>
                <div class="mt-6">
                    <a class="block w-full text-center py-3 px-4 bg-[#1a1a1a] text-[#b8941f] border border-[#b8941f] rounded-full hover:bg-[#b8941f] hover:text-[#1a1a1a] transition-colors duration-200" href="tel:0548184581">
                        התקשר עכשיו
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">{h1_title}</h1>
            <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">{h2_subtitle}</p>
            <div class="mt-8">
                <a href="contact.html" class="inline-flex items-center justify-center rounded-full border-2 border-[#c9a55c] bg-[#c9a55c] px-8 py-4 text-lg font-bold text-[#1a1a1a] shadow-lg transition-all duration-300 hover:bg-transparent hover:text-[#c9a55c]">
                    לייעוץ ראשוני חינם
                </a>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="py-16">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                {content_sections}

                <!-- CTA Section -->
                <div class="bg-gray-100 rounded-xl p-8 mt-12 text-center">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">זקוקים לייעוץ משפטי מקצועי?</h3>
                    <p class="text-gray-600 mb-6">צוות המשרד ישמח לעמוד לרשותכם ולסייע בכל שאלה</p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:0548184581" class="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-6 py-3 text-[#c9a55c] font-medium hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors">
                            054-8184581
                        </a>
                        <a href="contact.html" class="inline-flex items-center justify-center rounded-full border-2 border-[#1a1a1a] px-6 py-3 text-[#1a1a1a] font-medium hover:bg-[#1a1a1a] hover:text-white transition-colors">
                            השאירו פרטים
                        </a>
                    </div>
                </div>

                <!-- Related Pages -->
                <div class="mt-12">
                    <h3 class="text-xl font-bold text-gray-900 mb-6">תחומים נוספים שעשויים לעניין אתכם</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="practice-areas.html" class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <span class="text-[#c9a55c] font-medium">כל תחומי ההתמחות</span>
                        </a>
                        <a href="blog.html" class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <span class="text-[#c9a55c] font-medium">מאמרים ופרסומים</span>
                        </a>
                        <a href="contact.html" class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <span class="text-[#c9a55c] font-medium">צור קשר</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-8" role="contentinfo">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h3 class="text-lg font-bold text-white mb-4">המשרד</h3>
                    <ul class="space-y-2">
                        <li><a href="index.html" class="hover:text-[#b8941f] transition-colors duration-200">בית</a></li>
                        <li><a href="index.html#about" class="hover:text-[#b8941f] transition-colors duration-200">אודות המשרד</a></li>
                        <li><a href="attorneys.html" class="hover:text-[#b8941f] transition-colors duration-200">עורכי דין</a></li>
                        <li><a href="practice-areas.html" class="hover:text-[#b8941f] transition-colors duration-200">תחומי התמחות</a></li>
                        <li><a href="articles.html" class="hover:text-[#b8941f] transition-colors duration-200">מאמרים</a></li>
                        <li><a href="blog.html" class="hover:text-[#b8941f] transition-colors duration-200">בלוג</a></li>
                        <li><a href="contact.html" class="hover:text-[#b8941f] transition-colors duration-200">צור קשר</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-4">תחומי התמחות</h3>
                    <ul class="space-y-2">
                        <li><a href="family-law.html" class="hover:text-[#b8941f] transition-colors duration-200">דיני משפחה</a></li>
                        <li><a href="inheritance-wills.html" class="hover:text-[#b8941f] transition-colors duration-200">ירושות וצוואות</a></li>
                        <li><a href="insolvency.html" class="hover:text-[#b8941f] transition-colors duration-200">חדלות פירעון</a></li>
                        <li><a href="practice-areas.html#civil-law" class="hover:text-[#b8941f] transition-colors duration-200">דיני מקרקעין</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-4">יצירת קשר</h3>
                    <div class="space-y-4">
                        <p><strong>טלפון:</strong><br><a href="tel:03-6092414" class="hover:text-[#b8941f]">03-6092414</a></p>
                        <p><strong>נייד:</strong><br><a href="tel:054-8184581" class="hover:text-[#b8941f]">054-8184581</a></p>
                        <p><strong>פקס:</strong><br>03-6092413</p>
                        <p><strong>אימייל:</strong><br><a href="mailto:yanivgil@gmail.com" class="hover:text-[#b8941f]">yanivgil@gmail.com</a></p>
                    </div>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-4">כתובת</h3>
                    <p>מגדל "WE-TLV"<br>דרך מנחם בגין 150<br>קומה 7, תל-אביב</p>
                    <p class="mt-4">
                        <a href="https://www.facebook.com/people/%D7%99%D7%A0%D7%99%D7%91-%D7%92%D7%99%D7%9C-%D7%95%D7%A9%D7%95%D7%AA-%D7%9E%D7%A9%D7%A8%D7%93-%D7%A2%D7%95%D7%93/100063695315034/" target="_blank" rel="noopener" class="hover:text-[#b8941f] transition-colors duration-200">עקבו אחרינו בפייסבוק</a>
                    </p>
                </div>
            </div>
            <div class="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <div class="flex flex-col items-center md:items-start">
                    <p>&copy; 2025 משרד עו״ד יניב גיל. כל הזכויות שמורות.</p>
                    <p class="mt-1">האתר נבנה ע"י <a href="https://eladdigital.vercel.app/" target="_blank" rel="noopener" class="text-gray-400 hover:text-[#b8941f] transition-colors">Eladdigital</a></p>
                </div>
                <div class="flex gap-4 mt-4 md:mt-0">
                    <a href="privacy-policy.html" class="hover:text-[#b8941f] transition-colors duration-200">מדיניות פרטיות</a>
                    <a href="terms-of-use.html" class="hover:text-[#b8941f] transition-colors duration-200">תנאי שימוש</a>
                    <a href="accessibility.html" class="hover:text-[#b8941f] transition-colors duration-200">הצהרת נגישות</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Header scroll effect
        window.addEventListener('scroll', function() {{
            const header = document.getElementById('site-header');
            if (window.scrollY > 50) {{
                header.classList.add('py-3', 'shadow-xl', 'scrolled');
                header.classList.remove('py-6', 'shadow-md');
            }} else {{
                header.classList.remove('py-3', 'shadow-xl', 'scrolled');
                header.classList.add('py-6', 'shadow-md');
            }}
        }});

        // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {{
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const closeMenuButton = document.getElementById('close-mobile-menu');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton) {{
                mobileMenuButton.addEventListener('click', function() {{
                    mobileMenu.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }});
            }}

            if (closeMenuButton) {{
                closeMenuButton.addEventListener('click', function() {{
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }});
            }}

            // Close menu when clicking a link
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {{
                link.addEventListener('click', function() {{
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }});
            }});
        }});
    </script>

    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/972548184581?text=שלום, אשמח לקבל ייעוץ משפטי" class="whatsapp-float" target="_blank" rel="noopener" aria-label="שלח הודעת WhatsApp">
        <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    </a>

    <!-- Accessibility Button -->
    <a href="accessibility.html" class="accessibility-btn" aria-label="הצהרת נגישות" title="הצהרת נגישות">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    </a>
</body>
</html>
'''
    return template


# Define all the pages to create
pages = [
    # Family Law - דיני משפחה
    {
        'filename': 'divorce.html',
        'title': 'גירושין',
        'meta_description': 'עורך דין גירושין מומחה - ייצוג בבית המשפט לענייני משפחה ובבית הדין הרבני. טיפול מקצועי בהליכי גירושין, חלוקת רכוש ומשמורת.',
        'keywords': 'גירושין, עורך דין גירושין, בית דין רבני, גט, חלוקת רכוש, תל אביב',
        'h1_title': 'גירושין',
        'h2_subtitle': 'ליווי מקצועי ורגיש בהליכי גירושין בבית המשפט ובבית הדין הרבני',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>הליך הגירושין בישראל</h3>
                    <p>הליך הגירושין בישראל הוא תהליך מורכב הכולל היבטים משפטיים, רגשיים וכלכליים. בישראל, גירושין בין יהודים מתבצעים בבית הדין הרבני, בעוד שסוגיות רכושיות ומשמורת ילדים יכולות להתברר בבית המשפט לענייני משפחה.</p>
                    <p>משרדנו מתמחה בליווי לקוחות לאורך כל הליך הגירושין, תוך שמירה על האינטרסים שלהם והבטחת תוצאות מיטביות.</p>
                </div>
                <div class="content-section">
                    <h3>שירותי המשרד בתחום הגירושין</h3>
                    <ul>
                        <li>ייצוג בבית המשפט לענייני משפחה</li>
                        <li>ייצוג בבית הדין הרבני</li>
                        <li>ניהול משא ומתן להסכמי גירושין</li>
                        <li>טיפול בסוגיות חלוקת רכוש</li>
                        <li>הסדרת משמורת ילדים וזמני שהות</li>
                        <li>קביעת מזונות ילדים ומזונות אישה</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>למה לבחור במשרדנו?</h3>
                    <p>עו"ד יניב גיל מביא עמו ניסיון עשיר בתחום דיני המשפחה וגירושין. המשרד מעניק ליווי צמוד, מקצועי ורגיש, תוך הבנה עמוקה של המורכבות הרגשית הכרוכה בהליכים אלו.</p>
                </div>
'''
    },
    {
        'filename': 'divorce-agreements.html',
        'title': 'הסכמי גירושין',
        'meta_description': 'עריכת הסכמי גירושין מקיפים ומאוזנים. ניסוח מקצועי של הסכמים הכוללים חלוקת רכוש, משמורת, מזונות וכל ההיבטים המשפטיים.',
        'keywords': 'הסכם גירושין, הסכם גירושין בהסכמה, עריכת הסכם גירושין, אישור הסכם גירושין, תל אביב',
        'h1_title': 'הסכמי גירושין',
        'h2_subtitle': 'עריכת הסכמי גירושין מקיפים המגנים על זכויותיכם',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו הסכם גירושין?</h3>
                    <p>הסכם גירושין הוא מסמך משפטי מחייב המסדיר את כל ההיבטים הכרוכים בפרידה בין בני הזוג. הסכם מקיף ומנוסח היטב יכול לחסוך זמן, כסף ועוגמת נפש רבה.</p>
                    <p>הסכם גירושין טוב צריך להיות הוגן, מאוזן ולקחת בחשבון את צרכי כל הצדדים, כולל הילדים.</p>
                </div>
                <div class="content-section">
                    <h3>מה כולל הסכם גירושין?</h3>
                    <ul>
                        <li>חלוקת הרכוש המשותף - דירה, חסכונות, רכבים</li>
                        <li>הסדרי משמורת ילדים</li>
                        <li>קביעת זמני שהות עם הילדים</li>
                        <li>גובה מזונות הילדים</li>
                        <li>מזונות אישה (במידה ורלוונטי)</li>
                        <li>חלוקת זכויות פנסיוניות וסוציאליות</li>
                        <li>הסדרת חובות משותפים</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>היתרונות בגירושין בהסכמה</h3>
                    <p>גירושין בהסכמה, כאשר שני הצדדים מגיעים להסכמות ללא צורך בהתדיינות משפטית ממושכת, חוסכים זמן וכסף רב, מפחיתים את הנזק הרגשי לכל המעורבים, ובמיוחד לילדים.</p>
                </div>
'''
    },
    {
        'filename': 'property-agreements.html',
        'title': 'הסכמי ממון',
        'meta_description': 'עריכת הסכמי ממון לפני נישואין ובמהלכם. הגנה על נכסים, הסדרת יחסי ממון בין בני זוג בליווי עורך דין מומחה.',
        'keywords': 'הסכם ממון, הסכם קדם נישואין, הסכם ממון בין בני זוג, אישור הסכם ממון, תל אביב',
        'h1_title': 'הסכמי ממון',
        'h2_subtitle': 'הגנה על הזכויות הכלכליות שלכם לפני ובמהלך הנישואין',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו הסכם ממון?</h3>
                    <p>הסכם ממון הוא מסמך משפטי המסדיר את יחסי הממון בין בני זוג. ניתן לערוך הסכם ממון לפני הנישואין (הסכם קדם נישואין) או במהלכם.</p>
                    <p>הסכם ממון מאפשר לבני הזוג לקבוע מראש כיצד יחולק הרכוש ביניהם במקרה של פרידה, ובכך למנוע סכסוכים עתידיים.</p>
                </div>
                <div class="content-section">
                    <h3>מתי כדאי לערוך הסכם ממון?</h3>
                    <ul>
                        <li>כאשר לאחד מבני הזוג יש נכסים משמעותיים</li>
                        <li>כאשר אחד מבני הזוג בעל עסק</li>
                        <li>בנישואין שניים כאשר יש ילדים מנישואין קודמים</li>
                        <li>כאשר יש הפרש גילים או הפרש כלכלי משמעותי</li>
                        <li>כאשר רוצים להגן על ירושה עתידית</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>תהליך אישור הסכם ממון</h3>
                    <p>על פי החוק, הסכם ממון חייב לקבל אישור של בית המשפט לענייני משפחה או בית הדין הרבני. משרדנו מלווה אתכם לאורך כל התהליך, מניסוח ההסכם ועד לאישורו.</p>
                </div>
'''
    },
    {
        'filename': 'child-custody.html',
        'title': 'משמורת ילדים',
        'meta_description': 'ייצוג בסכסוכי משמורת ילדים. קביעת משמורת משותפת, משמורת בלעדית והסדרי מגורים. ליווי מקצועי לטובת הילדים.',
        'keywords': 'משמורת ילדים, משמורת משותפת, משמורת בלעדית, הסדרי משמורת, עורך דין משמורת, תל אביב',
        'h1_title': 'משמורת ילדים',
        'h2_subtitle': 'שמירה על טובת הילדים תוך הגנה על זכויות ההורים',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>סוגי משמורת</h3>
                    <p>בישראל קיימים מספר מודלים של משמורת ילדים:</p>
                    <ul>
                        <li><strong>משמורת משותפת</strong> - שני ההורים מעורבים באופן שווה בגידול הילדים</li>
                        <li><strong>משמורת בלעדית</strong> - הילדים מתגוררים עם הורה אחד</li>
                        <li><strong>משמורת פיזית</strong> vs <strong>משמורת משפטית</strong></li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>השיקולים בקביעת משמורת</h3>
                    <p>בית המשפט שוקל מספר גורמים בקביעת המשמורת:</p>
                    <ul>
                        <li>טובת הילד - השיקול המרכזי</li>
                        <li>רצון הילד (בהתאם לגילו ובגרותו)</li>
                        <li>יכולת כל הורה לספק את צרכי הילד</li>
                        <li>הקשר של הילד עם כל הורה</li>
                        <li>יציבות סביבת המגורים</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>ליווי מקצועי בסכסוכי משמורת</h3>
                    <p>משרדנו מתמחה בייצוג הורים בסכסוכי משמורת, תוך שמירה על טובת הילדים. אנו שואפים להגיע להסכמות מחוץ לכותלי בית המשפט, אך כאשר נדרש - נילחם על זכויותיכם.</p>
                </div>
'''
    },
    {
        'filename': 'visitation-rights.html',
        'title': 'זמני שהות',
        'meta_description': 'הסדרת זמני שהות (הסדרי ראייה) עם ילדים לאחר גירושין. קביעת לוחות זמנים, חגים וחופשות בליווי עורך דין מומחה.',
        'keywords': 'זמני שהות, הסדרי ראייה, זכויות הורים, ביקורים, חגים וחופשות, תל אביב',
        'h1_title': 'זמני שהות',
        'h2_subtitle': 'שמירה על הקשר בין הילדים לשני ההורים',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהם זמני שהות?</h3>
                    <p>זמני שהות (בעבר נקראו "הסדרי ראייה") הם הזמנים בהם הילדים שוהים עם ההורה שאינו משמורן. הסדרת זמני שהות נכונה חיונית לשמירה על קשר בריא בין הילדים לשני ההורים.</p>
                </div>
                <div class="content-section">
                    <h3>מרכיבי הסדר זמני שהות</h3>
                    <ul>
                        <li>ימי חול ושעות אחר הצהריים</li>
                        <li>סופי שבוע (לסירוגין או קבוע)</li>
                        <li>חגים ומועדים</li>
                        <li>חופשות בית ספר</li>
                        <li>ימי הולדת ואירועים מיוחדים</li>
                        <li>שיחות טלפון ווידאו</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>התאמת זמני שהות לגיל הילד</h3>
                    <p>זמני השהות צריכים להיות מותאמים לגיל הילד וצרכיו. ילדים קטנים זקוקים לקשר תכוף יותר עם שני ההורים, בעוד שילדים גדולים יותר יכולים לשהות תקופות ארוכות יותר עם כל הורה.</p>
                </div>
'''
    },
    {
        'filename': 'child-support.html',
        'title': 'מזונות ילדים',
        'meta_description': 'ייצוג בתביעות מזונות ילדים. חישוב מזונות, הפחתת מזונות, הגדלת מזונות ואכיפת תשלומים בליווי עורך דין מומחה.',
        'keywords': 'מזונות ילדים, תביעת מזונות, חישוב מזונות, הפחתת מזונות, הגדלת מזונות, תל אביב',
        'h1_title': 'מזונות ילדים',
        'h2_subtitle': 'הבטחת הצרכים הכלכליים של ילדיכם',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>חובת מזונות ילדים</h3>
                    <p>על פי הדין הישראלי, שני ההורים חבים במזונות ילדיהם הקטינים. גובה המזונות נקבע על פי צרכי הילדים ויכולות ההורים.</p>
                    <p>מזונות הילדים נועדו לכסות את כל צרכיהם: מזון, ביגוד, חינוך, בריאות, מדור ועוד.</p>
                </div>
                <div class="content-section">
                    <h3>כיצד נקבע גובה המזונות?</h3>
                    <ul>
                        <li>גיל הילדים</li>
                        <li>צרכים מיוחדים (בריאותיים, חינוכיים)</li>
                        <li>רמת החיים שהילדים הורגלו אליה</li>
                        <li>הכנסות שני ההורים</li>
                        <li>זמני השהות עם כל הורה</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>שינוי גובה המזונות</h3>
                    <p>ניתן לפנות לבית המשפט בבקשה להגדלת או הפחתת מזונות כאשר חל שינוי נסיבות מהותי, כגון שינוי בהכנסות, שינוי בצרכי הילדים או שינוי בזמני השהות.</p>
                </div>
'''
    },
    {
        'filename': 'spousal-support.html',
        'title': 'מזונות אישה',
        'meta_description': 'ייצוג בתביעות מזונות אישה. זכויות לקבלת מזונות במהלך הנישואין ולאחר גירושין בליווי עורך דין מומחה.',
        'keywords': 'מזונות אישה, תביעת מזונות אישה, מזונות זמניים, מזונות קבועים, תל אביב',
        'h1_title': 'מזונות אישה',
        'h2_subtitle': 'הגנה על זכויותיכן הכלכליות',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהם מזונות אישה?</h3>
                    <p>מזונות אישה הם תשלומים שהבעל משלם לאשתו לצורך מחייתה. חובת המזונות קיימת במהלך הנישואין וייתכן שתימשך גם לאחר הגירושין בנסיבות מסוימות.</p>
                </div>
                <div class="content-section">
                    <h3>סוגי מזונות אישה</h3>
                    <ul>
                        <li><strong>מזונות זמניים</strong> - משולמים במהלך הליך הגירושין</li>
                        <li><strong>מזונות משקמים</strong> - לתקופה מוגבלת לאחר הגירושין</li>
                        <li><strong>מזונות קבועים</strong> - במקרים מיוחדים (מחלה, גיל מתקדם)</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>השיקולים בקביעת מזונות אישה</h3>
                    <p>בית המשפט שוקל מספר גורמים: משך הנישואין, גיל האישה, מצבה הבריאותי, יכולת ההשתכרות שלה, רמת החיים במהלך הנישואין, ויכולותיו הכלכליות של הבעל.</p>
                </div>
'''
    },
    {
        'filename': 'guardianship.html',
        'title': 'אפוטרופסות',
        'meta_description': 'מינוי אפוטרופוס לקטינים ולחסויים. ייצוג בהליכי אפוטרופסות, פיקוח על אפוטרופוסים ודיווח לבית המשפט.',
        'keywords': 'אפוטרופסות, אפוטרופוס לקטין, אפוטרופוס לחסוי, מינוי אפוטרופוס, תל אביב',
        'h1_title': 'אפוטרופסות',
        'h2_subtitle': 'הגנה על אנשים שאינם יכולים לדאוג לעצמם',
        'category': 'family',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהי אפוטרופסות?</h3>
                    <p>אפוטרופסות היא מוסד משפטי המאפשר למנות אדם או גוף לדאוג לענייניו של מי שאינו מסוגל לדאוג לעצמו - בין אם קטין או בגיר (חסוי).</p>
                </div>
                <div class="content-section">
                    <h3>סוגי אפוטרופסות</h3>
                    <ul>
                        <li><strong>אפוטרופסות לגוף</strong> - טיפול בצרכים האישיים והרפואיים</li>
                        <li><strong>אפוטרופסות לרכוש</strong> - ניהול ענייניו הכספיים</li>
                        <li><strong>אפוטרופסות כללית</strong> - משלבת את שני הסוגים</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>תהליך מינוי אפוטרופוס</h3>
                    <p>מינוי אפוטרופוס מתבצע באמצעות פנייה לבית המשפט לענייני משפחה. משרדנו מלווה אתכם בכל שלבי ההליך, מהגשת הבקשה ועד לקבלת מינוי.</p>
                </div>
'''
    },
    # Inheritance - ירושות וצוואות
    {
        'filename': 'will-writing.html',
        'title': 'עריכת צוואה',
        'meta_description': 'עריכת צוואה מקצועית ותקפה משפטית. סוגי צוואות, הנחיות לעריכה נכונה והבטחת רצונותיכם לדורות הבאים.',
        'keywords': 'עריכת צוואה, צוואה בכתב יד, צוואה בעדים, צוואה נוטריונית, עורך דין צוואות, תל אביב',
        'h1_title': 'עריכת צוואה',
        'h2_subtitle': 'הבטחת רצונותיכם לדורות הבאים',
        'category': 'inheritance',
        'content_sections': '''
                <div class="content-section">
                    <h3>חשיבות עריכת צוואה</h3>
                    <p>צוואה היא מסמך משפטי המאפשר לאדם לקבוע כיצד יחולק רכושו לאחר פטירתו. עריכת צוואה מסודרת מונעת סכסוכים בין יורשים ומבטיחה שרכושכם יגיע למי שאתם רוצים.</p>
                </div>
                <div class="content-section">
                    <h3>סוגי צוואות</h3>
                    <ul>
                        <li><strong>צוואה בכתב יד</strong> - נכתבת כולה בכתב ידו של המצווה</li>
                        <li><strong>צוואה בעדים</strong> - נחתמת בפני שני עדים</li>
                        <li><strong>צוואה בפני רשות</strong> - נערכת בפני שופט או נוטריון</li>
                        <li><strong>צוואה בעל פה</strong> - במקרים חריגים של שכיב מרע</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>מה כוללת צוואה?</h3>
                    <p>צוואה יכולה לכלול חלוקת נכסים, מינוי מנהל עיזבון, הוראות לגבי קטינים, תנאים מיוחדים ועוד. משרדנו יסייע לכם לנסח צוואה שתשקף את רצונותיכם במלואם.</p>
                </div>
'''
    },
    {
        'filename': 'inheritance-order.html',
        'title': 'צו ירושה',
        'meta_description': 'הגשת בקשה לצו ירושה והוצאתו. מי זכאי לרשת על פי דין, חלוקת העיזבון וליווי משפטי מקצועי.',
        'keywords': 'צו ירושה, בקשה לצו ירושה, יורשים על פי דין, חלוקת עיזבון, תל אביב',
        'h1_title': 'צו ירושה',
        'h2_subtitle': 'מימוש זכויות הירושה על פי דין',
        'category': 'inheritance',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו צו ירושה?</h3>
                    <p>צו ירושה הוא מסמך משפטי הקובע מי הם היורשים החוקיים של אדם שנפטר ללא צוואה, ומהו חלקו של כל יורש בעיזבון.</p>
                </div>
                <div class="content-section">
                    <h3>מי יורש על פי דין?</h3>
                    <ul>
                        <li>בן/בת הזוג של המנוח</li>
                        <li>ילדי המנוח וצאצאיהם</li>
                        <li>הורי המנוח</li>
                        <li>אחים ואחיות וצאצאיהם</li>
                        <li>סבים וסבתות וצאצאיהם</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>הליך הוצאת צו ירושה</h3>
                    <p>הגשת בקשה לצו ירושה מתבצעת ברשם לענייני ירושה. משרדנו מלווה אתכם בכל שלבי ההליך, מאיסוף המסמכים ועד לקבלת הצו.</p>
                </div>
'''
    },
    {
        'filename': 'will-probate.html',
        'title': 'צו קיום צוואה',
        'meta_description': 'הגשת בקשה לצו קיום צוואה. אישור צוואה, בדיקת תקפותה וליווי משפטי בהליך הוצאת צו קיום.',
        'keywords': 'צו קיום צוואה, אישור צוואה, בקשה לקיום צוואה, רשם הירושות, תל אביב',
        'h1_title': 'צו קיום צוואה',
        'h2_subtitle': 'אישור והוצאה לפועל של צוואה',
        'category': 'inheritance',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו צו קיום צוואה?</h3>
                    <p>צו קיום צוואה הוא מסמך משפטי המאשר את תוקפה של צוואה ומאפשר לבצע את הוראותיה. ללא צו קיום, לא ניתן לחלק את העיזבון על פי הצוואה.</p>
                </div>
                <div class="content-section">
                    <h3>הליך קבלת צו קיום צוואה</h3>
                    <ul>
                        <li>הגשת בקשה לרשם לענייני ירושה</li>
                        <li>צירוף הצוואה המקורית</li>
                        <li>פרסום הבקשה לציבור</li>
                        <li>המתנה לתקופת ההתנגדויות</li>
                        <li>קבלת הצו (אם אין התנגדויות)</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>מה קורה אם יש התנגדות?</h3>
                    <p>אם מוגשת התנגדות לצוואה, התיק עובר לבית המשפט לענייני משפחה לדיון. משרדנו מייצג בהליכי התנגדות לצוואה ומגן על זכויות לקוחותינו.</p>
                </div>
'''
    },
    {
        'filename': 'estate-management.html',
        'title': 'ניהול עיזבון',
        'meta_description': 'ניהול עיזבון מקצועי, מינוי מנהל עיזבון, איסוף נכסים, תשלום חובות וחלוקה ליורשים.',
        'keywords': 'ניהול עיזבון, מנהל עיזבון, חלוקת עיזבון, נכסי עיזבון, תל אביב',
        'h1_title': 'ניהול עיזבון',
        'h2_subtitle': 'ניהול מקצועי והוגן של נכסי העיזבון',
        'category': 'inheritance',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו ניהול עיזבון?</h3>
                    <p>ניהול עיזבון כולל איסוף נכסי המנוח, תשלום חובותיו, וחלוקת היתרה ליורשים. במקרים מסוימים ממונה מנהל עיזבון לביצוע משימות אלו.</p>
                </div>
                <div class="content-section">
                    <h3>תפקידי מנהל העיזבון</h3>
                    <ul>
                        <li>איתור ואיסוף נכסי העיזבון</li>
                        <li>ניהול שוטף של הנכסים</li>
                        <li>תשלום חובות ומיסים</li>
                        <li>הגשת דוחות לבית המשפט</li>
                        <li>חלוקת העיזבון ליורשים</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>מתי נדרש מנהל עיזבון?</h3>
                    <p>מנהל עיזבון נדרש כאשר יש סכסוך בין יורשים, כאשר העיזבון מורכב, או כאשר המנוח קבע זאת בצוואתו.</p>
                </div>
'''
    },
    {
        'filename': 'will-contest.html',
        'title': 'התנגדות לצוואה',
        'meta_description': 'ייצוג בהליכי התנגדות לצוואה. עילות לפסילת צוואה, הליך ההתנגדות והגנה על זכויות יורשים.',
        'keywords': 'התנגדות לצוואה, פסילת צוואה, ביטול צוואה, השפעה בלתי הוגנת, תל אביב',
        'h1_title': 'התנגדות לצוואה',
        'h2_subtitle': 'הגנה על זכויותיכם כיורשים',
        'category': 'inheritance',
        'content_sections': '''
                <div class="content-section">
                    <h3>מתי ניתן להתנגד לצוואה?</h3>
                    <p>ניתן להגיש התנגדות לצוואה כאשר יש חשש שהצוואה אינה משקפת את רצונו האמיתי של המנוח, או כאשר נפלו פגמים בעריכתה.</p>
                </div>
                <div class="content-section">
                    <h3>עילות להתנגדות לצוואה</h3>
                    <ul>
                        <li>השפעה בלתי הוגנת על המצווה</li>
                        <li>העדר כשירות משפטית</li>
                        <li>פגמים צורניים בצוואה</li>
                        <li>זיוף הצוואה</li>
                        <li>טעות או הטעיה</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>הליך ההתנגדות</h3>
                    <p>התנגדות לצוואה מוגשת לרשם לענייני ירושה תוך 14 יום מפרסום הבקשה לצו קיום. משרדנו מייצג הן מתנגדים והן מגינים על צוואות.</p>
                </div>
'''
    },
    {
        'filename': 'inheritance-contest.html',
        'title': 'התנגדות לצו ירושה',
        'meta_description': 'ייצוג בהליכי התנגדות לצו ירושה. ערעור על זהות היורשים, חלקם בירושה והגנה על זכויותיכם.',
        'keywords': 'התנגדות לצו ירושה, ערעור על ירושה, זכויות יורשים, תל אביב',
        'h1_title': 'התנגדות לצו ירושה',
        'h2_subtitle': 'הגנה על זכויותיכם בחלוקת הירושה',
        'category': 'inheritance',
        'content_sections': '''
                <div class="content-section">
                    <h3>מתי מתנגדים לצו ירושה?</h3>
                    <p>התנגדות לצו ירושה מוגשת כאשר יש מחלוקת על זהות היורשים או על חלקם בירושה. הסיבות יכולות להיות טענה לקיום צוואה, טענה ליורש נוסף, או מחלוקת על סדר הירושה.</p>
                </div>
                <div class="content-section">
                    <h3>עילות להתנגדות</h3>
                    <ul>
                        <li>קיימת צוואה שלא הוצגה</li>
                        <li>יש יורש נוסף שלא צוין בבקשה</li>
                        <li>טעות בזיהוי היורשים</li>
                        <li>מחלוקת על חלקי הירושה</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>הליך ההתנגדות</h3>
                    <p>יש להגיש התנגדות תוך 14 יום מפרסום הבקשה. ההתנגדות תועבר לבית המשפט לענייני משפחה לדיון. משרדנו מלווה אתכם לאורך כל ההליך.</p>
                </div>
'''
    },
    # Insolvency - חדלות פירעון
    {
        'filename': 'bankruptcy.html',
        'title': 'חדלות פירעון / פשיטת רגל',
        'meta_description': 'ייצוג בהליכי חדלות פירעון ופשיטת רגל. מחיקת חובות, הסדרי חוב והתחלה חדשה בליווי עורך דין מומחה.',
        'keywords': 'חדלות פירעון, פשיטת רגל, מחיקת חובות, הסדר חוב, הפטר, תל אביב',
        'h1_title': 'חדלות פירעון / פשיטת רגל',
        'h2_subtitle': 'פתרונות משפטיים לחובות והתחלה חדשה',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהי חדלות פירעון?</h3>
                    <p>חדלות פירעון היא מצב בו אדם אינו מסוגל לשלם את חובותיו. חוק חדלות פירעון ושיקום כלכלי מאפשר לאנשים בחובות להגיע להסדר עם נושיהם ולקבל הזדמנות להתחלה חדשה.</p>
                </div>
                <div class="content-section">
                    <h3>יתרונות הליך חדלות פירעון</h3>
                    <ul>
                        <li>עצירת הליכי גבייה והוצאה לפועל</li>
                        <li>ביטול עיקולים</li>
                        <li>הקפאת חובות</li>
                        <li>אפשרות למחיקת חובות (הפטר)</li>
                        <li>שיקום כלכלי והתחלה חדשה</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>תהליך חדלות פירעון</h3>
                    <p>ההליך כולל הגשת בקשה לממונה על חדלות פירעון, בניית תכנית פירעון, ולאחר עמידה בתנאים - קבלת הפטר מהחובות.</p>
                </div>
'''
    },
    {
        'filename': 'execution.html',
        'title': 'הוצאה לפועל',
        'meta_description': 'ייצוג בהליכי הוצאה לפועל. הגנה על חייבים, ביטול עיקולים, הסדרי תשלומים והתמודדות עם נושים.',
        'keywords': 'הוצאה לפועל, עיקול, חייב, נושה, הסדר תשלומים, תל אביב',
        'h1_title': 'הוצאה לפועל',
        'h2_subtitle': 'הגנה על זכויותיכם מול מערכת ההוצאה לפועל',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהי הוצאה לפועל?</h3>
                    <p>הוצאה לפועל היא מערכת המאפשרת לנושים לגבות חובות באמצעות המדינה. המערכת יכולה להטיל עיקולים, לעקל רכוש ולנקוט באמצעים נוספים לגביית חוב.</p>
                </div>
                <div class="content-section">
                    <h3>שירותי המשרד בהוצאה לפועל</h3>
                    <ul>
                        <li>הגנה על חייבים מפני הליכי גבייה</li>
                        <li>ביטול עיקולים</li>
                        <li>משא ומתן עם נושים</li>
                        <li>הסדרי תשלומים</li>
                        <li>טענת "פרעתי"</li>
                        <li>התנגדות לביצוע שטר</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>זכויות החייב</h3>
                    <p>גם לחייב יש זכויות! החוק מגן על נכסים חיוניים, קובע סכום מחיה מינימלי, ומאפשר הגנות שונות. משרדנו יעזור לכם לממש את זכויותיכם.</p>
                </div>
'''
    },
    {
        'filename': 'case-consolidation.html',
        'title': 'איחוד תיקים',
        'meta_description': 'איחוד תיקי הוצאה לפועל לתיק אחד. הקלה בניהול החובות, תשלום חודשי אחד והתמודדות יעילה עם חובות.',
        'keywords': 'איחוד תיקים, איחוד תיקי הוצאה לפועל, ניהול חובות, תשלום חודשי, תל אביב',
        'h1_title': 'איחוד תיקים',
        'h2_subtitle': 'ניהול יעיל של כל החובות במקום אחד',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו איחוד תיקים?</h3>
                    <p>איחוד תיקים מאפשר לאחד את כל תיקי ההוצאה לפועל שלכם לתיק אחד. במקום לשלם לכל נושה בנפרד, משלמים תשלום חודשי אחד שמתחלק בין הנושים.</p>
                </div>
                <div class="content-section">
                    <h3>יתרונות איחוד תיקים</h3>
                    <ul>
                        <li>תשלום חודשי אחד במקום תשלומים מרובים</li>
                        <li>הגנה מפני עיקולים נוספים</li>
                        <li>ניהול מסודר של החובות</li>
                        <li>שקט נפשי ויציבות כלכלית</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>תנאים לאיחוד תיקים</h3>
                    <p>לא כל חייב זכאי לאיחוד תיקים. יש לעמוד בתנאים מסוימים ולהוכיח יכולת לשלם תשלום חודשי קבוע. משרדנו יבדוק את זכאותכם ויסייע בהגשת הבקשה.</p>
                </div>
'''
    },
    {
        'filename': 'travel-restriction.html',
        'title': 'עיכוב יציאה מהארץ',
        'meta_description': 'ביטול צו עיכוב יציאה מהארץ. ייצוג בהליכים להסרת עיכוב יציאה והגנה על חופש התנועה שלכם.',
        'keywords': 'עיכוב יציאה מהארץ, צו עיכוב יציאה, ביטול עיכוב יציאה, חופש תנועה, תל אביב',
        'h1_title': 'עיכוב יציאה מהארץ',
        'h2_subtitle': 'הסרת מגבלות על חופש התנועה שלכם',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו צו עיכוב יציאה מהארץ?</h3>
                    <p>צו עיכוב יציאה מהארץ הוא צו המונע מאדם לצאת מישראל. צו כזה יכול להינתן במסגרת הליכי הוצאה לפועל, תיקים פליליים, או סכסוכי משפחה.</p>
                </div>
                <div class="content-section">
                    <h3>מתי ניתן לבטל צו עיכוב יציאה?</h3>
                    <ul>
                        <li>תשלום החוב או חלק ממנו</li>
                        <li>הפקדת ערובה</li>
                        <li>הסדר תשלומים מוסכם</li>
                        <li>הוכחת הכרח לנסיעה (רפואי, עסקי)</li>
                        <li>ביטול בשל חוסר סבירות</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>פעולה מהירה</h3>
                    <p>צו עיכוב יציאה יכול להיות מופתע. משרדנו מספק מענה מהיר ויעיל להסרת עיכובי יציאה, כולל פניות דחופות לבית המשפט.</p>
                </div>
'''
    },
    {
        'filename': 'debt-cancellation.html',
        'title': 'מחיקת חובות',
        'meta_description': 'מחיקת חובות באמצעות הליכי חדלות פירעון. קבלת הפטר, מחיקת חובות בהוצאה לפועל והתחלה חדשה.',
        'keywords': 'מחיקת חובות, הפטר, חדלות פירעון, מחיקת חוב, פשיטת רגל, תל אביב',
        'h1_title': 'מחיקת חובות',
        'h2_subtitle': 'הזדמנות להתחלה כלכלית חדשה',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>האם ניתן למחוק חובות?</h3>
                    <p>כן! חוק חדלות פירעון מאפשר לאנשים שאינם מסוגלים לשלם את חובותיהם לקבל "הפטר" - מחיקה של חלק מהחובות או כולם, ולהתחיל מחדש.</p>
                </div>
                <div class="content-section">
                    <h3>דרכים למחיקת חובות</h3>
                    <ul>
                        <li><strong>הפטר בהליך חדלות פירעון</strong> - מחיקת חובות לאחר עמידה בתכנית פירעון</li>
                        <li><strong>הסדר נושים</strong> - הסכם לתשלום חלק מהחוב ומחיקת היתרה</li>
                        <li><strong>התיישנות</strong> - חובות שעברו תקופת ההתיישנות</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>מי זכאי למחיקת חובות?</h3>
                    <p>לא כל אחד זכאי למחיקת חובות. יש לבחון את מצבכם הכלכלי, סוג החובות והתנהלותכם. משרדנו יבדוק את המקרה שלכם ויציע את הדרך המתאימה.</p>
                </div>
'''
    },
    {
        'filename': 'lien-cancellation.html',
        'title': 'ביטול עיקולים',
        'meta_description': 'ביטול עיקולים על חשבון בנק, משכורת ורכוש. הגנה על נכסים חיוניים ומימוש זכויות החייב.',
        'keywords': 'ביטול עיקול, עיקול חשבון בנק, עיקול משכורת, עיקול רכוש, תל אביב',
        'h1_title': 'ביטול עיקולים',
        'h2_subtitle': 'הגנה על הנכסים והכנסות החיוניים שלכם',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>סוגי עיקולים</h3>
                    <ul>
                        <li><strong>עיקול חשבון בנק</strong> - הקפאת כספים בחשבון</li>
                        <li><strong>עיקול משכורת</strong> - ניכוי חלק מהמשכורת</li>
                        <li><strong>עיקול רכב</strong> - איסור מכירה או שימוש</li>
                        <li><strong>עיקול מקרקעין</strong> - רישום הערת אזהרה</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>מתי ניתן לבטל עיקול?</h3>
                    <ul>
                        <li>העיקול הוטל שלא כדין</li>
                        <li>הנכס מוגן מעיקול (מכונית למוגבל בניידות)</li>
                        <li>עיקול משכורת מעל המותר</li>
                        <li>פגמים פרוצדורליים</li>
                        <li>הסדר תשלומים</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>פעולה מיידית</h3>
                    <p>עיקול יכול לשתק את החיים. משרדנו מספק מענה מהיר - בדיקת העיקול, הגשת בקשה לביטול, וייצוג בדיונים.</p>
                </div>
'''
    },
    {
        'filename': 'debt-arrangements.html',
        'title': 'הסדרי חוב',
        'meta_description': 'הסדרי חוב עם נושים ובנקים. משא ומתן מקצועי להפחתת חובות, פריסת תשלומים ומניעת הליכים משפטיים.',
        'keywords': 'הסדר חוב, משא ומתן עם נושים, הפחתת חוב, פריסת תשלומים, תל אביב',
        'h1_title': 'הסדרי חוב',
        'h2_subtitle': 'פתרונות מותאמים אישית להסדרת החובות שלכם',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו הסדר חוב?</h3>
                    <p>הסדר חוב הוא הסכם בין החייב לנושים לתשלום החוב בתנאים מוסכמים. הסדר טוב יכול לכלול הפחתת החוב, פריסת תשלומים, או ביטול ריביות.</p>
                </div>
                <div class="content-section">
                    <h3>יתרונות הסדר חוב</h3>
                    <ul>
                        <li>הימנעות מהליכי הוצאה לפועל</li>
                        <li>הפחתה משמעותית בסכום החוב</li>
                        <li>פריסת תשלומים נוחה</li>
                        <li>ביטול ריביות והצמדות</li>
                        <li>שמירה על השם הטוב</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>משא ומתן מקצועי</h3>
                    <p>משרדנו מנהל משא ומתן מול נושים, בנקים וחברות אשראי. הניסיון שלנו מאפשר להגיע להסדרים טובים יותר מאלו שתוכלו להשיג בעצמכם.</p>
                </div>
'''
    },
    {
        'filename': 'discharge.html',
        'title': 'קבלת הפטר',
        'meta_description': 'קבלת הפטר מחובות בהליך חדלות פירעון. סיום ההליך, מחיקת החובות והתחלה חדשה נקייה.',
        'keywords': 'הפטר, קבלת הפטר, סיום חדלות פירעון, מחיקת חובות, תל אביב',
        'h1_title': 'קבלת הפטר',
        'h2_subtitle': 'הסיום המיוחל - מחיקת חובות והתחלה חדשה',
        'category': 'bankruptcy',
        'content_sections': '''
                <div class="content-section">
                    <h3>מהו הפטר?</h3>
                    <p>הפטר הוא צו של בית המשפט המשחרר את החייב מחובותיו. קבלת הפטר היא המטרה הסופית של הליך חדלות פירעון - מחיקת החובות והזדמנות להתחלה חדשה.</p>
                </div>
                <div class="content-section">
                    <h3>תנאים לקבלת הפטר</h3>
                    <ul>
                        <li>עמידה בתכנית הפירעון</li>
                        <li>שיתוף פעולה עם הממונה</li>
                        <li>חשיפת כל המידע הכלכלי</li>
                        <li>תום לב לאורך ההליך</li>
                    </ul>
                </div>
                <div class="content-section">
                    <h3>חובות שאינם נמחקים</h3>
                    <p>יש לדעת שחלק מהחובות אינם נמחקים בהפטר: קנסות פליליים, חובות מזונות, חובות שנוצרו במרמה. משרדנו ידאג להסביר לכם את כל ההשלכות.</p>
                </div>
'''
    }
]

# Create all pages
for page in pages:
    html_content = create_page(
        filename=page['filename'],
        title=page['title'],
        meta_description=page['meta_description'],
        keywords=page['keywords'],
        h1_title=page['h1_title'],
        h2_subtitle=page['h2_subtitle'],
        content_sections=page['content_sections'],
        category=page['category']
    )

    with open(page['filename'], 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Created: {page['filename']}")

print(f"\nDone! Created {len(pages)} pages.")
