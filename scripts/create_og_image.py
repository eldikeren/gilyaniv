import os
from PIL import Image, ImageDraw, ImageFont

def create_og_image():
    # Settings
    width = 1200
    height = 630
    background_color = "#0C1220"
    gold_color = "#c9a55c"
    output_path = "images/og-share-image.jpg"
    
    # Text (Reversed for RTL since simple PIL doesn't support bidi)
    firm_name = "משרד עו״ד יניב גיל ושות׳"[::-1]
    tagline = "דיני משפחה • גירושין • ירושה • חדלות פירעון"[::-1]
    
    # Create image
    img = Image.new('RGB', (width, height), color=background_color)
    draw = ImageDraw.Draw(img)
    
    # Try to find fonts
    font_path_bold = "C:\\Windows\\Fonts\\arialbd.ttf"
    font_path_reg = "C:\\Windows\\Fonts\\arial.ttf"
    
    try:
        title_font = ImageFont.truetype(font_path_bold, 80)
        tagline_font = ImageFont.truetype(font_path_reg, 40)
    except:
        title_font = ImageFont.load_default()
        tagline_font = ImageFont.load_default()
        
    # Draw Logo
    logo_path = "images/new-logo.png"
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path)
            # If logo has alpha, paste with mask
            logo = logo.convert("RGBA")
            # Resize
            logo.thumbnail((250, 250))
            logo_x = (width - logo.width) // 2
            logo_y = 60
            
            # Create a simple "glow" or background for logo if needed
            # For now just paste it
            img.paste(logo, (logo_x, logo_y), logo)
            logo_bottom = logo_y + logo.height
        except Exception as e:
            print(f"Error loading logo: {e}")
            logo_bottom = 250
    else:
        logo_bottom = 250

    # Draw separator line
    line_y = logo_bottom + 40
    line_w = 400
    draw.line([(width//2 - line_w//2, line_y), (width//2 + line_w//2, line_y)], fill=gold_color, width=2)
    
    # Draw Firm Name
    title_bbox = draw.textbbox((0, 0), firm_name, font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (width - title_w) // 2
    title_y = line_y + 40
    draw.text((title_x, title_y), firm_name, font=title_font, fill=gold_color)
    
    # Draw Tagline
    tagline_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tagline_w = tagline_bbox[2] - tagline_bbox[0]
    tagline_x = (width - tagline_w) // 2
    tagline_y = title_y + 110
    draw.text((tagline_x, tagline_y), tagline, font=tagline_font, fill="#FFFFFF")
    
    # Draw outer frame
    draw.rectangle([15, 15, width - 15, height - 15], outline=gold_color, width=10)
    
    # Save image
    img.save(output_path, "JPEG", quality=95)
    print(f"Image saved to {output_path}")

if __name__ == "__main__":
    create_og_image()
