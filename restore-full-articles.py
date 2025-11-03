#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to restore full article content to individual blog article pages.
Since blog.html only contains previews, we need to get full content from another source.
"""

# Full article content mapping - you'll need to provide full content for each article
FULL_ARTICLES = {
    "ערעורים בפשיטת רגל": """
    <p>קיימות 5 אפשרויות שקבעה הפסיקה לגבי ערעורים בהליכי פשיטת רגל:</p>
    
    <h3>סוגי הערעורים</h3>
    
    <p><strong>צו בפשיטת רגל - ערעור בזכות (לעליון)</strong></p>
    <p>סעיף 61(א) לחוק חדלות פירעון – ניתן לערער בזכות על כל החלטה שנתנה הערכאה המחוזית בפשיטת רגל, למעט החלטות המפורטות בסעיף 61(ב).</p>
    
    <p><strong>ערעור ברשות (לעליון)</strong></p>
    <p>על החלטות מסוימות ניתן לערער ברשות בלבד – סעיף 61(ב) קובע רשימה סגורה של החלטות שניתן לערער עליהן ברשות בלבד.</p>
    
    <p><strong>ערעור על החלטת רשם</strong></p>
    <p>סעיף 61(ג) – על החלטות הרשם ניתן לערער לבית המשפט המחוזי, ורק לאחר מכן ניתן לערער לעליון.</p>
    
    <p><strong>ערעור על החלטות מנהליות</strong></p>
    <p>תלוי בטיבה של הערכאה – אין דין אחיד. במקרים מסוימים ניתן לערער ישירות לעליון, במקרים אחרים דרך המחוזי.</p>
    
    <p><strong>בקשה לשקול מחדש</strong></p>
    <p>במקרים מסוימים ניתן להגיש בקשה לשקול מחדש החלטה, ולא ערעור רגיל.</p>
    
    <h3>מועדי ערעור</h3>
    <p>על פי סעיף 62 לחוק חדלות פירעון, ערעור צריך להיות מוגש תוך 45 ימים מהיום שבו ניתנה ההחלטה המחוקקת או מהיום שבו נודע למבקש על ההחלטה.</p>
    
    <h3>הליך הערעור</h3>
    <p>ערעור מוגש לבית המשפט העליון בצירוף עותק לבעלי הדין האחרים. בית המשפט יכול לדחות את הערעור ללא דיון אם הוא סובר שהערעור אינו עולה לדיון או שאין בו ממש.</p>
    
    <p>בסיכום, חשוב להבין כי מערכת הערעורים בפשיטת רגל היא מורכבת וניתן לערער על החלטות רבות, אך כל סוג ערעור דורש התאמה לנסיבות הספציפיות של המקרה.</p>
    """,
    
    # Add more full articles here as needed
    # The key is the article title (data-title from blog.html)
}

def update_article_with_full_content(article_file, full_content):
    """Update an article file with full content"""
    import re
    
    with open(article_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the article-content div and replace its content
    pattern = r'(<div class="prose prose-lg max-w-none article-content">\s*)(.*?)(\s*</div>)'
    
    replacement = rf'\1{full_content}\3'
    updated_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(article_file, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"Updated: {article_file}")

if __name__ == '__main__':
    print("This script needs full article content to be added to FULL_ARTICLES dictionary.")
    print("Please provide the full content for each article, or restore from backup.")

