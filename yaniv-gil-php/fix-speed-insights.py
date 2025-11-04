#!/usr/bin/env python3
"""Fix Vercel Speed Insights module error in all HTML files"""
import os
import re

def fix_speed_insights(filepath):
    """Update Speed Insights script to use type='module' and error handling"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Pattern to match the Speed Insights script
        old_pattern = r'(<!-- Vercel Speed Insights -->\s*<script>\s*\(function\(\) \{[^}]*script\.src = [\'"]https://unpkg\.com/@vercel/speed-insights@latest/dist/index\.js[\'"];[^}]*script\.async = true;[^}]*document\.head\.appendChild\(script\);[^}]*\}\)\(\);?\s*</script>)'
        
        new_script = '''<!-- Vercel Speed Insights -->
    <script>
        (function() {
            try {
                var script = document.createElement('script');
                script.src = 'https://unpkg.com/@vercel/speed-insights@latest/dist/index.js';
                script.async = true;
                script.type = 'module';
                document.head.appendChild(script);
            } catch(e) {
                // Silently fail if module error occurs
            }
        })();
    </script>'''
        
        # Replace if found
        if re.search(old_pattern, content, re.DOTALL):
            content = re.sub(old_pattern, new_script, content, flags=re.DOTALL | re.IGNORECASE)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Find and update all HTML files"""
    html_files = []
    
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root:
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                # Skip backup/temp files
                if 'backup' not in filepath and 'temp' not in filepath and 'before' not in filepath:
                    html_files.append(filepath)
    
    updated = 0
    for filepath in html_files:
        if fix_speed_insights(filepath):
            print(f"✓ Updated: {filepath}")
            updated += 1
    
    print(f"\n✓ Total files updated: {updated}/{len(html_files)}")

if __name__ == '__main__':
    main()

