// scripts/upload-videos.js
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!TOKEN) {
  console.error("❌ Missing BLOB_READ_WRITE_TOKEN in environment variables.");
  console.log("Get it from: Vercel Dashboard → Storage → Access Tokens");
  process.exit(1);
}

async function uploadFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  
  console.log(`☁️  Uploading ${fileName} (${Math.round(fileBuffer.length / 1024 / 1024)}MB)...`);
  
  const { url } = await put(fileName, fileBuffer, {
    access: "public",
    token: TOKEN,
  });
  
  return { fileName, url };
}

async function run() {
  // Find all video files in the main images directory
  const sourceDir = "images";
  const files = fs.readdirSync(sourceDir).filter(f => /\.(mp4|mov|webm)$/i.test(f));
  
  console.log(`🎬 Found ${files.length} video(s) to upload`);
  
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    try {
      const result = await uploadFile(filePath);
      results.push(result);
      console.log(`✅ ${result.fileName} → ${result.url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }
  
  console.log("\n📋 Upload Summary:");
  console.log("==================");
  results.forEach(r => {
    console.log(`${r.fileName}: ${r.url}`);
  });
  
  console.log("\n🧹 Next steps:");
  console.log("1. Update your HTML files to use the new URLs above");
  console.log("2. Remove local video files");
  console.log("3. Deploy to Vercel");
}

run().catch(err => console.error("❌ Error:", err));
