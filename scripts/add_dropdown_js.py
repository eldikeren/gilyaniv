#!/usr/bin/env python3
"""
Add dropdown JS functions to all pages that have the new mobile menu.
"""

import glob
import re

# JavaScript functions needed for dropdown functionality
DROPDOWN_JS = '''
        // Navigation dropdown functionality for mobile menu
        function toggleNavDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            if (!dropdown) return;

            // Close all other dropdowns
            const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
            allDropdowns.forEach(dd => {
                if (dd.id !== dropdownId) {
                    dd.classList.add('hidden');
                }
            });

            // Toggle current dropdown
            const isHidden = dropdown.classList.contains('hidden');
            if (isHidden) {
                dropdown.classList.remove('hidden');
            } else {
                dropdown.classList.add('hidden');
            }
        }

        // Category dropdown functionality (nested collapse)
        function toggleCategoryDropdown(categoryId, event) {
            if (event) event.stopPropagation();
            const category = document.getElementById(categoryId);
            if (!category) return;

            // Toggle category
            if (category.classList.contains('hidden')) {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        }
'''

# Get all HTML files
html_files = glob.glob('*.html')

updated_count = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks', 'accessibility']):
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file has the new mobile menu but not the JS functions
        if 'mobile-practice-dropdown' in content and 'function toggleNavDropdown' not in content:
            # Find a good place to add the JS - before the last </script>
            # Look for the closing script tag that's before </body>
            body_pos = content.rfind('</body>')
            if body_pos > 0:
                # Find the last </script> before </body>
                last_script_end = content.rfind('</script>', 0, body_pos)
                if last_script_end > 0:
                    # Insert before the closing </script>
                    content = content[:last_script_end] + DROPDOWN_JS + '\n    ' + content[last_script_end:]

                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)

                    print(f"Added dropdown JS to: {html_file}")
                    updated_count += 1
                else:
                    print(f"No </script> found in: {html_file}")
            else:
                print(f"No </body> found in: {html_file}")
        elif 'function toggleNavDropdown' in content:
            print(f"Already has JS: {html_file}")
        else:
            print(f"No mobile-practice-dropdown in: {html_file}")

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\n=== Summary ===")
print(f"Updated: {updated_count} files")
