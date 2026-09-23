const fs = require('fs');
const file = 'src/JeevaRaksha.jsx';
const lines = fs.readFileSync(file, 'utf8').split('\n');
lines.forEach((line, idx) => {
  if (line.includes('function') && line.trim().startsWith('function ')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
