# תכנית עבודה מלאה להנגשת yanivgil.co.il

## 📌 שלב 1 — בדיקה ותיקון קוד (הכרחי לפי החוק)

### ✔ ALT לכל תמונה

**מה צריך לעשות:**
- כל תגית `<img>` חייבת לכלול תכונת `alt` משמעותית
- תמונות דקורטיביות: `alt=""`
- תמונות תוכן: `alt` מתאר את התוכן

**Cursor instruction:**
```
Ensure every <img> tag in the project contains a meaningful alt attribute. 
When the image is purely decorative, use alt=''.
```

---

### ✔ מבנה כותרות H1/H2/H3

**מה צריך לעשות:**
- כל עמוד: רק H1 אחד
- המשך מבנה H2 / H3 לפי היגיון
- אין לדלג על רמות (לא H1 → H3)

**Cursor instruction:**
```
Fix heading structure so each page has exactly one H1, followed by H2, H3 in logical order.
No skipping heading levels (e.g., H1 → H3 is not allowed).
```

---

### ✔ ניגודיות צבעים

**מה צריך לעשות:**
- יחס ניגודיות מינימלי 4.5:1 לטקסט רגיל
- יחס ניגודיות מינימלי 3:1 לטקסט גדול (18pt+)

**Cursor instruction:**
```
Scan all CSS files for color combinations and fix any text/background ratio below 4.5:1 
using WCAG AA rules. For large text (18pt+), minimum ratio is 3:1.
```

---

### ✔ ניווט מקלדת

**מה צריך לעשות:**
- כל האלמנטים האינטראקטיביים נגישים דרך TAB
- Focus outline נראה בבירור

**Cursor instruction:**
```
Add keyboard focus outlines to all interactive elements:
:focus {
  outline: 3px solid #005fcc !important;
  outline-offset: 2px;
}
Ensure all interactive elements are keyboard accessible (TAB navigation).
```

---

### ✔ טפסים נגישים

**מה צריך לעשות:**
- כל שדה טופס עם `<label for="id">` מתאים
- הודעות שגיאה נגישות לקוראי מסך
- `aria-invalid` ו-`aria-describedBy` לשדות עם שגיאות

**Cursor instruction:**
```
Ensure all forms use <label for=""> with matching IDs.
Add aria-invalid and aria-describedBy attributes for error states.
Generate error messages that are readable by screen readers.
```

---

### ✔ ARIA roles

**מה צריך לעשות:**
- `role="navigation"` לתפריטים
- `aria-label` לכפתורים ללא טקסט
- `aria-expanded` לתפריטים נפתחים

**Cursor instruction:**
```
Add ARIA roles to navigation and interactive elements:
- <nav role="navigation">
- <button aria-label="פתיחת התפריט">
- <button aria-expanded="true/false"> for dropdowns
```

---

### ✔ Skip to Content Link

**מה צריך לעשות:**
- קישור "דלג לתוכן" בתחילת כל עמוד
- מופיע רק ב-focus

**Cursor instruction:**
```
Add skip-to-content link at the top of each page:
<a href="#main-content" class="skip-link">דלג לתוכן</a>
Style it to appear only on focus.
```

---

## 📌 שלב 2 — הוספת תוסף נגישות (רשות אבל מומלץ)

לא חובה חוקית, אבל **מאד מומלץ**, וגם רוב האתרים בארץ עושים את זה.

**אפשרויות:**
- Nagishli
- User1st
- EqualWeb
- Enable

**הטמעה ב-Cursor:**
```
Inject accessibility widget script into the <head> of every page template.
Example for EqualWeb:
<script src="https://cdn.equalweb.com/accessibility/equalweb.js"></script>
```

---

## 📌 שלב 3 — הוספת דף הצהרת נגישות (חובה)

**מה צריך לעשות:**
1. יצירת דף `accessibility.html` (כבר נוצר)
2. הוספת קישור בפוטר של כל עמוד

**Cursor instruction:**
```
Add link to accessibility.html in the footer of all pages:
<a href="accessibility.html">הצהרת נגישות</a>
```

---

## 📌 שלב 4 — בדיקה אוטומטית + ידנית

**כלים לבדיקה:**

1. **Lighthouse Accessibility** (Chrome DevTools)
   - F12 → Lighthouse → Accessibility
   - יעד: ציון 90+

2. **WAVE** (Web Accessibility Evaluation Tool)
   - https://wave.webaim.org/
   - הזנת URL לבדיקה

3. **axe DevTools**
   - תוסף לדפדפן
   - סריקה אוטומטית

4. **בדיקה ידנית:**
   - TAB / Shift + TAB בכל העמוד
   - בדיקת קורא מסך (NVDA / VoiceOver)
   - בדיקת זום עד 200%

---

## 📌 סדר ביצוע מומלץ

1. ✅ יצירת דף הצהרת נגישות
2. ✅ הוספת קישור בפוטר
3. 🔄 תיקון ALT לתמונות
4. 🔄 תיקון מבנה כותרות
5. 🔄 תיקון ניגודיות צבעים
6. 🔄 הוספת focus outlines
7. 🔄 תיקון טפסים
8. 🔄 הוספת ARIA roles
9. 🔄 הוספת skip link
10. 🔄 בדיקה עם Lighthouse
11. 🔄 בדיקה ידנית

---

## 📌 קבצים שצריכים תיקון

### HTML Files:
- `index.html`
- `contact.html`
- `about.html`
- `attorneys.html`
- `practice-areas.html`
- `articles.html`
- `blog.html`
- `media.html`
- כל עמודי הבלוג

### CSS Files:
- `css/base.css`
- `css/style.css`
- `css/pages.css`
- כל קבצי ה-CSS הרלוונטיים

### JavaScript Files:
- בדיקת נגישות בתפריטים
- בדיקת נגישות בטפסים

---

## 📌 קריטריונים ל-WCAG 2.0 AA

### Perceivable (ניתן לתפיסה)
- ✅ טקסט אלטרנטיבי לתמונות
- ✅ כותרות ומבנה
- ✅ ניגודיות צבעים

### Operable (ניתן להפעלה)
- ✅ ניווט מקלדת
- ✅ אין תוכן מהבהב
- ✅ כותרות לעמודים

### Understandable (ניתן להבנה)
- ✅ שפה מוגדרת (`lang="he"`)
- ✅ תוויות טופס
- ✅ הודעות שגיאה ברורות

### Robust (יציב)
- ✅ HTML תקין
- ✅ ARIA attributes
- ✅ תאימות לקוראי מסך

---

**תאריך עדכון:** נובמבר 2025

