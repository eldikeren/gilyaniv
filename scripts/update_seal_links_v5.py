import os

def update_seal_img_v5(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace the old seal image with the new v5 one
            new_content = content.replace('images/duns_gold_v4.png', 'images/duns_gold_v5.png')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Updated image link to v5 in {filename}")

if __name__ == "__main__":
    update_seal_img_v5(".")
