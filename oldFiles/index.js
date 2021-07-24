const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');


//Create server object
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'test.html'), (err, content) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }
   if (req.url === '/games') {
        fs.readFile(path.join(__dirname, 'games.html'), (err, content) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        })
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port', PORT, " Running on page ", path.join(__dirname, "index.html")));