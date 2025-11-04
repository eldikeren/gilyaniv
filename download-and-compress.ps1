# Download and compress videos script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VIDEO COMPRESSION SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if ffmpeg exists
$ffmpegPath = ".\ffmpeg\bin\ffmpeg.exe"

if (-Not (Test-Path $ffmpegPath)) {
    Write-Host "`nDownloading FFmpeg..." -ForegroundColor Yellow
    
    # Download FFmpeg
    $ffmpegUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    $zipFile = "ffmpeg.zip"
    
    try {
        Invoke-WebRequest -Uri $ffmpegUrl -OutFile $zipFile -UseBasicParsing
        Write-Host "✓ Downloaded FFmpeg" -ForegroundColor Green
        
        # Extract
        Write-Host "Extracting FFmpeg..." -ForegroundColor Yellow
        Expand-Archive -Path $zipFile -DestinationPath "." -Force
        
        # Find the extracted folder
        $ffmpegFolder = Get-ChildItem -Directory -Filter "ffmpeg-*" | Select-Object -First 1
        if ($ffmpegFolder) {
            Rename-Item -Path $ffmpegFolder.FullName -NewName "ffmpeg" -Force
            Write-Host "✓ FFmpeg ready" -ForegroundColor Green
        }
        
        # Clean up
        Remove-Item $zipFile -Force
        
    } catch {
        Write-Host "✗ Failed to download FFmpeg: $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`nCompressing videos..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

# Get all MP4 files
$videos = Get-ChildItem -Path "images" -Filter "*.mp4" | Where-Object { $_.Name -notlike "*-compressed*" }

$compressed = 0
$skipped = 0

foreach ($video in $videos) {
    $inputFile = $video.FullName
    $outputFile = Join-Path $video.Directory ($video.BaseName + "-compressed.mp4")
    
    # Skip if compressed version exists
    if (Test-Path $outputFile) {
        Write-Host "⏭️  Skipping (exists): $($video.Name)" -ForegroundColor Gray
        $skipped++
        continue
    }
    
    Write-Host "`n🎬 Compressing: $($video.Name)" -ForegroundColor Cyan
    
    try {
        # Compress with high quality settings
        & $ffmpegPath -i $inputFile -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart -y $outputFile 2>&1 | Out-Null
        
        if (Test-Path $outputFile) {
            $originalSize = [math]::Round($video.Length / 1MB, 2)
            $compressedSize = [math]::Round((Get-Item $outputFile).Length / 1MB, 2)
            $reduction = [math]::Round((($originalSize - $compressedSize) / $originalSize) * 100, 1)
            
            Write-Host "   ✓ Success!" -ForegroundColor Green
            Write-Host "   📊 Original: $originalSize MB" -ForegroundColor White
            Write-Host "   📊 Compressed: $compressedSize MB" -ForegroundColor White
            Write-Host "   📊 Reduction: $reduction%" -ForegroundColor Green
            
            $compressed++
        }
    } catch {
        Write-Host "   ✗ Error: $_" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "COMPRESSION SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Compressed: $compressed videos" -ForegroundColor Green
Write-Host "⏭️  Skipped: $skipped videos" -ForegroundColor Gray
Write-Host "📁 Total: $($videos.Count) videos" -ForegroundColor White
Write-Host "`n✓ All done! Originals kept intact." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

