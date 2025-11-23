import os
import glob
from PIL import Image

# Configuration
IMAGE_DIR = "images"
WEBP_QUALITY = 85  # 85 = high quality, good compression
SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png']

def convert_to_webp(input_file, output_file, quality=85):
    """Convert image to WebP format"""
    try:
        print(f"\n🖼️  Converting: {os.path.basename(input_file)}")
        
        # Open and convert image
        img = Image.open(input_file)
        
        # Convert RGBA to RGB if necessary (for JPG compatibility)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Save as WebP
        img.save(output_file, 'WEBP', quality=quality, method=6)
        
        # Check file sizes
        original_size = os.path.getsize(input_file) / 1024  # KB
        webp_size = os.path.getsize(output_file) / 1024  # KB
        reduction = ((original_size - webp_size) / original_size) * 100
        
        print(f"   ✅ Success!")
        print(f"   📊 Original: {original_size:.1f} KB")
        print(f"   📊 WebP: {webp_size:.1f} KB")
        print(f"   📊 Reduction: {reduction:.1f}%")
        return True
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("🖼️  IMAGE OPTIMIZATION SCRIPT (WebP Conversion)")
    print("=" * 60)
    
    # Check if PIL/Pillow is available
    try:
        from PIL import Image
    except ImportError:
        print("❌ ERROR: Pillow (PIL) not installed!")
        print("Install with: pip install Pillow")
        return
    
    converted_count = 0
    skipped_count = 0
    total_files = 0
    
    # Process each supported format
    for ext in SUPPORTED_FORMATS:
        pattern = os.path.join(IMAGE_DIR, f"*{ext}")
        image_files = glob.glob(pattern, recursive=False)
        
        for image_file in image_files:
            total_files += 1
            filename = os.path.basename(image_file)
            name, _ = os.path.splitext(filename)
            
            # Skip if it's an icon or already optimized
            if 'icon' in name.lower() or name.endswith('-opt'):
                print(f"\n⏭️  Skipping: {filename}")
                skipped_count += 1
                continue
            
            # Create WebP filename
            webp_filename = f"{name}.webp"
            webp_path = os.path.join(IMAGE_DIR, webp_filename)
            
            # Skip if WebP version already exists
            if os.path.exists(webp_path):
                print(f"\n⏭️  Skipping (WebP exists): {filename}")
                skipped_count += 1
                continue
            
            # Convert to WebP
            if convert_to_webp(image_file, webp_path, WEBP_QUALITY):
                converted_count += 1
    
    print("\n" + "=" * 60)
    print("📊 OPTIMIZATION SUMMARY")
    print("=" * 60)
    print(f"✅ Converted: {converted_count} images")
    print(f"⏭️  Skipped: {skipped_count} images")
    print(f"📁 Total: {total_files} images")
    print("\n✅ All done! Original files kept intact.")
    print("\n💡 Next: Update HTML to use <picture> tags with WebP")
    print("=" * 60)

if __name__ == "__main__":
    main()

