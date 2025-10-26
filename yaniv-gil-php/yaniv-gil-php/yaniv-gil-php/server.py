#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 3000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        print(f"📥 {format % args}")

if __name__ == "__main__":
    print("🚀 Starting Premium Law Firm Website Server (Python)...")
    print(f"📍 URL: http://localhost:{PORT}/")
    print("🎨 Serving premium black & gold design")
    print("⚡ Press Ctrl+C to stop the server")
    print("📱 Responsive design with RTL support")
    print("✨ Advanced animations and glass effects")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Server started successfully on port {PORT}")
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"⚠️  Port {PORT} is already in use. Trying port 6000...")
            PORT = 6000
            with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
                print(f"✅ Server started successfully on port {PORT}")
                httpd.serve_forever()
        else:
            print(f"❌ Server error: {e}")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)
