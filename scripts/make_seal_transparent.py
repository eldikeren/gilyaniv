from PIL import Image, ImageDraw
import os

def make_transparent_floodfill(img_path, output_path):
    print(f"Processing {img_path} with floodfill...")
    img = Image.open(img_path).convert("RGBA")
    
    # We'll assume the background starts at (0,0)
    # and we'll flood fill it with transparency (0,0,0,0)
    # Threshold for what we consider "white background"
    # The original image has white around the circular edges.
    
    # We want to keep the white bar in the middle.
    # Seed points at the 4 corners
    seeds = [(0, 0), (img.width - 1, 0), (0, img.height - 1), (img.width - 1, img.height - 1)]
    
    # We'll use a simpler approach: create a mask.
    # Actually, let's just use Image.floodfill (available in some Pillow versions)
    # Or, we can use a basic flood fill algorithm.
    
    width, height = img.size
    # Target color: we'll check the top-left pixel color
    target_color = img.getpixel((0,0))
    
    # If it's already transparent, skip
    if target_color[3] == 0:
        print("Image already appears transparent at (0,0).")
        return

    # Create a mask for the circular area? 
    # Or just use the original image and set alpha for the background.
    
    # Let's try to just use a circular mask since it's a circular seal.
    # This is safer than flood fill for images with gradients or noise.
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    # Draw a white circle on the mask
    # The seal is circular, so we'll draw a circle that fits the canvas.
    # We'll leave a small margin if the seal isn't perfectly touching the edges.
    draw.ellipse((0, 0, width, height), fill=255)
    
    # Apply mask to image
    img.putalpha(mask)
    
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    source = "yaniv-gil-php/images/dunsguide_gold_seal.png"
    target = "images/dunsguide_gold_seal.png"
    
    if os.path.exists(source):
        make_transparent_floodfill(source, target)
    else:
        print(f"Error: Source image {source} not found.")
