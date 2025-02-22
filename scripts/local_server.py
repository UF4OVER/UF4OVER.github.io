from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def do_GET(self):
        return SimpleHTTPRequestHandler.do_GET(self)

def run_server():
    # 切换到项目根目录
    os.chdir('..')
    
    # 设置服务器
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    
    print(f'启动本地服务器在 http://localhost:{port}')
    print('按 Ctrl+C 停止服务器')
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n停止服务器')
        httpd.server_close()

if __name__ == '__main__':
    run_server() 