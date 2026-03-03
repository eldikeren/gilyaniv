from PIL import Image, ImageDraw

def process_seal_v4(input_path, output_path):
    # Load original image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create the base mask (totally transparent)
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # 1. Main Gold Circle
    # We'll use a slightly generous radius to ensure we don't cut the gold border
    r = min(width, height) // 2
    cx, cy = width // 2, height // 2
    draw.ellipse((cx - r + 1, cy - r + 1, cx + r - 1, cy + r - 1), fill=255)
    
    # 2. Horizontal White Bar (Rounded Rectangle)
    # We use a slightly larger rounded rectangle to ensure the corners aren't clipped
    bar_height = int(height * 0.23) # Adjusted for better fit
    bar_top = (height - bar_height) // 2
    bar_bottom = bar_top + bar_height
    
    # Draw the bar part of the mask with a more precise radius
    # Using a slightly larger width and radius to fully encapsulate the source bar
    draw.rounded_rectangle((-5, bar_top, width + 5, bar_bottom), radius=50, fill=255)
    
    # Apply the combined mask
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    # Save as v4
    result.save(output_path, "PNG")
    print(f"v4 Seal processed and saved to {output_path}")

if __name__ == "__main__":
    # We'll re-copy from the original brain media to ensure we have a clean start
    # Original provided by user: C:\\Users\\user\\.gemini\\antigravity\\brain\\9461a27e-0d2e-469b-95ba-fee457030ec1\\media__1772541145433.png
    # But wait, I'll just use the one I have if it's the original.
    # I'll re-copy it first in the terminal.
    process_seal_v4("images/duns_gold_v3_original.png", "images/duns_gold_v4.png")
