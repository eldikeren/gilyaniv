import os
import subprocess
import glob

print("=" * 60)
print("VIDEO COMPRESSION - ALL VIDEOS")
print("=" * 60)

# Check if ffmpeg is available
try:
    result = subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
    print("✓ FFmpeg found")
except:
    print("✗ FFmpeg not found. Please install it first.")
    input("Press Enter to exit...")
    exit(1)

# Find all MP4 files in images folder
video_files = glob.glob("images/*.mp4")
video_files = [f for f in video_files if "-compressed" not in f]

if not video_files:
    print("No videos found to compress.")
    input("Press Enter to exit...")
    exit(0)

print(f"\nFound {len(video_files)} videos to compress\n")

compressed_count = 0
skipped_count = 0

for video_file in video_files:
    filename = os.path.basename(video_file)
    name, ext = os.path.splitext(filename)
    
    compressed_filename = f"{name}-compressed{ext}"
    compressed_path = os.path.join("images", compressed_filename)
    
    # Skip if compressed version already exists
    if os.path.exists(compressed_path):
        print(f"⏭️  Skipping (exists): {filename}")
        skipped_count += 1
        continue
    
    print(f"\n🎬 Compressing: {filename}")
    
    # Compress with high quality
    cmd = [
        "ffmpeg",
        "-i", video_file,
        "-c:v", "libx264",
        "-crf", "28",
        "-preset", "slow",
        "-movflags", "+faststart",
        "-y",
        compressed_path,
        "-loglevel", "error"
    ]
    
    try:
        subprocess.run(cmd, check=True)
        
        if os.path.exists(compressed_path):
            original_size = os.path.getsize(video_file) / (1024 * 1024)
            compressed_size = os.path.getsize(compressed_path) / (1024 * 1024)
            reduction = ((original_size - compressed_size) / original_size) * 100
            
            print(f"   ✓ Success!")
            print(f"   📊 Original: {original_size:.2f} MB")
            print(f"   📊 Compressed: {compressed_size:.2f} MB")
            print(f"   📊 Reduction: {reduction:.1f}%")
            
            compressed_count += 1
    except Exception as e:
        print(f"   ✗ Error: {e}")

print("\n" + "=" * 60)
print("COMPRESSION SUMMARY")
print("=" * 60)
print(f"✓ Compressed: {compressed_count} videos")
print(f"⏭️  Skipped: {skipped_count} videos")
print(f"📁 Total: {len(video_files)} videos")
print("\n✓ All done! Original files kept intact.")
print("=" * 60)
input("\nPress Enter to exit...")

