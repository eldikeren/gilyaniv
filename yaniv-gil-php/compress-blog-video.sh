#!/bin/bash

echo "Compressing blog.mp4 video..."
echo ""

if [ ! -f "images/blog.mp4" ]; then
    echo "ERROR: images/blog.mp4 not found!"
    echo "Please make sure blog.mp4 exists in the images folder."
    exit 1
fi

ffmpeg -i "images/blog.mp4" \
    -vcodec libx264 \
    -crf 28 \
    -preset slow \
    -vf "scale=1920:-2" \
    -acodec aac \
    -b:a 128k \
    -movflags +faststart \
    "images/blog-compressed.mp4"

if [ $? -eq 0 ]; then
    echo ""
    echo "SUCCESS: blog-compressed.mp4 created!"
    echo ""
else
    echo ""
    echo "ERROR: Compression failed. Make sure ffmpeg is installed."
    echo "Install ffmpeg: brew install ffmpeg (Mac) or apt-get install ffmpeg (Linux)"
    echo ""
fi

