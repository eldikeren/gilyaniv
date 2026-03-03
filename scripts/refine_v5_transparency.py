from PIL import Image, ImageDraw

def process_seal_v5(input_path, output_path):
    # Load original image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create high-res mask for anti-aliasing (oversample by 4x)
    scale = 4
    mask_size = (width * scale, height * scale)
    mask = Image.new('L', mask_size, 0)
    draw = ImageDraw.Draw(mask)
    
    # Coordinates in scaled space
    cx, cy = (width * scale) // 2, (height * scale) // 2
    r = (min(width, height) * scale) // 2
    
    # 1. Main Circle
    draw.ellipse((cx - r + 4, cy - r + 4, cx + r - 4, cy + r - 4), fill=255)
    
    # 2. Rounded Rectangle Bar
    # Re-calculate bar positions based on the image content
    # We want to be slightly generous to avoid clipping and artifacts
    bar_h_scaled = int(height * 0.235 * scale)
    bar_t_scaled = (height * scale - bar_h_scaled) // 2
    bar_b_scaled = bar_t_scaled + bar_h_scaled
    
    # Draw rounded rectangle with generous margin and radius
    # We use a large radius to match the user's original image
    draw.rounded_rectangle((-10, bar_t_scaled, width * scale + 10, bar_b_scaled), radius=55*scale, fill=255)
    
    # Resize mask back to original size with high quality (this provides anti-aliasing)
    mask = mask.resize((width, height), resample=Image.LANCZOS)
    
    # Apply mask
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    result.paste(img, (0, 0), mask=mask)
    
    # Final cleanup: Ensure no semi-transparent white fringes if possible
    # but since it's on a dark background, LANCZOS anti-aliasing is usually enough.
    
    result.save(output_path, "PNG")
    print(f"v5 Seal processed with anti-aliasing and saved to {output_path}")

if __name__ == "__main__":
    # Always use the original clean source
    src = "images/duns_gold_v3_original.png"
    dest = "images/duns_gold_v5.png"
    process_seal_v5(src, dest)
