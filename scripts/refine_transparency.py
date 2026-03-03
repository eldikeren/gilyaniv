from PIL import Image, ImageDraw

def process_seal(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create a mask for the circular seal
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Use a slightly smaller circle to avoid edge artifacts (buffer of 2 pixels)
    buffer = 2
    draw.ellipse((buffer, buffer, width - buffer, height - buffer), fill=255)
    
    # Apply the mask
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    # Further cleanup: make specific off-white colors transparent if they are near the edges
    # (The circular mask usually handles this, but let's be safe)
    
    result.save(output_path, "PNG")
    print(f"Processed seal saved to {output_path}")

if __name__ == "__main__":
    # Assuming the user's original image is images/dunsguide_gold_seal.png
    input_img = "images/dunsguide_gold_seal.png"
    output_img = "images/dunsguide_gold_seal.png" # Overwrite with cleaned version
    process_seal(input_img, output_img)
