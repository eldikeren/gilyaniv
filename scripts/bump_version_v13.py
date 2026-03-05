import os
import re

root = r"c:\Users\user\Desktop\yaniv"
html_files = [f for f in os.listdir(root) if f.endswith('.html')]

VERSION_RE = re.compile(r'\?v=\d+')
VERSION_JS_RE = re.compile(r'\?v=\d+') # same but explicit

for f in html_files:
    path = os.path.join(root, f)
    with open(path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    new_content = VERSION_RE.sub('?v=13', content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Bumped to v13 in {f}")

print("Done.")
