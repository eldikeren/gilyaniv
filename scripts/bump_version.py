import os
import re

root = r"c:\Users\user\Desktop\yaniv"
html_files = [f for f in os.listdir(root) if f.endswith('.html')]

# Bump all version strings like ?v=8 to ?v=11
VERSION_RE = re.compile(r'\?v=\d+')

for f in html_files:
    path = os.path.join(root, f)
    with open(path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    new_content = VERSION_RE.sub('?v=11', content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Bumped version in {f}")

print("Done.")
