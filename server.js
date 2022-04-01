const net = require('net');

const config = require('./app/config/config');
const app = require('./app');


const server = net.createServer((socket) => {
  socket.write('hello\r\n');

  socket.on('data', function (data) {
    const command = data.toString().trim();

    if (command === 'quit') {
      socket.destroy('', function () {
        console.log('Connection closed.');
      });
    }
    const res = app.process(command);

    socket.write(Buffer.from(res));
  });

  socket.on('error', function (err) {
    console.log(`Error: ${err}`);
  });

  socket.on('end', function () {
    console.log('Closing connection with the client');
  });

});

REST.prototype.startServer = function () {
  const port = config.PORT ? config.PORT : config.DEFAULT_PORT;

  server.listen(port, function () {
    if (!module.parent) {
      console.log(`All right Server is alive at Port ${port}...`);
    }
  });
};

function REST() {
  this.startServer();
};

const rest = new REST();

module.exports.start = rest.startServer;
