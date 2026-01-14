
import os
import re

def force_mobile_styles(directory):
    # Pattern for the category buttons (Family, Inheritance, Bankruptcy)
    # They usually have 'bg-gray-800' and 'toggleCategoryDropdown'
    
    # We want to force: background #1a1a1a, text #b8941f
    
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 1. Fix the Buttons (Force inline style)
            # Find the button and inject style if not present
            # We look for the distinct class combo or onclick pattern
            
            # Regex to find the button opening tag containing toggleCategoryDropdown
            # and insert style attribute if missing
            
            # Simple string replacement for valid buttons usually works better than complex regex if format is consistent
            target_str = 'class="w-full text-right flex items-center justify-between py-3 px-4 text-white font-bold text-base bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"'
            replacement_str = 'class="w-full text-right flex items-center justify-between py-3 px-4 text-[#b8941f] font-bold text-base bg-[#1a1a1a] rounded-lg hover:bg-gray-700 transition-colors duration-200" style="background-color: #1a1a1a !important; color: #b8941f !important; border: 1px solid rgba(184, 148, 31, 0.3);"'
            
            if target_str in content:
                print(f"Applying button fix to {filename}")
                new_content = content.replace(target_str, replacement_str)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                    
            # 2. Fix the Civil Law Direct Link (similar structure)
            target_civil = 'class="block w-full text-right py-3 px-4 text-white font-bold text-base bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"'
            replacement_civil = 'class="block w-full text-right py-3 px-4 text-[#b8941f] font-bold text-base bg-[#1a1a1a] rounded-lg hover:bg-gray-700 transition-colors duration-200" style="background-color: #1a1a1a !important; color: #b8941f !important; border: 1px solid rgba(184, 148, 31, 0.3);"'
            
            if target_civil in content:
                 print(f"Applying civil link fix to {filename}")
                 # Re-read if we modified it above, actually we didn't save yet in the logic? 
                 # Ah, I wrote to file in step 1. So I should read again or just sequential replace.
                 # Let's read strictly.
                 with open(filepath, 'r', encoding='utf-8') as f:
                    current_content = f.read()
                 
                 new_content_2 = current_content.replace(target_civil, replacement_civil)
                 if new_content_2 != current_content:
                     with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content_2)

if __name__ == "__main__":
    force_mobile_styles(".")
