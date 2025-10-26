const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Test Server Working!</h1>');
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Test server running on http://localhost:3000');
});

server.on('error', (error) => {
    console.error('Server error:', error);
});
