import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Function to compress images using sharp (if available) or fallback to basic optimization
async function compressImage(inputPath, outputPath, quality = 80) {
    try {
        // Try to use sharp if available
        const sharp = await import('sharp').catch(() => null);
        
        if (sharp) {
            await sharp.default(inputPath)
                .jpeg({ quality })
                .png({ quality })
                .webp({ quality })
                .toFile(outputPath);
            console.log(`✅ Compressed: ${inputPath} -> ${outputPath}`);
        } else {
            // Fallback: just copy the file
            fs.copyFileSync(inputPath, outputPath);
            console.log(`📁 Copied: ${inputPath} -> ${outputPath}`);
        }
    } catch (error) {
        console.log(`❌ Error compressing ${inputPath}:`, error.message);
        // Fallback: just copy the file
        fs.copyFileSync(inputPath, outputPath);
    }
}

// Function to compress videos using ffmpeg
function compressVideo(inputPath, outputPath) {
    try {
        const command = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 28 -c:a aac -b:a 128k -movflags +faststart "${outputPath}"`;
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ Compressed video: ${inputPath} -> ${outputPath}`);
    } catch (error) {
        console.log(`❌ Error compressing video ${inputPath}:`, error.message);
        // Fallback: just copy the file
        fs.copyFileSync(inputPath, outputPath);
    }
}

// Main compression function
async function compressAllMedia() {
    console.log('🚀 Starting media compression...');
    
    const imagesDir = 'images';
    const iconsDir = 'images/icons';
    
    // Create compressed directories
    if (!fs.existsSync('images/compressed')) {
        fs.mkdirSync('images/compressed', { recursive: true });
    }
    if (!fs.existsSync('images/icons/compressed')) {
        fs.mkdirSync('images/icons/compressed', { recursive: true });
    }
    
    // Compress main images
    const mainImages = [
        'new-logo.png',
        'Yaniv-Gil.png',
        'deutsch.png',
        'Yaniv-Gil-Law-Office-Notary_text.avif',
        'Yaniv-Gil-Law-Office-Notary_logo.avif'
    ];
    
    for (const image of mainImages) {
        const inputPath = path.join(imagesDir, image);
        const outputPath = path.join(imagesDir, 'compressed', image);
        
        if (fs.existsSync(inputPath)) {
            await compressImage(inputPath, outputPath, 85);
        }
    }
    
    // Compress icon images
    if (fs.existsSync(iconsDir)) {
        const iconFiles = fs.readdirSync(iconsDir).filter(file => 
            file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
        );
        
        for (const icon of iconFiles) {
            const inputPath = path.join(iconsDir, icon);
            const outputPath = path.join(iconsDir, 'compressed', icon);
            
            await compressImage(inputPath, outputPath, 90);
        }
    }
    
    // Compress videos
    const videos = [
        'contact.mp4',
        'index.mp4',
        'dog-compressed.mp4'
    ];
    
    for (const video of videos) {
        const inputPath = path.join(imagesDir, video);
        const outputPath = path.join(imagesDir, 'compressed', video);
        
        if (fs.existsSync(inputPath)) {
            compressVideo(inputPath, outputPath);
        }
    }
    
    console.log('✅ Media compression completed!');
    console.log('📁 Compressed files are in images/compressed/ and images/icons/compressed/');
}

// Run compression
compressAllMedia().catch(console.error);
