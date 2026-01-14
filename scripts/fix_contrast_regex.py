
import os
import re

def fix_contrast_regex():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for file in files:
        try:
            with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Find the mobile menu block (from id="mobile-menu" to roughly the end of the div or script start)
            # We'll match up to 5000 chars to cover the menu content
            match = re.search(r'(<div id="mobile-menu".*?)(<script|</body>)', content, re.DOTALL)
            
            if match:
                menu_block = match.group(1)
                # Replace text-gray-800 (dark text) with text-[#f3f4f6] (light text)
                new_menu_block = menu_block.replace('text-gray-800', 'text-[#f3f4f6]')
                
                # Also ensure hover colors are visible
                new_menu_block = new_menu_block.replace('hover:bg-gray-800', 'hover:bg-[#333]')
                
                # Also force inline style if it's a link
                # Regex replace: <a ... class="...text-[#f3f4f6]..." ... > 
                # to append style="color: #f3f4f6 !important"
                # This is a bit complex, simplest is just the class replacement which should work with style.css
                
                if new_menu_block != menu_block:
                    print(f"Fixing contrast in {file}...")
                    # Replace only the first occurrence of the block to avoid messing up if regex overlapped
                    new_content = content.replace(menu_block, new_menu_block)
                    with open(file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
        except Exception as e:
            print(f"Error processing {file}: {e}")

if __name__ == "__main__":
    fix_contrast_regex()
