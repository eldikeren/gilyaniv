from PIL import Image, ImageDraw

def process_seal_v3(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create a mask for the circular seal
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # Precise circular mask based on the actual gold border
    # The image is 960x918 (based on Step 954/955 aspect ratio?) No, wait.
    # Actually, I'll just use a center-weighted circle.
    
    r = min(width, height) // 2
    cx, cy = width // 2, height // 2
    
    # Use a small buffer to avoid artifacts
    buffer = 2
    draw.ellipse((cx - r + buffer, cy - r + buffer, cx + r - buffer, cy + r - buffer), fill=255)
    
    # Apply the mask
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    result.save(output_path, "PNG")
    print(f"v3 Seal processed and saved to {output_path}")

if __name__ == "__main__":
    process_seal_v3("images/duns_gold_v3.png", "images/duns_gold_v3.png")
