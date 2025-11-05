@echo off
echo ========================================
echo VIDEO COMPRESSION - ONE CLICK SOLUTION
echo ========================================
echo.
echo This will:
echo 1. Download FFmpeg (if needed)
echo 2. Compress all videos by 60-70%%
echo 3. Keep originals intact
echo.
pause

cd /d "%~dp0"

REM Check if ffmpeg exists
if not exist "ffmpeg\bin\ffmpeg.exe" (
    echo.
    echo Downloading FFmpeg...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip' -OutFile 'ffmpeg.zip'}"
    
    echo Extracting FFmpeg...
    powershell -Command "& {Expand-Archive -Path 'ffmpeg.zip' -DestinationPath '.' -Force}"
    
    REM Find and rename the extracted folder
    for /d %%i in (ffmpeg-*) do (
        if exist "%%i" (
            move "%%i" ffmpeg
        )
    )
    
    del ffmpeg.zip
    echo FFmpeg installed!
)

echo.
echo ========================================
echo COMPRESSING VIDEOS...
echo ========================================

set count=0

for %%f in (images\*.mp4) do (
    set "filename=%%~nf"
    setlocal enabledelayedexpansion
    echo !filename! | findstr /C:"-compressed" >nul
    if errorlevel 1 (
        if not exist "images\%%~nf-compressed.mp4" (
            echo.
            echo Compressing: %%~nxf
            ffmpeg\bin\ffmpeg.exe -i "%%f" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart -y "images\%%~nf-compressed.mp4" -loglevel error
            if exist "images\%%~nf-compressed.mp4" (
                echo    SUCCESS!
                set /a count+=1
            )
        )
    )
    endlocal
)

echo.
echo ========================================
echo DONE! Compressed videos ready.
echo ========================================
echo.
pause

