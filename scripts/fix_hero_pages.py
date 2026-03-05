import os

root = r"c:\Users\user\Desktop\yaniv"
files = [f for f in os.listdir(root) if f.endswith('.html') and f != 'index.html']

fixed = []

for f in files:
    path = os.path.join(root, f)
    with open(path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    # LOOSE CHECKS
    has_bc = 'breadcrumbs' in content
    has_hero = 'h-80vh' in content
    already_fixed = 'has-hero-first' in content
    
    if has_bc and has_hero and not already_fixed:
        print(f"Applying fix to {f}")
        
        # 1. Update <main> or #main-content class
        # Look for the opening tag of main
        if '<main' in content:
            # Simple replacement for the most common pattern
            content = content.replace('class="pt-24"', 'class="has-hero-first"')
            # Also handle potential variations
            content = content.replace('class=" pt-24"', 'class=" has-hero-first"')
        
        # 2. Extract and remove breadcrumbs
        # Find index of breadcrumbs class
        bc_class_idx = content.find('class="breadcrumbs"')
        div_start = content.rfind('<div', 0, bc_class_idx)
        
        if div_start != -1:
            # Correctly handle nesting to find closing </div>
            depth = 0
            div_end = -1
            for i in range(div_start, len(content)):
                if content[i:i+4] == '<div':
                    depth += 1
                elif content[i:i+6] == '</div>':
                    depth -= 1
                    if depth == 0:
                        div_end = i + 6
                        break
            
            if div_end != -1:
                bc_html = content[div_start:div_end]
                content = content[:div_start] + content[div_end:]
        
        # 3. Inject simplified breadcrumbs into hero relative z-10
        # Look for the relative z-10 dive inside the h-80vh section
        hero_pos = content.find('h-80vh')
        z10_pos = content.find('z-10', hero_pos)
        
        if z10_pos != -1:
            tag_end = content.find('>', z10_pos) + 1
            
            page_name = "פרסומים" if ('blog' in f or 'article' in f) else "מידע משפטי"
            
            new_bc = f'''
            <nav aria-label="Breadcrumb" style="margin-bottom: 20px;">
                <ol style="display: flex; justify-content: center; list-style: none; padding: 0; gap: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.7);">
                    <li><a href="index.html" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">בית</a></li>
                    <li style="opacity: 0.5;">/</li>
                    <li><span style="color: rgba(255,255,255,0.5);">{page_name}</span></li>
                </ol>
            </nav>
'''
            content = content[:tag_end] + new_bc + content[tag_end:]
        
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
        fixed.append(f)
    else:
        # print(f"Skipping {f}: bc={has_bc}, hero={has_hero}, fixed={already_fixed}")
        pass

print(f"Done. Fixed {len(fixed)} files: {', '.join(fixed)}")
