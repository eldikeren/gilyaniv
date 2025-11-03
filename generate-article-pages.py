#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to extract blog articles from blog.html and create individual article pages
"""

import re
import os
import json
from html import unescape

def slugify(title):
    """Create a URL-friendly slug from Hebrew title"""
    # For Hebrew titles, we'll use a numeric approach or transliteration
    # For now, using a simple numeric approach
    title_map = {
        "ערעורים בפשיטת רגל": "bankruptcy-appeals",
        "מינוי כונס נכסים זמני": "temporary-receiver",
        "הפטר בפש\"ר": "bankruptcy-discharge",
        "הפטר בפש'ר": "bankruptcy-discharge",
        "הפטר בפש": "bankruptcy-discharge",
        "הכרזה על פשיטת רגל - התנאים וההליכים": "bankruptcy-declaration",
        "ההגבלות על פושט הרגל": "bankruptcy-restrictions",
        "פיצוי על סירוב גט - חידוש בפסיקה": "get-refusal-compensation",
        "עילות גירושין בדין העברי": "divorce-grounds",
        "צו עיכוב יציאה מהארץ": "travel-restriction-order",
        "עיקול ועיקול מקרקעין": "seizure-real-estate",
        "מימוש משכנתא": "mortgage-execution",
        "טענת 'פרעתי' - סעיף 19 לחוק ההוצל'פ": "paid-defense",
        "דרכים למימוש שטר": "execution-of-bills",
        "סדר הדין האחיד לכל הסמכויות השיפוטיות": "uniform-civil-procedure",
        "תביעה על סכום קצוב": "fixed-amount-claims",
        "מבוא להליך פשיטת רגל": "bankruptcy-introduction",
        "בקשה למתן צו כינוס נכסים": "receivership-order-request",
        "צו כינוס נכסים לבקשת החייב (פשיטת רגל)": "receivership-order-debtor",
        "פשרה או הסדר לאחר ההכרזה על החייב כפושט רגל": "compromise-after-bankruptcy",
        "נישואים אזרחיים בישראל": "civil-marriage-israel",
        "בית דין רבני - סמכויות והליכים": "rabbinical-court",
        "בית המשפט לענייני משפחה": "family-court",
        "חוק הוצאה לפועל וחוקים אחרים": "execution-law-other-laws",
    }
    return title_map.get(title, title.replace(" ", "-").replace("'", "").replace("\"", ""))

def extract_articles(html_content):
    """Extract all articles from blog.html"""
    articles = []
    
    # Find all article opening tags with their positions
    # Pattern to match: <article ... data-title="..." data-category="..." data-date="..." ...>
    # Try more flexible pattern - attribute order might vary
    article_start_pattern = r'<article[^>]*data-title="([^"]*)"[^>]*data-category="([^"]*)"[^>]*data-date="([^"]*)"[^>]*>'
    
    # Also try alternative pattern where attributes are in different order
    article_start_pattern_alt = r'<article[^>]*data-category="([^"]*)"[^>]*data-date="([^"]*)"[^>]*data-title="([^"]*)"[^>]*>'
    
    matches = list(re.finditer(article_start_pattern, html_content))
    alt_matches = []
    if not matches:
        alt_match_objs = list(re.finditer(article_start_pattern_alt, html_content))
        if alt_match_objs:
            # Convert to same format: (start_pos, title, category, date)
            alt_matches = [(m.start(), m.group(3), m.group(1), m.group(2)) for m in alt_match_objs]
    
    print(f"Found {len(matches)} article opening tags (main pattern)")
    if alt_matches:
        print(f"Found {len(alt_matches)} article opening tags (alt pattern)")
    
    # If still no matches, try even simpler pattern
    if not matches and not alt_matches:
        simple_pattern = r'data-title="([^"]*)"'
        title_matches = list(re.finditer(simple_pattern, html_content))
        print(f"Found {len(title_matches)} data-title attributes")
        if title_matches:
            # Show first few matches for debugging
            for i, m in enumerate(title_matches[:3]):
                print(f"  Match {i+1}: {m.group(1)} at position {m.start()}")
        return []
    
    # Process matches
    all_matches = []
    for match in matches:
        all_matches.append((match.start(), match.group(1), match.group(2), match.group(3)))
    all_matches.extend(alt_matches)
    
    # Sort by position
    all_matches.sort(key=lambda x: x[0])
    
    for i, match_data in enumerate(all_matches):
        start_pos, title, category, date = match_data
        
        # Find the closing </article> tag for this article
        # Since articles are not nested, just find the next </article> after this opening tag
        # Search for the closing tag starting after the opening tag
        article_open_end = html_content.find('>', start_pos)
        if article_open_end == -1:
            print(f"Warning: Could not find closing '>' for article opening tag: {title}")
            continue
        
        # Find the next </article> tag
        closing_tag_pos = html_content.find('</article>', article_open_end + 1)
        if closing_tag_pos == -1:
            print(f"Warning: Could not find closing tag for article: {title}")
            continue
        
        end_pos = closing_tag_pos + 10  # 10 is length of '</article>'
        
        if end_pos <= start_pos:
            print(f"Warning: Could not find closing tag for article: {title}")
            continue
        
        article_html = html_content[start_pos:end_pos]
        
        # Extract meta info (category, date, author)
        meta_match = re.search(r'<span class="px-3 py-1[^>]*>([^<]+)</span>\s*<span>([^<]+)</span>\s*<span>([^<]+)</span>', article_html)
        if meta_match:
            category_display = meta_match.group(1)
            date_display = meta_match.group(2)
            author = meta_match.group(3)
        else:
            category_display = category
            date_display = date
            author = "עו״ד יניב גיל"
        
        # Extract article content (the div with class article-content)
        # Need to handle nested divs properly
        content_match = re.search(r'<div class="article-content">(.*?)(?=</div>\s*</article>)', article_html, re.DOTALL)
        if content_match:
            content = content_match.group(1)
            # Remove the closing </div> if it's in there
            content = content.rstrip().rstrip('</div>').rstrip()
            
            # Remove "קרא עוד" links and preview-only text from the content
            # Remove links to blog-articles (these shouldn't be in the full article pages)
            # Match anchor tags with blog-articles href - be more aggressive
            content = re.sub(r'<a[^>]*href\s*=\s*["\']blog-articles/[^"\']*["\'][^>]*>.*?</a\s*>', '', content, flags=re.DOTALL | re.IGNORECASE)
            # Also catch self-closing or malformed anchor tags
            content = re.sub(r'<a[^>]*href\s*=\s*["\']blog-articles/[^"\']*["\'][^>]*/?>', '', content, flags=re.IGNORECASE)
            
            # Remove any empty anchor tags that might be left (including malformed ones)
            content = re.sub(r'<a[^>]*>\s*</a\s*>', '', content, flags=re.DOTALL)
            content = re.sub(r'<a[^>]*/>', '', content)
            # Remove orphaned closing anchor tags
            content = re.sub(r'</a\s*>', '', content)
            content = re.sub(r'</a\s*$', '', content)
            
            # Remove "קרא עוד" or "קרא את המאמר המלא" text from paragraphs (preview text)
            content = re.sub(r'קרא עוד\s*←?\s*', '', content)
            content = re.sub(r'קרא את המאמר המלא\s*←?\s*', '', content)
            
            # Clean up any double spaces (but preserve newlines in HTML)
            content = re.sub(r'([^\n])\s+([^\n])', r'\1 \2', content)
            content = re.sub(r'<p[^>]*>\s*</p>', '', content)
            
            # Strip any trailing whitespace
            content = content.strip()
        else:
            # Fallback: try to get everything between h2 and closing article
            h2_match = re.search(r'<h2[^>]*>.*?</h2>(.*?)(?=</article>)', article_html, re.DOTALL)
            if h2_match:
                content = h2_match.group(1).strip()
                # Remove "קרא עוד" links
                content = re.sub(r'<a[^>]*href=["\']blog-articles/[^"\']*["\'][^>]*>.*?קרא עוד.*?</a>', '', content, flags=re.DOTALL | re.IGNORECASE)
                content = re.sub(r'<a[^>]*href=["\']blog-articles/[^"\']*["\'][^>]*>.*?קרא את המאמר המלא.*?</a>', '', content, flags=re.DOTALL | re.IGNORECASE)
            else:
                content = article_html
        
        articles.append({
            'title': title,
            'category': category,
            'category_display': category_display,
            'date': date,
            'date_display': date_display,
            'author': author,
            'content': content,
            'slug': slugify(title)
        })
    
    return articles

def read_header_footer_template():
    """Read header and footer sections from blog.html"""
    with open('blog.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract header (everything before <main>)
    header_match = re.search(r'(.*?)<main', content, re.DOTALL)
    header = header_match.group(1) if header_match else ""
    
    # Remove DOCTYPE from header (we'll add it separately)
    header = re.sub(r'<!DOCTYPE\s+html[^>]*>\s*', '', header, flags=re.IGNORECASE)
    header = header.lstrip()
    
    # Extract footer (everything after </main>)
    footer_match = re.search(r'</main>(.*?)$', content, re.DOTALL)
    footer = footer_match.group(1) if footer_match else ""
    
    return header, footer

def load_full_articles():
    """Load full article content from JSON file if it exists"""
    full_content = {}
    json_path = 'full-articles-content.json'
    if os.path.exists(json_path):
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                full_content = json.load(f)
        except Exception as e:
            print(f"  Warning: Could not load full articles: {e}")
    return full_content

def create_article_page(article, header_template, footer_template, full_articles_db=None):
    """Create individual HTML page for an article"""
    
    # Generate page title and meta
    page_title = f"{article['title']} - עו״ד יניב גיל"
    meta_description = f"{article['title']} - מאמר מקצועי מאת עו״ד יניב גיל בנושא {article['category']}"
    
    # Use full content if available, otherwise use preview content
    # JSON now uses slugs as keys directly
    full_content = None
    if full_articles_db:
        article_slug = article['slug']
        # Try direct slug lookup (new format)
        if article_slug in full_articles_db:
            full_content = full_articles_db[article_slug]
        # Fallback: try title match (old format)
        elif article['title'] in full_articles_db:
            full_content = full_articles_db[article['title']]
    
    if full_content:
        article['content'] = full_content
        print(f"  ✅ Using full content for: {article['title']}")
    else:
        print(f"  ⚠️ Using preview content for: {article['title']} (not found in full articles DB)")
    
    # Modify header to include article-specific meta
    header = header_template.replace(
        '<title>בלוג משפטי - עו"ד יניב גיל - מאמרים מקצועיים בנושא פשיטת רגל</title>',
        f'<title>{page_title}</title>'
    ).replace(
        '<meta name="description" content="בלוג משפטי מקצועי של עו״ד יניב גיל - מאמרים מפורטים בנושא פשיטת רגל, חדלות פירעון, דיני משפחה ועוד. מידע עדכני ומקצועי לקהל הרחב.">',
        f'<meta name="description" content="{meta_description}">'
    ).replace(
        '<link rel="canonical" href="https://www.yanivgil.co.il/blog.html">',
        f'<link rel="canonical" href="https://www.yanivgil.co.il/blog-articles/{article["slug"]}.html">'
    ).replace(
        '<meta property="og:url" content="https://www.yanivgil.co.il/blog.html">',
        f'<meta property="og:url" content="https://www.yanivgil.co.il/blog-articles/{article["slug"]}.html">'
    )
    
    # Fix relative paths in header_template and footer_template for blog-articles subdirectory
    # Since article pages are in blog-articles/ subdirectory, all links to main pages need ../ prefix
    fixed_header = header_template
    # Fix href attributes: replace href="page.html" with href="../page.html" (but skip if already has ../ or http)
    fixed_header = re.sub(r'href="(?!\.\./|https?://|#|tel:|mailto:)(index\.html|about\.html|attorneys\.html|practice-areas\.html|articles\.html|blog\.html|contact\.html|media\.html)', r'href="../\1', fixed_header)
    # Fix src attributes for images
    fixed_header = re.sub(r'src="(?!\.\./|https?://)(images/)', r'src="../\1', fixed_header)
    # Fix practice area pages
    fixed_header = re.sub(r'href="(?!\.\./|https?://|#|tel:|mailto:)(family-law\.html|divorce-law\.html|inheritance-wills\.html|insolvency\.html)', r'href="../\1', fixed_header)
    
    # Fix footer paths too
    fixed_footer = footer_template
    fixed_footer = re.sub(r'href="(?!\.\./|https?://|#|tel:|mailto:)(index\.html|about\.html|attorneys\.html|practice-areas\.html|articles\.html|blog\.html|contact\.html|media\.html)', r'href="../\1', fixed_footer)
    fixed_footer = re.sub(r'src="(?!\.\./|https?://)(images/)', r'src="../\1', fixed_footer)
    fixed_footer = re.sub(r'href="(?!\.\./|https?://|#|tel:|mailto:)(family-law\.html|divorce-law\.html|inheritance-wills\.html|insolvency\.html)', r'href="../\1', fixed_footer)
    
    # Create article page HTML
    html = f"""<!DOCTYPE html>
{fixed_header}
<body class="bg-gray-50 text-gray-800">
    <!-- Header with floating/shrinking effect -->
    <header class="site-header fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ease-in-out py-6 shadow-md" role="banner" id="site-header">
        <div class="container mx-auto px-4 flex justify-between items-center transition-all duration-300 ease-in-out">
            <div style="display: flex; align-items: center; gap: 15px;">
                <a href="../index.html">
                    <img src="../images/new-logo.png" alt="Yaniv Gil Law Office New Logo" class="header-logo" style="margin-left: 10px; display: block;">
                </a>
                <a href="../index.html" class="flex items-center gap-2 text-gray-800 transition-all duration-300 ease-in-out">
                    <img src="../images/Yaniv-Gil-Law-Office-Notary_text.avif" alt="Yaniv Gil Law Office Text" class="header-text-logo" onerror="this.src='https://placehold.co/192x32/1e3a8a/ffffff?text=Yaniv+Gil+Law+Office'">
                </a>
            </div>
            <nav class="hidden md:flex flex-1 justify-center">
                <ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">
                    <li><a href="../index.html" class="hover:text-[#b8941f] transition-colors duration-200">בית</a></li>
                    <li><a href="../index.html#about" class="hover:text-[#b8941f] transition-colors duration-200">אודות המשרד</a></li>
                    <li><a href="../attorneys.html" class="hover:text-[#b8941f] transition-colors duration-200">עורכי דין</a></li>
                    <li><a href="../practice-areas.html" class="hover:text-[#b8941f] transition-colors duration-200">תחומי התמחות</a></li>
                    <li><a href="../articles.html" class="hover:text-[#b8941f] transition-colors duration-200">פרסומים מקצועיים</a></li>
                    <li><a href="../blog.html" class="hover:text-[#b8941f] transition-colors duration-200">בלוג</a></li>
                    <li><a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" class="hover:text-[#b8941f] transition-colors duration-200" target="_blank" rel="noopener">ביקורות מלקוחות</a></li>
                    <li><a href="../contact.html" class="hover:text-[#b8941f] transition-colors duration-200">צור קשר</a></li>
                </ul>
            </nav>
            <!-- Mobile menu button -->
            <button id="mobile-menu-button" class="md:hidden flex items-center p-2 rounded-md text-gray-600 hover:text-[#b8941f] focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div class="flex items-center space-x-4 space-x-reverse">
                <a class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-5 py-3 text-base font-medium text-[#b8941f] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a]" href="tel:0548184581">
                    התקשר עכשיו
                </a>
            </div>
        </div>
        
        <!-- Full-screen Mobile Menu Overlay -->
        <div id="mobile-menu" class="mobile-menu-overlay">
            <button id="close-mobile-menu" class="mobile-menu-close">&times;</button>
            <div class="mobile-menu-content">
                <div class="mobile-menu-links">
                    <a href="../index.html" class="mobile-menu-link">בית</a>
                    <a href="../index.html#about" class="mobile-menu-link">אודות המשרד</a>
                    <a href="../attorneys.html" class="mobile-menu-link">עורכי דין</a>
                    <a href="../practice-areas.html" class="mobile-menu-link">תחומי התמחות</a>
                    <a href="../articles.html" class="mobile-menu-link">פרסומים מקצועיים</a>
                    <a href="../blog.html" class="mobile-menu-link">בלוג</a>
                    <a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" class="mobile-menu-link" target="_blank" rel="noopener">ביקורות מלקוחות</a>
                    <a href="../contact.html" class="mobile-menu-link">צור קשר</a>
                </div>
            </div>
        </div>
    </header>

    <main class="pt-24">
        <!-- Article Content -->
        <section class="py-16">
            <div class="container mx-auto px-4 max-w-4xl">
                <!-- Breadcrumb -->
                <nav class="mb-6 text-sm text-gray-600">
                    <a href="../index.html" class="hover:text-[#b8941f]">בית</a>
                    <span class="mx-2">/</span>
                    <a href="../blog.html" class="hover:text-[#b8941f]">בלוג</a>
                    <span class="mx-2">/</span>
                    <span class="text-gray-800">{article['title']}</span>
                </nav>
                
                <!-- Article Header -->
                <article class="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <div class="article-meta mb-6">
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <span class="px-3 py-1 bg-[#c9a55c] text-[#1a1a1a] rounded-full font-medium">{article['category_display']}</span>
                            <span>{article['date_display']}</span>
                            <span>{article['author']}</span>
                        </div>
                    </div>
                    
                    <h1 class="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a1a]">{article['title']}</h1>
                    
                    <!-- Article Content -->
                    <div class="prose prose-lg max-w-none article-content">
                        {article['content']}
                    </div>
                    
                    <!-- Back to Blog Link -->
                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <a href="../blog.html" class="inline-flex items-center text-[#c9a55c] hover:text-[#b8941f] font-medium transition-colors">
                            ← חזרה לבלוג
                        </a>
                    </div>
                </article>
            </div>
        </section>
    </main>
    
    {fixed_footer}

    <!-- JavaScript -->
    <script>
        // Script for the shrinking header effect
        window.addEventListener('scroll', function() {{
            const header = document.getElementById('site-header');
            if (window.scrollY > 50) {{
                header.classList.add('scrolled');
            }} else {{
                header.classList.remove('scrolled');
            }}
        }});

        // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {{
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const closeMenuButton = document.getElementById('close-mobile-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
            
            // Open menu
            if (mobileMenuButton) {{
                mobileMenuButton.addEventListener('click', function() {{
                    mobileMenu.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }});
            }}
            
            // Close menu
            if (closeMenuButton) {{
                closeMenuButton.addEventListener('click', function() {{
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }});
            }}
            
            // Close menu when clicking a link
            mobileMenuLinks.forEach(link => {{
                link.addEventListener('click', function() {{
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }});
            }});
            
            // Close menu when clicking outside
            if (mobileMenu) {{
                mobileMenu.addEventListener('click', function(e) {{
                    if (e.target === mobileMenu) {{
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }}
                }});
            }}
        }});
    </script>
