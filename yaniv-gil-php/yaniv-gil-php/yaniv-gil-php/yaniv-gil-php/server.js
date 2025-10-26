const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Premium Law Firm Website Server...');

const server = http.createServer((req, res) => {
    console.log(`📥 Request: ${req.method} ${req.url}`);
    
    // Strip query parameters from the URL
    const urlWithoutQuery = req.url.split('?')[0];
    let filePath = '.' + urlWithoutQuery;
    
    if (filePath === './') {
        filePath = './index.html';
    }
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.webp':
            contentType = 'image/webp';
            break;
    }
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log(`❌ File not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page Not Found</h1><p>The requested page could not be found.</p>');
            } else {
                console.error(`❌ Server error: ${error.code}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1><p>Something went wrong on the server.</p>');
            }
        } else {
            console.log(`✅ Serving: ${filePath}`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
const HOST = '0.0.0.0';

console.log(`🔧 Configuring server for port ${PORT} and host ${HOST}...`);

server.listen(PORT, HOST, () => {
    console.log(`🚀 Premium Law Firm Website Server Running!`);
    console.log(`📍 URL: http://localhost:${PORT}/`);
    console.log(`🎨 Serving premium silver & black design with REAL IMAGES`);
    console.log(`⚡ Press Ctrl+C to stop the server`);
    console.log(`📱 Responsive design with RTL support`);
    console.log(`✨ Advanced animations and glass effects`);
});

server.on('error', (error) => {
    console.error('❌ Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`⚠️  Port ${PORT} is already in use. Please try a different port.`);
    }
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
