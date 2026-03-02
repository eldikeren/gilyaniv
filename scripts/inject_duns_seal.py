import os
import re

def inject_seal(file_path, dry_run=False):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='windows-1255', errors='ignore') as f:
            content = f.read()

    # Define the seal HTML
    seal_html = '''<a href="https://www.dunsguide.co.il/business?duns=532460057" target="_blank" rel="noopener noreferrer" class="duns-seal-link" title="Duns & Bradstreet Gold Seal">
                    <img src="images/dunsguide_gold_seal.png" alt="Duns & Bradstreet Gold Seal" class="duns-seal" width="75" height="75">
                </a>'''

    # Check if already injected
    if 'dunsguide_gold_seal.png' in content:
        print(f"Skipping {file_path}: Seal already exists.")
        return False

    # Target: Main header logo div
    # Let's search for the second logo link and insert after it
    pattern1 = r'(<img src="images/Yaniv-Gil-Law-Office-Notary_text\.avif".*?</a>)'
    
    if re.search(pattern1, content, re.DOTALL):
        new_content = re.sub(pattern1, r'\1\n                ' + seal_html, content, flags=re.DOTALL)
        if not dry_run:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        return True
    
    # Fallback pattern for files with different text logo images or structures
    pattern2 = r'(class="header-text-logo".*?</a>)'
    if re.search(pattern2, content, re.DOTALL):
        new_content = re.sub(pattern2, r'\1\n                ' + seal_html, content, flags=re.DOTALL)
        if not dry_run:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        return True

    print(f"Could not find header pattern in {file_path}")
    return False

def main():
    root_dir = '.'
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    print(f"Found {len(html_files)} HTML files.")
    
    modified_count = 0
    for file_name in html_files:
        if inject_seal(file_name, dry_run=False):
            modified_count += 1
            print(f"Successfully injected seal into {file_name}")
            
    print(f"Finished. Modified {modified_count} files.")

if __name__ == "__main__":
    main()