</body>
</html>"""
    
    return html

def main():
    # Read blog.html
    print("Reading blog.html...")
    with open('blog.html', 'r', encoding='utf-8') as f:
        blog_html = f.read()
    
    # Extract articles
    print("Extracting articles...")
    articles = extract_articles(blog_html)
    print(f"Found {len(articles)} articles")
    
    # Read header and footer templates
    print("Reading header and footer templates...")
    header_template, footer_template = read_header_footer_template()
    
    # Load full articles content if available
    print("Loading full articles content (if available)...")
    full_articles_db = load_full_articles()
    if full_articles_db:
        print(f"  Loaded {len([k for k in full_articles_db.keys() if not k.startswith('_')])} full articles")
    else:
        print("  No full articles file found - will use preview content")
    
    # Create blog-articles directory if it doesn't exist
    os.makedirs('blog-articles', exist_ok=True)
    
    # Generate individual pages
    print("\nGenerating article pages...")
    for i, article in enumerate(articles, 1):
        print(f"  [{i}/{len(articles)}] Creating {article['slug']}.html...")
        article_html = create_article_page(article, header_template, footer_template, full_articles_db)
        
        output_path = f"blog-articles/{article['slug']}.html"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(article_html)
    
    print(f"\n✅ Successfully created {len(articles)} article pages in blog-articles/")
    print("\nArticle URLs:")
    for article in articles:
        print(f"  - blog-articles/{article['slug']}.html ({article['title']})")

if __name__ == '__main__':
    main()

