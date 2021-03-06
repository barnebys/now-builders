const { Server } = require('http');
const { Bridge } = require('./bridge.js');

const bridge = new Bridge();

const saveListen = Server.prototype.listen;
Server.prototype.listen = function listen() {
  bridge.setServer(this);
  Server.prototype.listen = saveListen;
  return bridge.listen();
};

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

try {
  // PLACEHOLDER
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.error(err.message);
    console.error(
      'Did you forget to add it to "dependencies" in `package.json`?',
    );
    process.exit(1);
  } else {
    throw err;
  }
}

exports.launcher = bridge.launcher;
