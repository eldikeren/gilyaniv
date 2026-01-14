#!/usr/bin/env python3
"""
Add Mobile Menu to index.html
"""

import re

def main():
    # Read index.html
    with open('c:/Users/user/Desktop/yaniv/index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if mobile menu structure already exists
    if 'class="mobile-menu-overlay"' in content:
        print("✅ Mobile menu overlay structure already exists in index.html")
        return
    
    # Read the mobile menu from practice-areas.html as a template
    with open('c:/Users/user/Desktop/yaniv/practice-areas.html', 'r', encoding='utf-8') as f:
        practice_content = f.read()
    
    # Extract the mobile menu section from practice-areas.html
    # Find the start of the mobile menu overlay
    start_marker = '<!-- Full-screen Mobile Menu Overlay -->'
    start_idx = practice_content.find(start_marker)
    
    if start_idx == -1:
        print("❌ Could not find mobile menu start marker in practice-areas.html")
        return
    
    # Find the end (the closing </div> before </header>)
    # Look for </header> after the start marker
    header_close_idx = practice_content.find('</header>', start_idx)
    
    if header_close_idx == -1:
        print("❌ Could not find </header> after mobile menu in practice-areas.html")
        return
    
    # Extract everything from start_marker to just before </header>
    # We need to back up to find the last </div> before </header>
    temp_content = practice_content[start_idx:header_close_idx]
    last_div_close = temp_content.rfind('</div>')
    
    if last_div_close == -1:
        print("❌ Could not find closing </div> for mobile menu")
        return
    
    # Get the mobile menu section
    mobile_menu_html = practice_content[start_idx:start_idx + last_div_close + 6]  # +6 for '</div>'
    
    # Now insert this before </header> in index.html
    # Find </header> in index.html
    index_header_close = content.find('</header>')
    
    if index_header_close == -1:
        print("❌ Could not find </header> in index.html")
        return
    
    # Insert mobile menu before </header>
    # Add proper indentation (8 spaces to match header content)
    indented_mobile_menu = '\n'.join(['        ' + line if line.strip() else '' 
                                       for line in mobile_menu_html.split('\n')])
    
    # Insert with proper spacing
    modified_content = (
        content[:index_header_close] + 
        '\n\n' + indented_mobile_menu + '\n    ' +
        content[index_header_close:]
    )
    
    # Write back
    with open('c:/Users/user/Desktop/yaniv/index.html', 'w', encoding='utf-8') as f:
        f.write(modified_content)
    
    print("✅ Successfully added mobile menu overlay structure to index.html!")


if __name__ == "__main__":
    main()
