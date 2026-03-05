import re

with open('articles.html', 'r', encoding='utf-8') as f:
    content = f.read()

BREADCRUMBS_DIV_RE = re.compile(r'<div\s+class="breadcrumbs">')
HERO_SECTION_RE = re.compile(r'<section\b[^>]*\bh-80vh\b[^>]*>')

bc_match = BREADCRUMBS_DIV_RE.search(content)
print(f"BC Match: {bc_match}")

if bc_match:
    hero_match = HERO_SECTION_RE.search(content, bc_match.start())
    print(f"Hero Match: {hero_match}")
