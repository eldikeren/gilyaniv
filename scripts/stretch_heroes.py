import os

root = r"c:\Users\user\Desktop\yaniv"
filenames = [f for f in os.listdir(root) if f.endswith('.html')]

fixed_count = 0

for f in filenames:
    path = os.path.join(root, f)
    with open(path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    modified = False
    
    # 1. Stretch hero section height (from 80vh to 90vh)
    if 'h-80vh' in content:
        content = content.replace('h-80vh', 'h-[90vh]')
        modified = True
    
    # 2. Fix index.html specific padding that overrides our CSS
    if f == 'index.html':
        if 'pt-28 pb-16 md:pt-0 md:pb-0' in content:
            content = content.replace('pt-28 pb-16 md:pt-0 md:pb-0', '')
            modified = True
            
    # 3. Ensure p-6 md:p-12 content wrapper has top padding to move text down further if needed
    # (Optional: the 180px on the section should be enough, but we can add more inside)
    
    # 4. Standardize any remaining inner-page breadcrumbs or has-hero-first
    if 'h-[90vh]' in content and 'has-hero-first' not in content:
        content = content.replace('class="pt-24"', 'class="has-hero-first"')
        content = content.replace('class=" pt-24"', 'class=" has-hero-first"')
        modified = True

    if modified:
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
        fixed_count += 1

print(f"Enhanced {fixed_count} pages with h-[90vh] and padding fixes.")
