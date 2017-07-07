const http = require('http');

class BackoffSimulatorServer {
  constructor(port) {
    this.counter = {};
    this.limit = {};
    this.initServer(port);
  }

  setLimit(url, limit) {
    this.limit[url] = limit;
  }

  getLimit(url) {
    return this.limit[url] !== undefined ? this.limit[url] : 0;
  }

  bumpCount(url) {
    const newCount = this.counter[url] !== undefined ? this.counter[url] + 1 : 1;
    this.counter[url] = newCount;
  }

  getCount(url) {
    return this.counter[url] !== undefined ? this.counter[url] : 0;
  }

  initServer(port) {
    this.server = http.createServer((req, res) => {
      if (req.url.includes('oauth')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
          accessToken: 'token',
          expiresIn: 50000
        }));
        res.end();
      } else {
        this.bumpCount(req.url);

        if (this.getCount(req.url) > this.getLimit(req.url)) {
          console.log('OK');
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify({
            data: 'hehe'
          }));
          res.end();
        } else {
          console.log('Unavailable');
          res.writeHead(503, {'Content-Type': 'text/plain'});
          res.end();
        }
      }
    });
    this.server.listen(port);
    console.log('Started server on port ' + port);
  }

  close() {
    console.log('Closing');
    this.server.close();
  }
}
exports.BackoffSimulatorServer = BackoffSimulatorServer;