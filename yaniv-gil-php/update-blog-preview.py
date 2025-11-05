#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to update blog.html to show previews with links to individual article pages
"""

import re

# Mapping of article titles to their slugs
TITLE_TO_SLUG = {
    "ערעורים בפשיטת רגל": "bankruptcy-appeals",
    "מינוי כונס נכסים זמני": "temporary-receiver",
    "הפטר בפש\"ר": "bankruptcy-discharge",
    "הפטר בפש": "bankruptcy-discharge",  # Fallback for title parsing issue
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

def extract_preview(content_html, max_lines=4):
    """Extract first few lines from article content for preview"""
    # Remove HTML tags to get text
    text_content = re.sub(r'<[^>]+>', '', content_html)
    # Split by line breaks and periods
    sentences = re.split(r'[.\n]', text_content)
    # Filter out empty sentences
    sentences = [s.strip() for s in sentences if s.strip()]
    
    # Take first max_lines sentences
    preview_text = ' '.join(sentences[:max_lines])
    if len(sentences) > max_lines:
        preview_text += '...'
    
    return preview_text

def update_blog_html():
    """Update blog.html to show previews with links"""
    
    with open('blog.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Pattern to match article blocks
    article_pattern = r'(<article[^>]*data-title="([^"]*)"[^>]*>)(.*?)(</article>)'
    
    def replace_article(match):
        article_open = match.group(1)
        title = match.group(2)
        article_content = match.group(3)
        article_close = match.group(4)
        
        # Get slug for this article
        slug = TITLE_TO_SLUG.get(title, '')
        if not slug:
            print(f"Warning: No slug found for article: {title}")
            return match.group(0)  # Return original if no slug
        
        # Extract meta and h2 from article content
        meta_match = re.search(r'(<div class="article-meta">.*?</div>)', article_content, re.DOTALL)
        h2_match = re.search(r'(<h2[^>]*>.*?</h2>)', article_content, re.DOTALL)
        content_div_match = re.search(r'<div class="article-content">(.*?)</div>', article_content, re.DOTALL)
        
        meta_html = meta_match.group(1) if meta_match else ''
        h2_html = h2_match.group(1) if h2_match else f'<h2 class="text-2xl font-bold mb-4 text-[#1a1a1a]">{title}</h2>'
        full_content = content_div_match.group(1) if content_div_match else ''
        
        # Create preview (first paragraph or first ~150 chars)
        preview_text = extract_preview(full_content, max_lines=3)
        if len(full_content) > len(preview_text) + 100:  # If there's more content
            # Create preview version with link
            preview_html = f"""
                    <div class="article-content">
                        <p class="text-gray-600 mb-4">{preview_text}</p>
                        <a href="blog-articles/{slug}.html" class="inline-flex items-center text-[#c9a55c] hover:text-[#b8941f] font-semibold transition-colors mt-4">
                            קרא עוד ←
                        </a>
                    </div>"""
        else:
            # If content is short, show full but still link to article page
            preview_html = f"""
                    <div class="article-content">
                        {full_content}
                        <a href="blog-articles/{slug}.html" class="inline-flex items-center text-[#c9a55c] hover:text-[#b8941f] font-semibold transition-colors mt-4">
                            קרא את המאמר המלא ←
                        </a>
                    </div>"""
        
        # Reconstruct article with preview
        new_article = f"""{article_open}
                    {meta_html}
                    {h2_html}
                    {preview_html}
                {article_close}"""
        
        return new_article
    
    # Replace all articles
    updated_html = re.sub(article_pattern, replace_article, html_content, flags=re.DOTALL)
    
    # Remove expand/collapse JavaScript and CSS
    # Remove truncation styles
    updated_html = re.sub(r'/\* Article truncation styles \*/(.*?)(?=</style>)', '', updated_html, flags=re.DOTALL)
    
    # Remove expand/collapse JavaScript function
    updated_html = re.sub(r'// Article expand/collapse functionality.*?initArticleTruncation\(\);', '', updated_html, flags=re.DOTALL)
    updated_html = re.sub(r'function initArticleTruncation.*?}\s*}\s*}', '', updated_html, flags=re.DOTALL)
    updated_html = re.sub(r'setTimeout\(initArticleTruncation, 50\);', '', updated_html)
    updated_html = re.sub(r'initArticleTruncation\(\);', '', updated_html)
    
    # Write updated HTML
    with open('blog.html', 'w', encoding='utf-8') as f:
        f.write(updated_html)
    
    print("✅ Updated blog.html with previews and links")
    print(f"✅ Removed expand/collapse functionality")
    print(f"✅ Added links to {len(TITLE_TO_SLUG)} article pages")

if __name__ == '__main__':
    update_blog_html()

