const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();

const server = http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  file = path.join(root, file);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    res.end(data);
  });
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Kora frontend running on port 8080');
});
