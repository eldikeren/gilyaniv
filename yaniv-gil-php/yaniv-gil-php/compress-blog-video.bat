@echo off
echo Compressing blog.mp4 video...
echo.

if not exist "images\blog.mp4" (
    echo ERROR: images\blog.mp4 not found!
    echo Please make sure blog.mp4 exists in the images folder.
    pause
    exit /b 1
)

ffmpeg -i "images\blog.mp4" -vcodec libx264 -crf 28 -preset slow -vf "scale=1920:-2" -acodec aac -b:a 128k -movflags +faststart "images\blog-compressed.mp4"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS: blog-compressed.mp4 created!
    echo.
) else (
    echo.
    echo ERROR: Compression failed. Make sure ffmpeg is installed.
    echo Download ffmpeg from: https://ffmpeg.org/download.html
    echo.
)

pause

