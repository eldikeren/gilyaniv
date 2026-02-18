import os
import subprocess
import re

def generate_poster(video_path, poster_name_base):
    jpg_path = f"images/{poster_name_base}.jpg"
    webp_path = f"images/{poster_name_base}.webp"
    
    # Generate JPG
    cmd_jpg = f'ffmpeg -i "{video_path}" -vframes 1 -q:v 2 "{jpg_path}" -y'
    subprocess.run(cmd_jpg, shell=True)
    
    # Generate WebP
    cmd_webp = f'ffmpeg -i "{video_path}" -vframes 1 -c:v libwebp -q:v 80 "{webp_path}" -y'
    subprocess.run(cmd_webp, shell=True)
    
    return webp_path

def process_html_files():
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    video_poster_map = {
        "images/index-compressed.mp4": "hero-poster",
        "images/practice-compressed.mp4": "practice-poster",
        "images/attorney-compressed.mp4": "attorney-poster",
        "images/artickels-compressed.mp4": "articles-poster",
        "images/blog-compressed.mp4": "blog-poster",
        "images/contact-compressed.mp4": "contact-poster",
        "images/media-compressed.mp4": "media-poster",
        "images/dog-compressed.mp4": "dog-poster",
    }
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            print(f"Skipping {html_file} due to error: {e}")
            continue
        
        # Find video tags
        video_tags = re.findall(r'<video[^>]*>.*?</video>', content, re.DOTALL)
        if not video_tags:
            continue
            
        print(f"Processing {html_file}...")
        new_content = content
        for video_tag in video_tags:
            # Find first source
            source_match = re.search(r'<source src="([^"]+)"', video_tag)
            if source_match:
                video_src = source_match.group(1)
                poster_base = video_poster_map.get(video_src)
                
                if not poster_base:
                    # Fallback naming
                    basename = os.path.basename(video_src).split('.')[0]
                    poster_base = f"{basename}-poster"
                
                poster_path = f"images/{poster_base}.webp"
                
                # Generate if video exists locally
                if os.path.exists(video_src):
                    print(f"Generating poster for {video_src}...")
                    generate_poster(video_src, poster_base)
                else:
                    print(f"Video {video_src} not found locally.")
                
                # Update video tag
                # Add poster and preload="none"
                new_tag = video_tag
                # Ensure poster is set
                if 'poster=' not in new_tag:
                    new_tag = re.sub(r'<video', f'<video poster="{poster_path}"', new_tag)
                else:
                    new_tag = re.sub(r'poster="[^"]+"', f'poster="{poster_path}"', new_tag)
                
                # Ensure preload is set to none
                if 'preload=' not in new_tag:
                    new_tag = re.sub(r'<video', f'<video preload="none"', new_tag)
                else:
                    new_tag = re.sub(r'preload="[^"]+"', 'preload="none"', new_tag)
                
                new_content = new_content.replace(video_tag, new_tag)
        
        if new_content != content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {html_file}")

if __name__ == "__main__":
    process_html_files()
