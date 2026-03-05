import os
import re

root = r"c:\Users\user\Desktop\yaniv"
files = [f for f in os.listdir(root) if f.endswith('.html') and f != 'index.html']

fixed_count = 0

for f in files:
    path = os.path.join(root, f)
    with open(path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    # 1. Ensure has-hero-first exists on pages with h-80vh
    if 'h-80vh' in content and 'has-hero-first' not in content:
        content = content.replace('class="pt-24"', 'class="has-hero-first"')
        content = content.replace('class=" pt-24"', 'class=" has-hero-first"')
    
    # 2. Aggressively remove any breadcrumbs div outside the hero section
    # Search for <div class="breadcrumbs">...</div> that is NOT inside the inject
    if 'class="breadcrumbs"' in content:
        # Pattern to find the breadcrumbs div
        bc_start = content.find('class="breadcrumbs"')
        div_opening = content.rfind('<div', 0, bc_start)
        if div_opening != -1:
            depth = 0
            div_end = -1
            for i in range(div_opening, len(content)):
                if content[i:i+4] == '<div': depth += 1
                elif content[i:i+6] == '</div>':
                    depth -= 1
                    if depth == 0:
                        div_end = i + 6
                        break
            if div_end != -1:
                # Remove it
                content = content[:div_opening] + content[div_end:]
                content = content.replace('<!-- Breadcrumbs -->', '')

    # 3. Ensure the INJECTED breadcrumb exists inside the hero
    if 'h-80vh' in content and 'aria-label="Breadcrumb"' not in content:
        z10_pos = content.find('class="relative z-10"')
        if z10_pos != -1:
            tag_end = content.find('>', z10_pos) + 1
            page_name = "פרסומים" if ('blog' in f or 'article' in f) else "מידע משפטי"
            new_bc = f'''
            <nav aria-label="Breadcrumb" style="margin-bottom: 20px;">
                <ol style="display: flex; justify-content: center; list-style: none; padding: 0; gap: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.7); direction: rtl;">
                    <li><a href="index.html" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">בית</a></li>
                    <li style="opacity: 0.5;">/</li>
                    <li><span style="color: rgba(255,255,255,0.5);">{page_name}</span></li>
                </ol>
            </nav>
'''
            content = content[:tag_end] + new_bc + content[tag_end:]

    # Save
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
    fixed_count += 1

print(f"Standardized {fixed_count} pages.")
