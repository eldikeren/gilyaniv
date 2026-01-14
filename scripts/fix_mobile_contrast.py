
import os

def fix_contrast():
    # Target the specific sub-menu link class string used in the mobile menu
    target_str = 'class="block py-2 text-sm text-gray-800 hover:text-[#b8941f]"'
    # Replace with light text, inline style for safety, and ensure right alignment
    replace_str = 'class="block py-2 text-sm text-[#f3f4f6] hover:text-[#b8941f]" style="color: #f3f4f6 !important; text-align: right; display: block;"'
    
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for file in files:
        try:
            with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            if target_str in content:
                # Only replace if it's inside a mobile menu structure effectively
                # (The string is unique enough to mobile menu links)
                print(f"Fixing contrast in {file}...")
                new_content = content.replace(target_str, replace_str)
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
        except Exception as e:
            print(f"Error processing {file}: {e}")

if __name__ == '__main__':
    fix_contrast()
