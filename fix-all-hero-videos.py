import re
import glob

# Pages to fix
pages = [
    'attorneys.html',
    'practice-areas.html',
    'articles.html',
    'contact.html',
    'media.html'
]

gradient_bg = 'style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);"'

for page in pages:
    print(f"\n🔧 Processing: {page}")
    
    try:
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find hero section without gradient background
        pattern1 = r'(<section class="relative h-80vh flex items-center justify-center text-white text-center")(>)'
        if re.search(pattern1, content):
            content = re.sub(pattern1, r'\1 ' + gradient_bg + r'\2', content)
            print(f"   ✅ Added gradient background")
        
        # Ensure preload="auto" on video tags
        pattern2 = r'(<video[^>]*?)preload="metadata"'
        if re.search(pattern2, content):
            content = re.sub(pattern2, r'\1preload="auto"', content)
            print(f"   ✅ Changed preload to auto")
        
        # Prioritize compressed videos (swap order if needed)
        # Find video tags where non-compressed comes first
        pattern3 = r'(<source src="images/(\w+)\.mp4"[^>]*>\s*<source src="images/\2-compressed\.mp4")'
        matches = re.findall(pattern3, content)
        if matches:
            for match in matches:
                video_name = match[1]
                # Swap the order
                old = f'<source src="images/{video_name}.mp4" type="video/mp4">\n                <source src="images/{video_name}-compressed.mp4" type="video/mp4">'
                new = f'<source src="images/{video_name}-compressed.mp4" type="video/mp4">\n                <source src="images/{video_name}.mp4" type="video/mp4">'
                content = content.replace(old, new)
                print(f"   ✅ Prioritized compressed video: {video_name}")
        
        # Write back
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"   ✅ Saved: {page}")
        
    except Exception as e:
        print(f"   ❌ Error: {e}")

print("\n" + "=" * 60)
print("✅ All hero videos fixed!")
print("=" * 60)

