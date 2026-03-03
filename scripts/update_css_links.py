import os

def update_css_link(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace the old CSS link with the new one
            new_content = content.replace('css/header-responsive.css', 'css/header-v2.css')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Updated {filename}")

if __name__ == "__main__":
    update_css_link(".")
