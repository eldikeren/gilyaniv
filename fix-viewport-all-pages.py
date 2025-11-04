import os
import glob

# Find all HTML files
html_files = glob.glob("*.html") + glob.glob("blog-articles/*.html")

old_viewport = 'content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"'
new_viewport = 'content="width=device-width, initial-scale=1.0, viewport-fit=cover"'

fixed_count = 0

for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_viewport in content:
            content = content.replace(old_viewport, new_viewport)
            
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✓ Fixed: {html_file}")
            fixed_count += 1
    except Exception as e:
        print(f"✗ Error in {html_file}: {e}")

print(f"\n✅ Fixed viewport in {fixed_count} files")

