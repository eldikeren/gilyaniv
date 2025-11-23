import os
import subprocess
import glob

# Configuration
VIDEO_DIR = "images"
COMPRESSION_QUALITY = "28"  # CRF 28 = good quality, smaller size (lower = better quality, bigger file)
PRESET = "slow"  # slow = better compression (slow, medium, fast)

def compress_video(input_file, output_file):
    """Compress video using ffmpeg"""
    print(f"\n🎬 Compressing: {input_file}")
    print(f"   → Output: {output_file}")
    
    # ffmpeg command for high-quality web compression
    cmd = [
        "ffmpeg",
        "-i", input_file,
        "-c:v", "libx264",          # H.264 codec
        "-crf", COMPRESSION_QUALITY, # Quality (18-28 is good range)
        "-preset", PRESET,           # Compression speed/efficiency
        "-c:a", "aac",               # Audio codec
        "-b:a", "128k",              # Audio bitrate
        "-movflags", "+faststart",   # Web optimization
        "-y",                        # Overwrite output
        output_file
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        if result.returncode == 0:
            # Check file sizes
            original_size = os.path.getsize(input_file) / (1024 * 1024)  # MB
            compressed_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
            reduction = ((original_size - compressed_size) / original_size) * 100
            
            print(f"   ✅ Success!")
            print(f"   📊 Original: {original_size:.2f} MB")
            print(f"   📊 Compressed: {compressed_size:.2f} MB")
            print(f"   📊 Reduction: {reduction:.1f}%")
            return True
        else:
            print(f"   ❌ Error: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print(f"   ❌ Timeout after 5 minutes")
        return False
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("🎥 VIDEO COMPRESSION SCRIPT")
    print("=" * 60)
    
    # Check if ffmpeg is available
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
    except:
        print("❌ ERROR: ffmpeg not found!")
        print("Please install ffmpeg first.")
        return
    
    # Find all MP4 files
    video_files = glob.glob(os.path.join(VIDEO_DIR, "*.mp4"))
    
    if not video_files:
        print(f"❌ No MP4 files found in {VIDEO_DIR}/")
        return
    
    print(f"\n📁 Found {len(video_files)} video files")
    
    compressed_count = 0
    skipped_count = 0
    
    for video_file in video_files:
        filename = os.path.basename(video_file)
        name, ext = os.path.splitext(filename)
        
        # Skip if already compressed
        if "-compressed" in name:
            print(f"\n⏭️  Skipping (already compressed): {filename}")
            skipped_count += 1
            continue
        
        # Check if compressed version already exists
        compressed_filename = f"{name}-compressed{ext}"
        compressed_path = os.path.join(VIDEO_DIR, compressed_filename)
        
        if os.path.exists(compressed_path):
            print(f"\n⏭️  Skipping (compressed version exists): {filename}")
            skipped_count += 1
            continue
        
        # Compress the video
        if compress_video(video_file, compressed_path):
            compressed_count += 1
    
    print("\n" + "=" * 60)
    print("📊 COMPRESSION SUMMARY")
    print("=" * 60)
    print(f"✅ Compressed: {compressed_count} videos")
    print(f"⏭️  Skipped: {skipped_count} videos")
    print(f"📁 Total: {len(video_files)} videos")
    print("\n✅ All done! Original files kept intact.")
    print("=" * 60)

if __name__ == "__main__":
    main()

