// scripts/optimize-deployment.js
import fs from "fs";
import path from "path";

console.log("🧹 Optimizing deployment for Vercel...");

// Remove large video files and nested directories
const filesToRemove = [
  "yaniv-gil-php/",
  "Website Performance & Design Auditor/",
  "images/artickels.mp4",
  "images/attorney.mp4", 
  "images/contact.mp4",
  "images/index.mp4",
  "images/media.mp4",
  "images/practice.mp4"
];

// Create optimized video URLs (you can host these on any CDN)
const videoUrls = {
  "artickels.mp4": "https://cdn.example.com/artickels.mp4",
  "attorney.mp4": "https://cdn.example.com/attorney.mp4",
  "contact.mp4": "https://cdn.example.com/contact.mp4", 
  "index.mp4": "https://cdn.example.com/index.mp4",
  "media.mp4": "https://cdn.example.com/media.mp4",
  "practice.mp4": "https://cdn.example.com/practice.mp4"
};

console.log("📋 Video URLs to use in your HTML:");
console.log("==================================");
Object.entries(videoUrls).forEach(([file, url]) => {
  console.log(`${file}: ${url}`);
});

console.log("\n✅ Next steps:");
console.log("1. Upload your videos to a CDN (Cloudinary, AWS S3, or similar)");
console.log("2. Update the URLs above with your actual CDN URLs");
console.log("3. Update your HTML files to use the new URLs");
console.log("4. The .vercelignore file will prevent large files from being deployed");

// Write video URLs to a file for reference
fs.writeFileSync("video-urls.json", JSON.stringify(videoUrls, null, 2));
console.log("\n📄 Video URLs saved to video-urls.json");
