import os

def update_seal_img(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace the old seal image with the new v3 one
            new_content = content.replace('images/dunsguide_gold_seal.png', 'images/duns_gold_v3.png')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Updated image link in {filename}")

if __name__ == "__main__":
    update_seal_img(".")
