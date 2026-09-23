const { execSync } = require('child_process');

function killPort(port) {
  try {
    // Attempt to kill process using npx kill-port (if installed)
    execSync(`npx kill-port ${port}`, { stdio: 'ignore' });
    console.log(`Killed any process on port ${port}`);
  } catch (err) {
    // ignore errors if kill-port not available or no process
  }
}

killPort(5173);
killPort(3001);
