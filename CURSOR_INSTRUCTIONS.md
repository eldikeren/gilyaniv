# הוראות מלאות ל-Cursor — Copy/Paste

## 🟦 Cursor Instruction Block (העתק והדבק ישירות ל-Cursor)

```
Perform full accessibility compliance scan for WCAG 2.0 AA across the entire website codebase.

Mandatory fixes:

1. Add alt text to all images.
   - Every <img> tag must have a meaningful alt attribute
   - Decorative images: alt=""
   - Content images: descriptive alt text in Hebrew

2. Fix heading structure so each page has exactly one H1.
   - Follow logical hierarchy: H1 → H2 → H3
   - No skipping levels (e.g., H1 → H3 is not allowed)

3. Improve contrast ratios for any CSS text/background failing 4.5:1.
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text (18pt+)
   - Use WCAG AA contrast checker

4. Add keyboard focus outlines.
   - Add to all interactive elements:
     :focus {
       outline: 3px solid #005fcc !important;
       outline-offset: 2px;
     }
   - Ensure all interactive elements are keyboard accessible (TAB navigation)

5. Ensure all forms use <label for=""> with matching IDs.
   - Every input, select, textarea must have a corresponding label
   - Add aria-invalid and aria-describedBy for error states
   - Generate error messages readable by screen readers

6. Add aria-labels to buttons, icons, navigation items.
   - Buttons without text: aria-label="description"
   - Navigation: role="navigation" and aria-label
   - Icons: aria-label or aria-hidden="true" if decorative

7. Ensure navigation is fully keyboard accessible.
   - All links and buttons accessible via TAB
   - Dropdown menus work with keyboard
   - Mobile menu accessible via keyboard

8. Add role="navigation" to nav components and ARIA landmarks.
   - <nav role="navigation" aria-label="תפריט ראשי">
   - <main role="main">
   - <footer role="contentinfo">

9. Remove redundant clickable divs and replace with <button> or <a>.
   - No onClick on divs
   - Use semantic HTML: <button> for actions, <a> for navigation

10. Add skip-to-content link at the top of each page.
    - <a href="#main-content" class="skip-link">דלג לתוכן</a>
    - Style to appear only on focus:
      .skip-link {
        position: absolute;
        left: -9999px;
      }
      .skip-link:focus {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        padding: 1rem;
        background: #005fcc;
        color: white;
      }

After fixes:
• Run full Lighthouse accessibility scan on all pages
• Show me a diff of files changed
• Create a summary of all accessibility improvements made
```

---

## 🟦 הוראות ספציפיות לפי קובץ

### index.html
- [ ] בדוק שיש רק H1 אחד
- [ ] הוסף alt לכל התמונות
- [ ] הוסף skip link
- [ ] בדוק ניגודיות צבעים בטקסט
- [ ] הוסף aria-labels לכפתורים

### contact.html
- [ ] הוסף labels לכל שדות הטופס
- [ ] הוסף aria-invalid לשדות שגיאה
- [ ] הוסף aria-describedBy להודעות שגיאה
- [ ] בדוק נגישות מקלדת בטופס

### כל העמודים
- [ ] הוסף role="navigation" לתפריט
- [ ] הוסף role="main" לתוכן הראשי
- [ ] הוסף role="contentinfo" לפוטר
- [ ] בדוק focus outline על כל האלמנטים האינטראקטיביים

---

## 🟦 בדיקות אחרי התיקונים

### בדיקה אוטומטית:
```bash
# Lighthouse (Chrome DevTools)
1. פתח את האתר בדפדפן
2. F12 → Lighthouse
3. בחר Accessibility
4. לחץ "Generate report"
5. יעד: ציון 90+
```

### בדיקה ידנית:
1. **ניווט מקלדת:**
   - לחץ TAB בכל העמוד
   - ודא שכל האלמנטים נגישים
   - ודא שה-focus נראה בבירור

2. **קורא מסך:**
   - התקן NVDA (Windows) או VoiceOver (Mac)
   - הפעל את קורא המסך
   - נווט באתר עם קורא המסך
   - ודא שהתוכן נקרא נכון

3. **זום:**
   - הגדל את הטקסט ל-200%
   - ודא שהאתר עדיין קריא ופונקציונלי

---

## 🟦 קבצים לעדכון

### HTML:
- `index.html`
- `contact.html`
- `about.html`
- `attorneys.html`
- `practice-areas.html`
- `articles.html`
- `blog.html`
- `media.html`
- `partials/header.html`
- `partials/footer.html`

### CSS:
- `css/base.css` - הוסף focus styles
- `css/style.css` - בדוק ניגודיות
- כל קבצי ה-CSS הרלוונטיים

### JavaScript:
- בדוק שכל הפונקציונליות נגישה למקלדת
- ודא שתפריטים נפתחים עם מקלדת

---

## 🟦 סדר ביצוע מומלץ

1. **תחילה - תיקונים בסיסיים:**
   - ALT לתמונות
   - מבנה כותרות
   - Labels לטפסים

2. **אחר כך - תיקונים מתקדמים:**
   - ARIA roles
   - Focus outlines
   - Skip links

3. **לבסוף - בדיקות:**
   - Lighthouse
   - בדיקה ידנית
   - קורא מסך

---

**הערה:** אל תשנה את העיצוב או תשבור את הקוד הקיים. הוסף רק שיפורי נגישות.

